import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';

import type { Identifiable, TableProps } from './models/custom-table';
import SortableRow from './SortableTableRow/SortableTableRow';
import Loader from '../Loader/Loader';

import { infinityScroll } from '../../../utils/infinity-scroll';

import styles from './CustomTable.module.css';

const CustomTable = <T extends Identifiable>({
  data,
  isFetching,
  refetch,
  setDatastoreAction,
  tableHeaderRows,
  ascSortAction,
  descSortAction,
  pageNumber,
}: TableProps<T>): React.ReactElement => {
  const isAscSort = useRef(true);
  const sortIndicator = useRef<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const sortingHandler = (item: string) => {
    if (isAscSort.current) {
      dispatch(ascSortAction(item as keyof T));
    } else {
      dispatch(descSortAction(item as keyof T));
    }

    isAscSort.current = !isAscSort.current;

    sortIndicator.current = {
      key: item as string,
      direction: isAscSort.current ? 'asc' : 'desc',
    };
  };

  const dispatch = useDispatch();
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const fromIndex = data.findIndex((i) => i.id === active.id);
    const toIndex = data.findIndex((i) => i.id === over.id);

    const newArray = arrayMove(data, fromIndex, toIndex);

    dispatch(setDatastoreAction(newArray));
  };

  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={data.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <div
            className={styles.tableWrapper}
            onScroll={(event) => infinityScroll(event, pageNumber, refetch)}
            style={{ overflowY: data.length ? 'scroll' : 'unset' }}
          >
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  {tableHeaderRows.map((item: { text: string; key: string }) => {
                    return (
                      <th key={item.key} onClick={() => sortingHandler(item.key)}>
                        {item.text}

                        {sortIndicator.current?.key === item.key && (
                          <span
                            className={
                              sortIndicator.current?.direction === 'asc' ? styles.up : styles.down
                            }
                          >
                            ⮝
                          </span>
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {data.map((item: T) => {
                  if (item.registeredDate as keyof T) {
                    const dateDifference =
                      Number(new Date()) - Number(new Date(item.registeredDate));
                    const daysSinceRegistered = Math.ceil(dateDifference / (1000 * 60 * 60 * 24));
                    const dsr = daysSinceRegistered;

                    return <SortableRow key={item.id} item={item} dsr={dsr} />;
                  }

                  return <SortableRow key={item.id} item={item} />;
                })}
              </tbody>
            </table>
            {isFetching && !!data.length && <Loader />}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
};

export default CustomTable;

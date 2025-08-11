import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { SortableRowProps } from '../models/sortable-row';

const SortableRow = <T,>({ item, dsr }: SortableRowProps<T>): React.ReactElement => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  };

  return (
    <tr ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <td>{item.id}</td>
      <td>{item.firstName}</td>
      <td>{item.lastName}</td>
      <td>{item.fullName}</td>
      <td>{item.email}</td>
      <td>{item.city}</td>
      <td>{dsr}</td>
    </tr>
  );
};

export default SortableRow;

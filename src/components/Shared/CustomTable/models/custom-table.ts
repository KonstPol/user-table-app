import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import type { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import type { RefObject } from 'react';

export interface Identifiable {
  id: string;
}

export interface TableProps<T> {
  data: T[];
  isFetching: boolean;
  refetch: (opts?: RefetchOptions) => Promise<QueryObserverResult>;
  setDatastoreAction: ActionCreatorWithPayload<T[], string>;
  ascSortAction: ActionCreatorWithPayload<keyof T, string>;
  descSortAction: ActionCreatorWithPayload<keyof T, string>;
  tableHeaderRows: {
    text: string;
    key: string;
  }[];
  pageNumber: RefObject<number>;
}

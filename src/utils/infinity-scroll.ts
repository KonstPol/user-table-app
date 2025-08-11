import type { RefObject } from 'react';

export const infinityScroll = (
  event: React.UIEvent<HTMLDivElement>,
  pageNumber: RefObject<number>,
  refetch: () => void,
) => {
  const target = event?.currentTarget;
  if (target.scrollTop + target.clientHeight >= target.scrollHeight) {
    pageNumber.current += 1;

    refetch();
  }
};

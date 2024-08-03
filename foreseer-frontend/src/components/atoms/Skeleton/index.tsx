import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

interface SkeletonLoaderProps {
  count?: number;
}

export const SkeletonLoader = ({ count = 5 }: SkeletonLoaderProps) => {
  return (
    <SkeletonTheme highlightColor="#4B4E50">
      <Skeleton count={count} />
    </SkeletonTheme>
  );
};

import { Skeleton } from "@/components/ui/skeleton";
import { MatchWithImages } from "@/models/api/MatchWithImages";
import { snakeCaseToTitleCase } from "../../../utils/snakeCaseToTitleCase";
import { getImageSrc } from "../../../utils/getImageSrc";

interface MatchListProps {
  matches?: MatchWithImages[];
  isLoading: boolean;
  skeletonsNumber?: number;
}

const MatchList = (props: MatchListProps) => {
  const { matches, isLoading, skeletonsNumber = 5 } = props;

  return (
    <div className="container mx-auto p-4">
      <div className="h-4" />
      {isLoading && <MatchCardSkeletons skeletonsNumber={skeletonsNumber} />}
      {matches?.map((match) => (
        <div
          key={match.name}
          className="flex flex-row items-center gap-4 mb-4 p-4 border rounded-lg"
        >
          <div className="relative w-[150px] h-[150px]">
            <img
              src={getImageSrc(match.images[0])}
              alt={match.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">
              {snakeCaseToTitleCase(match.name)}
            </h3>
            <p className="text-gray-600">{"Unknown match %"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const MatchCardSkeletons = ({ skeletonsNumber }) => {
  return (
    <>
      {Array.from({ length: skeletonsNumber }).map((_, index) => (
        <div
          key={index}
          className="flex flex-row items-center gap-4 mb-4 p-4 border rounded-lg"
        >
          <div className="relative w-[150px] h-[150px]">
            <Skeleton className="w-full h-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-3 w-[80px]" />
          </div>
        </div>
      ))}
    </>
  );
};

export default MatchList;

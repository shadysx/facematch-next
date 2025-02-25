"use client";

import ImageUploadButton from "@/components/common/UploadImageButton";
import { useSearchMatchesWithImages } from "@/hooks/queries/useMatches";

export default function MatchesNSFW() {
  const {
    data: matchesNames,
    mutate: getMatchesNames,
    isPending,
    isError,
    error,
  } = useSearchMatchesWithImages();

  const handleImageSelected = (file: File) => {
    getMatchesNames(file);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Face Matches</h1>

      {isPending && <p className="mt-4">Loading...</p>}

      {isError && (
        <p className="mt-4 text-red-500">
          Error: {error instanceof Error ? error.message : "Unknown error"}
        </p>
      )}

      <ImageUploadButton onImageSelected={handleImageSelected} />
      {matchesNames?.map((match) => (
        <div key={match.name}>
          <h2>{match.name}</h2>
          {match.images && match.images[0] && (
            <img
              src={`data:image/jpeg;base64,${match.images[0]}`}
              alt={match.name}
              className="w-[30px] h-[30px] object-cover rounded-sm"
            />
          )}
        </div>
      ))}
    </div>
  );
}

"use client";

import ImageUploadButton from "@/components/common/UploadImageButton";
import { useSearchMatches } from "@/hooks/queries/useMatches";

export default function MatchesSFW() {
  const {
    data: matchesNames,
    mutate: getMatchesNames,
    isPending,
    isError,
    error,
  } = useSearchMatches();

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
        <h2 key={match}>{match}</h2>
      ))}
    </div>
  );
}

"use client";

import ImageUploadButton from "@/components/common/UploadImageButton";
import MatchList from "@/components/features/matches/MatchList";
import { useSearchMatchesWithImages } from "@/hooks/queries/useMatches";

export default function MatchesNSFW() {
  const {
    data: matches,
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
      <h1 className="text-2xl text-center font-bold mb-4">
        Face Matches (NSFW)
      </h1>

      {isError && (
        <p className="mt-4 text-red-500">
          Error: {error instanceof Error ? error.message : "Unknown error"}
        </p>
      )}

      <ImageUploadButton onImageSelected={handleImageSelected} />
      <MatchList matches={matches} isLoading={isPending} />
    </div>
  );
}

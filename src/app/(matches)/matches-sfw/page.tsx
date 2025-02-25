"use client";

import ImageUploadButton from "@/components/common/UploadImageButton";
import { useSearchMatchesWithImages } from "@/hooks/queries/useMatches";
import { Skeleton } from "@/components/ui/skeleton";
import { match } from "assert";

export default function MatchesSFW() {
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
      <h1 className="text-2xl text-center font-bold mb-4">Face Matches</h1>

      {isError && (
        <p className="mt-4 text-red-500">
          Error: {error instanceof Error ? error.message : "Unknown error"}
        </p>
      )}

      <ImageUploadButton onImageSelected={handleImageSelected} />
      <div className="h-4" />
    </div>
  );
}

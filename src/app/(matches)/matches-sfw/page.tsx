"use client";

import ImageUploadButton from "@/components/common/UploadImageButton";
import { useSearchMatches } from "@/hooks/queries/useMatches";
import { useState } from "react";
import { MatchResult } from "@/components/features/matches/MatchResult";

export default function MatchesSFW() {
  const [matchesNames, setMatchesNames] = useState<string[]>([]);

  const {
    data: matches,
    mutate: getMatchesNames,
    isPending,
    isError,
    error,
  } = useSearchMatches();

  const handleImageSelected = async (file: File) => {
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
      <MatchResult
        matchName={matches?.data?.[0] ?? ""}
        className="mt-8"
        isLoading={isPending}
      />
    </div>
  );
}

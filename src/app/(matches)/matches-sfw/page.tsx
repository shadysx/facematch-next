"use client";

import { googleSearchApi } from "@/app/api/endpoints/googleSearch";
import ImageUploadButton from "@/components/common/UploadImageButton";
import MatchList from "@/components/features/matches/MatchList";
import { useSearchMatches } from "@/hooks/queries/useMatches";
import { MatchWithImages } from "@/types/matchWithImages";
import { useEffect, useMemo, useState } from "react";

export default function MatchesSFW() {
  const [matchesWithImages, setMatchesWithImages] = useState<MatchWithImages[]>([]);
  const {
    data: matches,
    mutate: getMatchesNames,
    isPending,
    isError,
    error,
  } = useSearchMatches();

  const handleImageSelected = (file: File) => {
    getMatchesNames(file);
  };

  useEffect(() => {
    const fetchMatchesWithImages = async () => {
      const matchesWithImages: MatchWithImages[] = await Promise.all(matches?.map(async (match) => ({
        name: match,
        images: [await googleSearchApi.searchImage(match)],
      })) ?? []);
      setMatchesWithImages(matchesWithImages);
    };
    fetchMatchesWithImages();
  }, [matches]);

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
      <MatchList matches={matchesWithImages} isLoading={isPending} />
    </div>
  );
}

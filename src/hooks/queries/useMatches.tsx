import { useMutation, useQuery } from "@tanstack/react-query";
import { matchesApi } from "@/api/endpoints";

export const matchesKeys = {
  all: ["matches"] as const,
  list: () => [...matchesKeys.all, "list"] as const,
};

export function useSearchMatches() {
  return useMutation({
    mutationFn: (file: File) => matchesApi.getMatcheNames(file),
  });
}
export function useSearchMatchesWithImages() {
  return useMutation({
    mutationFn: (file: File) => matchesApi.getMatcheNamesWithImages(file),
  });
}

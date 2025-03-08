import { useMutation } from "@tanstack/react-query";
import { matchesApi } from "@/app/api/endpoints";

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

import { useQuery } from "@tanstack/react-query";
import { googleSearchApi } from "@/app/api/endpoints/google-search";

export function useGoogleImage(matchName: string) {
  return useQuery({
    queryKey: ["googleImage", matchName],
    queryFn: () => googleSearchApi.searchImage(matchName),
    enabled: matchName !== "",
  });
}

import { useQuery, useMutation } from "@tanstack/react-query";
import { keysApi } from "@/app/api/endpoints/keys";

export const keysKeys = {
  all: ["keys"] as const,
  lists: () => [...keysKeys.all, "list"] as const,
  list: (filters: string) => [...keysKeys.lists(), { filters }] as const,
};

export function useGetKeys() {
  return useQuery({
    queryKey: keysKeys.lists(),
    queryFn: () => keysApi.getKeys(),
  });
}

export function useCreateKey() {
  return useMutation({
    mutationFn: () => keysApi.createKey(),
  });
}

export function useRefreshKey() {
  return useMutation({
    mutationFn: (keyId: string) => keysApi.refreshKey(keyId),
  });
}

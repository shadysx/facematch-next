import { filesApi } from "@/app/api/endpoints/files";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const filesKeys = {
    all: ['files'] as const,
    lists: () => [...filesKeys.all, 'list'] as const,
    list: (filters: string) => [...filesKeys.lists(), { filters }] as const,
    details: () => [...filesKeys.all, 'detail'] as const,
    detail: (id: number) => [...filesKeys.details(), id] as const,
};

export function useGetFiles(brainId: string) {
    return useQuery({
        queryKey: filesKeys.lists(),
        queryFn: () => filesApi.getFiles(brainId)
    });
}

export function useUploadFiles(brainId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (files: File[]) => filesApi.uploadFiles(brainId, files),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: filesKeys.lists() });
        },
    });
}
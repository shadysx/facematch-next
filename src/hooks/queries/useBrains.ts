import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { brainsApi } from "@/app/api/endpoints/brains";

export const brainsKeys = {
    all: ['brains'] as const,
    lists: () => [...brainsKeys.all, 'list'] as const,
    list: (filters: string) => [...brainsKeys.lists(), { filters }] as const,
    details: () => [...brainsKeys.all, 'detail'] as const,
    detail: (id: number) => [...brainsKeys.details(), id] as const,
};

export function useGetBrains() {
    return useQuery({
        queryKey: brainsKeys.lists(),
        queryFn: () => brainsApi.getBrains()
    });
}

export function useCreateBrain() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (name: string) => brainsApi.createBrain(name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: brainsKeys.lists() });
        }
    });
}


export function useDeleteBrain() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => brainsApi.deleteBrain(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: brainsKeys.lists() });
        }
    });
}
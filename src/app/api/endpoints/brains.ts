import { fetchApi } from "../client";

interface BrainResponse {
  brains: Brain[];
}

export const brainsApi = {
  getBrains: async () => {
    const response = await fetchApi<BrainResponse>(`/api/brains`, {
      method: "GET",
    });
    return response.brains;
  },
  createBrain: (name: string) => {
    return fetchApi<void>(`/api/brains`, {
      method: "POST",
      body: { name },
    });
  },
  deleteBrain: (id: string) => {
    return fetchApi<void>(`/api/brains/${id}`, {
      method: "DELETE",
    });
  },
};
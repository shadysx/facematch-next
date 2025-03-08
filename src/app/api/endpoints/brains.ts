import { Brain } from "@/models/api/Brain";
import { fetchApi } from "../client";
import { BrainStatus } from "@/enums/BrainStatus";

interface BrainResponse {
  brains: Brain[];
}

interface BrainStatusResponse {
  status: BrainStatus;
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
  getBrainStatus: async (brainId: string) => {
    const response = await fetchApi<BrainStatusResponse>(
      `/api/brains/${brainId}/status`,
      {
        method: "GET",
      }
    );
    return response.status;
  },
  trainBrain: (brainId: string) => {
    return fetchApi<void>(`/api/brains/${brainId}/train`, {
      method: "POST",
    });
  },
};

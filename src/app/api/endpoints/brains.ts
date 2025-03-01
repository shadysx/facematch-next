import { fetchApi } from "../client";
import { authClient } from "@/lib/auth-client";

const session = authClient.getSession();

interface BrainResponse {
  brains: Brain[];
}

export const brainsApi = {
  getBrains: async () => {
    const response = await fetchApi<BrainResponse>(`${process.env.NEXT_PUBLIC_API_URL}/brains`, {
      method: "GET",
        headers: {
        Authorization: `Bearer ${session.token}`,
        },
    });
    return response.brains;
    },
  createBrain: (name: string) => {
    return fetchApi<void>(`${process.env.NEXT_PUBLIC_API_URL}/brains`, {
      method: "POST",
      body: { name },
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
  },
  deleteBrain: (id: string) => {
    return fetchApi<void>(`${process.env.NEXT_PUBLIC_API_URL}/brains/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
  },
};
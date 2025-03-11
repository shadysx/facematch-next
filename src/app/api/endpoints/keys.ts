import { ApiKey } from "@/models/better-auth/ApiKey";
import { fetchApi } from "../client";

export const keysApi = {
  getKeys: async () => {
    const response = await fetchApi<ApiKey[]>(`/api/keys`, {
      method: "GET",
    });
    return response;
  },
  createKey: async () => {
    const response = await fetchApi<ApiKey>(`/api/keys`, {
      method: "POST",
    });
    return response;
  },
  refreshKey: async (keyId: string) => {
    const response = await fetchApi<ApiKey>(`/api/keys/${keyId}`, {
      method: "PATCH",
    });
    return response;
  },
};

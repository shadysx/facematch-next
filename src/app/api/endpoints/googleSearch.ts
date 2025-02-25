import { fetchApi } from "../client";
import { API_CONFIG } from "../../../../config";


export const googleSearchApi = {
  searchImage: (query: string) => {
    return fetchApi<string>(`/api/google-search`, {
      method: "GET",
      params: { q: query },
    });
  },
}; 
import { fetchApi } from "../client";

export const googleSearchApi = {
  searchImage: (query: string) => {
    return fetchApi<string>(`${process.env.NEXT_PUBLIC_API_URL}/google-search`, {
      method: "GET",
      params: { q: query },
    });
  },
};

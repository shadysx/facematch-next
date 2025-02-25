import { fetchApi } from "../client";
import { API_CONFIG } from "../../../config";
import { MatchWithImages } from "@/types/match";

export const matchesApi = {
  getMatcheNames: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return fetchApi<string[]>(`${API_CONFIG.BASE_URL}/get-matches-names`, {
      method: "POST",
      body: formData,
    });
  },
  getMatcheNamesWithImages: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return fetchApi<MatchWithImages[]>(
      `${API_CONFIG.BASE_URL}/get-matches-names-with-images`,
      {
        method: "POST",
        body: formData,
      }
    );
  },
};

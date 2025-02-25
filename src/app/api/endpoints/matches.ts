import { fetchApi } from "../client";
import { API_CONFIG } from "../../../../config";
import { MatchWithImages } from "@/types/matchWithImages";

export const matchesApi = {
  getMatcheNames: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return fetchApi<string[]>(`${API_CONFIG.AI_ENGINE_URL}/get-matches-names`, {
      method: "POST",
      body: formData,
    });
  },
  getMatcheNamesWithImages: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return fetchApi<MatchWithImages[]>(
      `${API_CONFIG.AI_ENGINE_URL}/get-matches-names-with-images`,
      {
        method: "POST",
        body: formData,
      }
    );
  },
};

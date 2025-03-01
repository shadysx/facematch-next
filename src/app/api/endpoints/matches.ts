import { fetchApi } from "../client";
import { MatchWithImages } from "@/models/api/MatchWithImages";

export const matchesApi = {
  getMatcheNames: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return fetchApi<string[]>(`${process.env.NEXT_PUBLIC_AI_ENGINE_URL}/get-matches-names`, {
      method: "POST",
      body: formData,
    });
  },
  getMatcheNamesWithImages: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return fetchApi<MatchWithImages[]>(
      `${process.env.NEXT_PUBLIC_AI_ENGINE_URL}/get-matches-names-with-images`,
      {
        method: "POST",
        body: formData,
      }
    );
  },
};

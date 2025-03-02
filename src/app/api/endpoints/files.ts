import { fetchApi } from "../client";

export interface FileInfo {
    name: string;
    path: string;
    size: number;
}

export interface FilesResponse {
    status: string;
    files: FileInfo[];
    total: number;
    total_size: number;
}

export const filesApi = {
    getFiles: async (brainId: string) => {
        console.log("getFiles", brainId)
        return fetchApi<FilesResponse>(`/api/files/${brainId}`, {
            method: "GET",
        });
    },
    uploadFiles: async (brainId: string, files: File[]) => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });

        return fetchApi<FilesResponse>(`/api/files/${brainId}`, {
            method: 'POST',
            body: formData,
        });
    },
};
import axios from "axios";

export async function fetchApi<T>(
  url: string,
  options?: {
    method?: "GET" | "POST" | "DELETE";
    body?: FormData | Record<string, string>;
    headers?: Record<string, string>;
  }
): Promise<T> {
  try {
    const method = options?.method || "GET";

    if (method === "GET") {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        ...options,
      });
      return response.data;
    }

    if (method === "POST") {
      const isFormData = options?.body instanceof FormData;
      const headers = isFormData
        ? { ...options?.headers }
        : {
          "Content-Type": "application/json",
          ...options?.headers,
        };

      const response = await axios.post(url, options?.body, {
        headers,
        ...options,
      });
      return response.data;
    }

    if (method === "DELETE") {
      const response = await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        ...options,
      });
      return response.data;
    }

    throw new Error(`Unsupported method: ${method}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `${error.response?.data.error || "Unknown error"}`
      );
    }
    throw error;
  }
}

import axios from "axios";

export async function fetchApi<T>(
  url: string,
  options?: {
    method?: "GET" | "POST";
    body?: FormData | Record<string, any>;
    headers?: Record<string, string>;
    [key: string]: any;
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

    throw new Error(`Unsupported method: ${method}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `API error: ${error.response?.status || "Unknown"} - ${error.message}`
      );
    }
    throw error;
  }
}

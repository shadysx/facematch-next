import { authClient } from "@/lib/auth-client";

export const createApiKey = async () => {
  const { data } = await authClient.apiKey.create({
    name: "My API Key",
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  });

  return data;
};

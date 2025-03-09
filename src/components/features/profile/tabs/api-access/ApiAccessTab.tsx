import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Card } from "@/components/ui/card";
import { ApiAccessHeaderCard } from "./ApiAccessHeaderCard";
import { ApiKeyList } from "./ApiKeysList";
import { ApiAccessExemple } from "./ApiAccessExemple";
import { useState } from "react";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export const ApiAccessTab = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Create hook
  useEffect(() => {
    const fetchApiKeys = async () => {
      const { data: apiKeys, error } = await authClient.apiKey.list();
      if (error) {
        console.error(error);
        return;
      }
      setApiKeys(apiKeys || []);
    };
    fetchApiKeys();
  }, []);

  // TODO: Add toast notification + use the utils => createApiKey()
  const handleCreateApiKey = async () => {
    setIsLoading(true);
    try {
      const { data: newKey, error } = await authClient.apiKey.create({
        name: `API Key ${apiKeys?.length ?? 0 + 1}`,
      });

      if (error) throw error;

      setApiKeys([...apiKeys, newKey]);
    } catch (error) {
      console.error("Failed to create API key:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: Add toast notification && fix the delete
  const handleDeleteKey = async (keyId: string) => {
    try {
      const { error } = await authClient.apiKey.delete({
        keyId: keyId,
      });
      if (error) throw error;

      setApiKeys(apiKeys.filter((key) => key.id !== keyId));
    } catch (error) {
      console.error("Failed to delete API key:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Keys</CardTitle>
        <CardDescription>
          Manage your API keys for accessing the Brain API
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ApiAccessHeaderCard
          handleCreateApiKey={handleCreateApiKey}
          isLoading={isLoading}
        />
        <ApiKeyList apiKeys={apiKeys} handleDeleteKey={handleDeleteKey} />
        <ApiAccessExemple />
      </CardContent>
    </Card>
  );
};

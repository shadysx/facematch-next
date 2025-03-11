import { CardContent } from "@/components/ui/card";

import { Card } from "@/components/ui/card";
import { ApiAccessHeaderCard } from "./ApiAccessHeaderCard";
import { ApiAccessExemple } from "./ApiAccessExemple";
import {
  useCreateKey,
  useGetKeys,
  useRefreshKey,
} from "@/hooks/queries/useKeys";
import { useState } from "react";
import { ApiKey } from "@/models/better-auth/ApiKey";
import { ApiKeyLine } from "./ApiKeysLine";

export const ApiAccessTab = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [newApiKey, setNewApiKey] = useState<ApiKey>();
  const { data: apiKeys, isLoading } = useGetKeys();
  const { mutateAsync: createKey } = useCreateKey();
  const { mutateAsync: refreshKey } = useRefreshKey();
  // TODO: Add toast notification
  const handleCreateApiKey = async () => {
    const newApiKey = await createKey();
    console.log(newApiKey);
    setNewApiKey(newApiKey);
  };

  // TODO: Add toast notification && fix the delete
  // const handleDeleteKey = async (keyId: string) => {
  //   try {
  //     const { error } = await authClient.apiKey.delete({
  //       keyId: keyId,
  //     });
  //     if (error) throw error;
  //   } catch {
  //     // TODO: Add toast notification
  //   }
  // };

  const handleRefreshKey = async (keyId: string) => {
    const newApiKey = await refreshKey(keyId);
    console.log("refresh", newApiKey);
    setNewApiKey(newApiKey);
  };

  return (
    <Card>
      <CardContent className="space-y-6">
        <ApiAccessHeaderCard
          shouldShowCreateButton={apiKeys?.length === 0}
          handleCreateApiKey={handleCreateApiKey}
          isLoading={isLoading}
        />
        {(newApiKey || apiKeys?.[0]) && (
          <ApiKeyLine
            apiKey={newApiKey || apiKeys![0]}
            handleRefreshKey={handleRefreshKey}
          />
        )}
        <ApiAccessExemple />
      </CardContent>
    </Card>
  );
};

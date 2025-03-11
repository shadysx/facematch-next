import { ApiKeyLine } from "./ApiKeysLine";

interface ApiKeyListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiKeys: any[];
  handleRefreshKey: (keyId: string) => Promise<void>;
}

export const ApiKeyList = (props: ApiKeyListProps) => {
  const { apiKeys, handleRefreshKey } = props;
  console.log("apiKeys", apiKeys);

  return (
    <div className="space-y-4">
      {[...apiKeys].reverse().map((apiKey, index) => (
        <ApiKeyLine
          key={index}
          apiKey={apiKey}
          handleRefreshKey={handleRefreshKey}
        />
      ))}
    </div>
  );
};

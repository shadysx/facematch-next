import { Button } from "@/components/ui/button";
import { Copy, RefreshCw } from "lucide-react";
import { ApiKey } from "@/models/better-auth/ApiKey";

interface ApiKeyLineProps {
  apiKey: ApiKey;
  handleRefreshKey: (keyId: string) => Promise<void>;
}

export const ApiKeyLine = (props: ApiKeyLineProps) => {
  const { apiKey, handleRefreshKey } = props;

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    // TODO: Add toast notification
  };

  return (
    <div
      key={apiKey.id}
      className="flex items-center justify-between p-4 border rounded-lg"
    >
      <div className="space-y-1">
        <p className="text-sm font-medium">{apiKey.name}</p>
        <div className="flex items-center gap-2">
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {apiKey.key ??
              "****************************************************************"}
          </code>
          {apiKey.key && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => handleCopyKey(apiKey.key!)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xs text-muted-foreground">
            Created on {new Date(apiKey.createdAt).toLocaleDateString()}
          </p>
          <p className="text-xs text-muted-foreground">
            Expires on{" "}
            {apiKey.expiresAt
              ? new Date(apiKey.expiresAt).toLocaleDateString()
              : "never"}
          </p>
          <p className="text-xs text-muted-foreground">
            {apiKey.rateLimitMax} requests per{" "}
            {apiKey.rateLimitTimeWindow
              ? (apiKey.rateLimitTimeWindow / 1000 / 60).toFixed(2) + " min"
              : "1 min"}
          </p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        title="Refresh API key"
        onClick={async () => {
          try {
            await handleRefreshKey(apiKey.id);
          } catch {
            // TODO: Add toast notification
          }
        }}
      >
        <RefreshCw className="h-4 w-4" />
      </Button>
    </div>
  );
};

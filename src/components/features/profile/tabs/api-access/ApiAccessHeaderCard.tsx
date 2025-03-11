import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";

interface ApiAccessHeaderCardProps {
  handleCreateApiKey: () => void;
  shouldShowCreateButton: boolean;
  isLoading: boolean;
}

export const ApiAccessHeaderCard = (props: ApiAccessHeaderCardProps) => {
  const { handleCreateApiKey, shouldShowCreateButton, isLoading } = props;

  return (
    <div className="flex justify-between items-center mt-4">
      <div className="space-y-1">
        <h3 className="text-sm font-medium">Your API Keys</h3>
        <p className="text-sm text-muted-foreground">
          Create and manage API keys to access our API
        </p>
      </div>
      {shouldShowCreateButton && (
        <Button onClick={handleCreateApiKey} disabled={isLoading}>
          <Key className="mr-2 h-4 w-4" />
          {isLoading ? "Creating..." : "Generate New Key"}
        </Button>
      )}
    </div>
  );
};

import { Card, CardContent } from "@/components/ui/card";
import { BrainStatus } from "@/enums/BrainStatus";
import { formatBrainStatus } from "@/utils/formatBrainStatus";
import { Brain } from "lucide-react";

type StatusCardProps = {
    brainStatus?: BrainStatus;
}

const StatusCard = (props: StatusCardProps) => {
    const { brainStatus } = props;

    return (
        <Card className="bg-purple-50 dark:bg-purple-900/20 border-0">
            <CardContent className="p-3">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <Brain className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {formatBrainStatus(brainStatus)}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default StatusCard;
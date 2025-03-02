import { Card, CardContent } from "@/components/ui/card";
import { BrainStatus } from "@/enums/BrainStatus";
import { formatBrainStatus } from "@/utils/formatBrainStatus";
import { Brain } from "lucide-react";
import { motion } from "framer-motion";

type StatusCardProps = {
    brainStatus?: BrainStatus;
}

const StatusCard = (props: StatusCardProps) => {
    const { brainStatus } = props;
    const isReady = brainStatus === BrainStatus.READY;
    const isTraining = brainStatus === BrainStatus.TRAINING;

    return (
        <Card className={`border-0 relative overflow-hidden w-[140px] h-[52px]
            ${isReady
                ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20'
                : 'bg-purple-50 dark:bg-purple-900/20'}`
        }>
            <CardContent className="p-3 relative z-10 h-full flex items-center">
                <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg relative flex-shrink-0
                        ${isReady
                            ? 'bg-gradient-to-r from-purple-500/90 to-blue-500/90'
                            : 'bg-purple-100 dark:bg-purple-900/30'}`
                    }>
                        <Brain className={`w-4 h-4 
                            ${isReady
                                ? 'text-white'
                                : 'text-purple-600 dark:text-purple-400'}`
                        } />
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Status</p>
                        <p className="text-sm font-medium truncate text-gray-900 dark:text-gray-100">
                            {formatBrainStatus(brainStatus)}
                        </p>
                    </div>
                </div>
            </CardContent>
            {isTraining && (
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{
                        background: 'linear-gradient(to right, transparent, rgb(147, 51, 234), rgb(59, 130, 246), transparent)',
                        backgroundSize: '200% 100%'
                    }}
                    animate={{
                        backgroundPosition: ['100% 0', '-100% 0']
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            )}
        </Card>
    )
}

export default StatusCard;
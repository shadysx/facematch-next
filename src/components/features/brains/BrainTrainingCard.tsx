import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useGetFiles } from "@/hooks/queries/useFiles"
import { formatBytesToMb, formatBytesToMbStr } from "@/utils/formatBytesToMb"
import { Database } from "lucide-react"
import { BrainStatus } from "@/enums/BrainStatus"
import { Zap } from "lucide-react"
import LinearGradiantAnimatedButton from "@/components/common/LinearGradiantAnimatedButton"
import { useBrainStatus, useTrainBrain } from "@/hooks/queries/useBrains"

interface BrainTrainingCardProps {
    brainId: string
}

const BrainTrainingCard = (props: BrainTrainingCardProps) => {
    const { brainId } = props
    const { data: brainStatus } = useBrainStatus(brainId)
    const { mutate: trainBrain } = useTrainBrain();

    const { data } = useGetFiles(brainId)
    const { total_size = 0, total = 0 } = data || {}

    const handleTrainBrain = () => {
        trainBrain(brainId)
    }


    return (
        <div className="lg:col-span-2 p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10">
            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        Training Stats
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Dataset Size</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{total} images</span>
                            </div>
                            <Progress value={formatBytesToMb(total_size) / 500 * 100} className="h-2" />
                        </div>
                        <Card className="bg-white/50 dark:bg-gray-800/50">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <Database className="w-5 h-5 text-purple-500" />
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Storage Used</p>
                                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{formatBytesToMbStr(total_size)} MB / 500 MB</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        Training Requirements
                    </h3>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            Minimum 100 images required
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            Images must be in JPG/PNG format
                        </li>
                    </ul>
                </div>
                <LinearGradiantAnimatedButton
                    buttonText="Start Training"
                    isLoading={brainStatus === BrainStatus.TRAINING}
                    loadingText="Training in Progress..."
                    onClick={handleTrainBrain}
                />
            </div>
        </div>
    )
}

export default BrainTrainingCard
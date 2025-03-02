import { Card, CardContent } from "@/components/ui/card"
import BrainTrainingCard from "./BrainTrainingCard"
import BrainDropzone from "./Dropzone"
import { useBrainStatus } from "@/hooks/queries/useBrains"
import { BrainStatus } from "@/enums/BrainStatus"

interface BrainTrainingSectionProps {
    brainId: string
}

const BrainTrainingSection = (props: BrainTrainingSectionProps) => {
    const { brainId } = props
    const { data: brainStatus } = useBrainStatus(brainId)

    return (
        <Card className="border-2 border border-purple-200 dark:border-purple-300/20">
            <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-5">
                    <BrainTrainingCard brainId={brainId} />
                    <BrainDropzone brainId={brainId} disabled={brainStatus === BrainStatus.TRAINING} />
                </div>
            </CardContent>
        </Card>

    )
}

export default BrainTrainingSection
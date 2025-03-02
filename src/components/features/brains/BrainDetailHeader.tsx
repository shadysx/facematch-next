import StatusCard from "./StatusCard"

import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronRight, Link } from "lucide-react"
import { formatDisplayName } from "@/utils/formatDisplayName"

import { Card, CardContent } from "@/components/ui/card"
import { useBrainStatus } from "@/hooks/queries/useBrains"

interface BrainDetailHeaderProps {
    brain: Brain
}

const BrainDetailsHeader = (props: BrainDetailHeaderProps) => {
    const { brain } = props
    const { data: brainStatus } = useBrainStatus(brain.id)
    return (
        < Card className="border-2 border border-purple-200 dark:border-purple-300/20 overflow-hidden" >
            <CardContent className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20">
                                <Link href="/brains">
                                    Brains
                                </Link>
                            </Badge>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                {formatDisplayName(brain.name)}
                            </h1>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>Created on {new Date(brain.createdAt).toLocaleString()}</span>
                        </div>
                    </div>
                    <StatusCard brainStatus={brainStatus} />
                </div>
            </CardContent>
        </Card >
    )
}

export default BrainDetailsHeader
import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ImageIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { formatBytesToMbStr } from "@/utils/formatBytesToMb"
import Image from "next/image"
import { useGetFiles } from "@/hooks/queries/useFiles"
import { useState } from "react"

interface BrainFilePreviewProps {
    brainId: string
}

const BrainFilePreview = (props: BrainFilePreviewProps) => {
    const [selectedFile, setSelectedFile] = useState<string | null>(null)
    const { brainId } = props
    const { data } = useGetFiles(brainId)
    const { total = 0, files = [] } = data || {}
    return (
        < Card className="border-2 border border-purple-200 dark:border-purple-300/20" >
            <CardContent className="p-0">
                <div className="grid grid-cols-2 divide-x divide-purple-200 dark:divide-purple-300/20">
                    {/* Files Section */}
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                Files
                            </h3>
                            <Badge variant="outline">
                                {total} files
                            </Badge>
                        </div>
                        <ScrollArea className="h-[400px] pr-4">
                            <div className="space-y-2">
                                {files.map((file, index) => (
                                    <div key={index}>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start gap-2 px-2"
                                            onClick={() => setSelectedFile(file.name)}
                                        >
                                            <ImageIcon className="h-4 w-4 text-purple-600" />
                                            <span className="truncate">{file.name}</span>
                                            <span className="ml-auto text-xs text-gray-500">
                                                {formatBytesToMbStr(file.size)} MB
                                            </span>
                                        </Button>
                                        {index < files.length - 1 && (
                                            <Separator className="my-2" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>

                    {/* Preview */}
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                Preview
                            </h3>
                        </div>
                        <div className="flex items-center justify-center h-[400px] bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                            {selectedFile ? (
                                <Image
                                    src={`/api/files/${brainId}/${selectedFile}`}
                                    alt={selectedFile}
                                    className="max-h-full max-w-full object-contain"
                                    width={500}
                                    height={500}
                                    priority
                                />
                            ) : (
                                <div className="text-center text-gray-500 dark:text-gray-400">
                                    <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                    <p>Select a file to preview</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card >
    )
}

export default BrainFilePreview
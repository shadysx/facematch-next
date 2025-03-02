import { useState } from "react"
import { motion } from "framer-motion"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUploadFiles } from "@/hooks/queries/useFiles"

interface BrainDropzoneProps {
    brainId: string
    disabled?: boolean
}

const BrainDropzone = (props: BrainDropzoneProps) => {
    const { brainId, disabled } = props
    const [isDragging, setIsDragging] = useState(false)
    const { mutate: uploadFiles } = useUploadFiles(brainId)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (disabled) return;
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        if (droppedFiles.length > 0) {
            uploadFiles(droppedFiles);
        }
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        if (e.target.files?.length) {
            const selectedFiles = Array.from(e.target.files);
            uploadFiles(selectedFiles);
        }
    }

    return (
        <div className="lg:col-span-3 p-6 relative">
            {disabled && (
                <div className="absolute inset-0 z-10 bg-background/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <div className="text-center p-6">
                        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                            Training in Progress
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            Please wait until training is complete to upload new files
                        </p>
                    </div>
                </div>
            )}
            <div
                onDragOver={disabled ? undefined : handleDragOver}
                onDragLeave={disabled ? undefined : handleDragLeave}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center h-full min-h-[400px] rounded-xl
                    transition-all duration-300 
                    ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                    ${isDragging
                        ? 'bg-purple-100/50 dark:bg-purple-900/30 scale-[0.99]'
                        : 'bg-gray-50/50 dark:bg-purple-900/10'}`}
            >
                <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: isDragging ? 1.1 : 1 }}
                    className="text-center"
                >
                    <Upload className={`w-16 h-16 mx-auto mb-4 transition-colors duration-300
                     ${isDragging
                            ? 'text-purple-600 dark:text-purple-400'
                            : 'text-gray-400 dark:text-gray-600'}`} />
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                        Drop Training Data
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-center max-w-sm mb-6">
                        Drag and drop your training folder here, or click to select files
                    </p>
                </motion.div>
                <label htmlFor="file-upload">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={disabled}
                        asChild
                    >
                        <span>Browse Files</span>
                    </Button>
                </label>
                <input
                    id="file-upload"
                    type="file"
                    multiple
                    disabled={disabled}
                    className="hidden"
                    onChange={handleFileSelect}
                    accept="image/*"
                />
            </div>
        </div>
    )
}

export default BrainDropzone
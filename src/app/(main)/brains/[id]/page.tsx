"use client"

import { useParams } from "next/navigation"
import { useGetBrains } from "@/hooks/queries/useBrains"
import { motion } from "framer-motion"
import { Loader } from "lucide-react"
import FilePreview from "@/components/features/brains/FilePreview"
import BrainTrainingSection from "@/components/features/brains/BrainTrainingSection"
import BrainDetailsHeader from "@/components/features/brains/BrainDetailHeader"

export default function BrainDetailPage() {
  const params = useParams()
  const brainId = params.id as string
  const { data: brains, isLoading } = useGetBrains()

  // TODO: Add skeleton loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader className="w-8 h-8 text-purple-600" />
        </motion.div>
      </div>
    )
  }

  const brain = brains?.find((brain) => brain.id === brainId)

  if (!brain) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Brain not found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The brain you&apos;re looking for doesn&apos;t exist or has been deleted.
          </p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen"
    >
      <div className="space-y-6 container mx-auto py-8 px-4">
        <BrainDetailsHeader brain={brain} />
        <BrainTrainingSection brainId={brainId} />
        <FilePreview brainId={brainId} />
      </div>
    </motion.div>
  )
} 
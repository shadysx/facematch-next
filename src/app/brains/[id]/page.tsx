"use client"

import { useParams } from "next/navigation"
import { useGetBrains } from "@/hooks/queries/useBrains"
import { motion } from "framer-motion"
import { Brain, Upload, Cpu, Calendar, Loader, Database, Zap, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useState, useCallback } from "react"
import { useGetFiles, useUploadFiles } from "@/hooks/queries/useFiles"
import { formatBytesToMb, formatBytesToMbStr } from "@/utils/formatBytesToMb"

export default function BrainDetailPage() {
  const params = useParams()
  const brainId = params.id as string
  const { data: brains, isLoading } = useGetBrains()
  const [isDragging, setIsDragging] = useState(false)
  const [isTraining, setIsTraining] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const { data, isLoading: isLoadingFiles } = useGetFiles(brainId)
  const { total_size = 0, total = 0, files = [] } = data || {}

  const { mutate: uploadFiles } = useUploadFiles(brainId)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      uploadFiles(droppedFiles);
    }
  }, [brainId]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const selectedFiles = Array.from(e.target.files);
      uploadFiles(selectedFiles);
    }
  }, [brainId]);

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

  const brain = brains?.[0]

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
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900"
    >
      {/* Header avec infos basiques */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl">
        <div className="container mx-auto py-6 px-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20">
                  Neural Engine
                </Badge>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {brain.name}
                </h1>
              </div>
              <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Created on {new Date(brain.createdAt).toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Card className="bg-purple-50 dark:bg-purple-900/20 border-0">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Brain className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {isTraining ? "Training" : "Ready"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Training Section */}
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="border-2 border-dashed border-purple-200 dark:border-purple-300/20 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                {/* Left panel with training stats */}
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

                    <Button
                      size="lg"
                      onClick={() => setIsTraining(true)}
                      disabled={isTraining}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700
                               text-white font-medium py-6 rounded-xl transition-all duration-300 
                               shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-3"
                    >
                      {isTraining ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          Training in Progress...
                        </>
                      ) : (
                        <>
                          <Cpu className="w-5 h-5" />
                          Start Training
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Dropzone */}
                <div className="lg:col-span-3 p-6">
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center h-full min-h-[400px] rounded-xl
                              transition-all duration-300 cursor-pointer
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
                      <label htmlFor="file-upload">
                        <Button variant="outline" size="sm" asChild>
                          <span>Browse Files</span>
                        </Button>
                      </label>
                    </motion.div>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileSelect}
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
} 
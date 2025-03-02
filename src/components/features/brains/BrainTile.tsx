"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Cpu } from "lucide-react"
import { motion } from "framer-motion"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { formatDisplayName } from "@/utils/formatDisplayName"
import { useRouter } from "next/navigation"
interface BrainTileProps {
  brain: Brain
  onDelete: (id: string) => void
  isLoading?: boolean
  isProcessing?: boolean
}

export function BrainTile({ brain, onDelete, isLoading, isProcessing = false }: BrainTileProps) {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full backdrop-blur-lg dark:bg-gradient-to-br dark:from-purple-900/10 dark:to-blue-900/10 
                       border-gray-200 dark:border-purple-200/20 border rounded-xl overflow-hidden relative cursor-pointer"
            onClick={() => {
              router.push(`/brains/${brain.id}`)
            }}
          >
        {isProcessing && (
          <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden bg-gray-100 dark:bg-purple-900/20">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:via-blue-500 dark:to-purple-500"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-purple-400/20 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
                delay: 0.5
              }}
            />
          </div>
        )}
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <motion.h3 
                className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {formatDisplayName(brain.name)}
              </motion.h3>
              <motion.p 
                className="text-sm text-gray-600 dark:text-purple-200/70 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {new Date(brain.createdAt).toLocaleString([], {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                }).replace(',', ' |')}
              </motion.p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  onClick={(e) => e.stopPropagation()}
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-500 hover:text-red-600 hover:bg-red-50 
                           dark:text-purple-300 dark:hover:text-red-400 dark:hover:bg-red-900/20 
                           transition-all duration-300 rounded-lg"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your brain
                    and remove all its data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(brain.id)
                    }}
                    disabled={isLoading}
                    className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                  >
                    {isLoading ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50/80 dark:bg-purple-900/20 border-t border-gray-200 dark:border-purple-300/10 py-3">
          <div className="flex items-center justify-between w-full">
            <div 
              className="flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-gray-700 dark:text-purple-300 font-medium">Neural Engine</span>
            </div>
            
            {isProcessing && (
              <motion.div 
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.span
                  className="inline-block w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-blue-600 dark:text-blue-300 text-sm">Processing</span>
              </motion.div>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
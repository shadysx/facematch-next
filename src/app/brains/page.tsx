"use client"

import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { useCreateBrain, useGetBrains, useDeleteBrain } from "@/hooks/queries/useBrains"
import { BrainTile } from "@/components/features/brains/BrainTile"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sparkles, Loader } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import GetStarted from "@/components/features/brains/GetStarted"

interface IFormInputs {
  name: string
}

export default function BrainsPage() {
  const session = authClient.useSession()

  const { handleSubmit, control } = useForm<IFormInputs>({
    defaultValues: {
      name: "",
    },
  })

  const { mutate: createBrain, error } = useCreateBrain()
  const { data: brains, isLoading } = useGetBrains()
  const { mutate: deleteBrain, error: deleteError } = useDeleteBrain()

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    createBrain(data.name)
  }


  // TODO: Use middleware to redirect to login page if user is not authenticated or protected route
  if (!session.data) {
    return <GetStarted />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <motion.div
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="lg:col-span-3 lg:sticky lg:top-8 lg:self-start"
        >
          <div className="backdrop-blur-xl bg-purple-900/5 p-6 rounded-xl border border-purple-300/20">
            <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Create Neural Engine
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="relative">
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter brain name..."
                      className="w-full bg-white dark:bg-purple-900/10 
                               border-gray-200 dark:border-purple-300/20 
                               rounded-lg 
                               text-gray-900 dark:text-purple-100 
                               placeholder:text-gray-400 dark:placeholder:text-purple-300/50 
                               focus:border-purple-500 dark:focus:border-purple-400/50 
                               focus:ring-purple-500/20 dark:focus:ring-purple-400/20"
                    />
                  )}
                />
                <motion.div
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-xl"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700
                         text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                {isLoading ? 'Creating...' : 'Initialize'}
              </Button>
              {error && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-400 text-sm"
                >
                  {error.message}
                </motion.p>
              )}
              {/* TODO: use toast */}
              {deleteError && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-400 text-sm"
                >
                  {deleteError.message}
                </motion.p>
              )}
            </form>
          </div>
        </motion.div>

        <div className="lg:col-span-9">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {brains?.map((brain) => (
              <motion.div
                key={brain.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
              >
                <BrainTile
                  brain={brain}
                  onDelete={(id) => deleteBrain(id)}
                  isLoading={isLoading}
                />
              </motion.div>
            ))}
          </motion.div>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center mt-8"
            >
              <div className="flex items-center gap-2 text-purple-300">
                <Loader className="w-5 h-5 animate-spin" />
                <span className="text-sm">Initializing neural network...</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
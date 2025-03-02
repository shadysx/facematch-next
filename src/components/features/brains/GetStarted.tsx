import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Brain, Lock, ArrowRight, Star } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BrainsGetStarted() {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto py-12 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-12"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Unlock Neural Engines
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Create, train and deploy custom AI models with our breakthrough Neural Engine technology.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Feature 1 */}
          <motion.div
            className="bg-white/50 dark:bg-purple-900/10 border border-gray-200 dark:border-purple-300/20 rounded-xl p-8 
                        backdrop-blur-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-xl 
                            group-hover:from-purple-500/20 group-hover:to-blue-500/20 transition-all duration-300" />

            <div className="relative z-10">
              <div className="bg-purple-100 dark:bg-purple-900/50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Brain className="text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Custom AI Models</h3>
              <p className="text-gray-600 dark:text-gray-300">Create personalized neural networks optimized for your specific needs.</p>
            </div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="bg-white/50 dark:bg-purple-900/10 border border-gray-200 dark:border-purple-300/20 rounded-xl p-8 
                        backdrop-blur-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -5 }}
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl 
                            group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300" />

            <div className="relative z-10">
              <div className="bg-blue-100 dark:bg-blue-900/50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Star className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Advanced Processing</h3>
              <p className="text-gray-600 dark:text-gray-300">Leverage cutting-edge AI techniques with our neural engine technology.</p>
            </div>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="bg-white/50 dark:bg-purple-900/10 border border-gray-200 dark:border-purple-300/20 rounded-xl p-8 
                        backdrop-blur-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ y: -5 }}
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-xl 
                            group-hover:from-purple-500/20 group-hover:to-blue-500/20 transition-all duration-300" />

            <div className="relative z-10">
              <div className="bg-purple-100 dark:bg-purple-900/50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Lock className="text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Secure & Private</h3>
              <p className="text-gray-600 dark:text-gray-300">Your data and models are fully encrypted and accessible only to you.</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={() => router.push("/signup")}
            className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700
                       text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 text-lg"
            size="lg"
          >
            <motion.span
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-700 to-blue-700"
              initial={{ x: "100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.4 }}
            />
            <span className="relative flex items-center gap-2">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
          </Button>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Button
              variant="link"
              onClick={() => router.push("/signin")}
              className="text-purple-600 dark:text-purple-400 p-0 h-auto font-normal hover:underline"
            >
              Sign in
            </Button>
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
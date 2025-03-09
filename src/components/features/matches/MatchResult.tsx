import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { snakeCaseToTitleCase } from "@/utils/snakeCaseToTitleCase";
import Image from "next/image";
interface MatchResultProps {
  matchName: string;
  className?: string;
  isLoading: boolean;
}

export function MatchResult({ matchName, isLoading }: MatchResultProps) {
  if (isLoading) {
    return <MatchResultSkeleton />;
  }

  if (matchName === "") {
    return (
      <div className="max-w-md mx-auto p-6 rounded-2xl bg-card border shadow-lg">
        <div className="text-center space-y-6">
          <h2 className="text-lg font-medium text-muted-foreground">
            Please upload an image to find a match
          </h2>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6 rounded-2xl bg-card border shadow-lg"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center space-y-6"
      >
        <div className="flex items-center justify-center gap-2 text-primary">
          <Sparkles className="w-5 h-5 animate-pulse" />
          <h2 className="text-lg font-medium text-muted-foreground">
            We found a match!
          </h2>
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <Image
            src="test"
            alt={matchName}
            className="w-full h-64 object-cover rounded-lg"
            width={256}
            height={256}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-2"
        >
          <h3 className="text-2xl font-bold tracking-tight">
            {snakeCaseToTitleCase(matchName)}
          </h3>
          <p className="text-lg font-medium text-muted-foreground">
            This person has the closest facial features to your uploaded image.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function MatchResultSkeleton() {
  return (
    <div className="max-w-md mx-auto p-6 rounded-2xl bg-card border shadow-lg">
      <div className="text-center space-y-6">
        {/* Title skeleton */}
        <div className="flex items-center justify-center gap-2">
          <Skeleton className="w-5 h-5 rounded-full" />
          <Skeleton className="h-7 w-32" />
          <Skeleton className="w-5 h-5 rounded-full" />
        </div>

        {/* Image skeleton */}
        <div className="relative">
          <Skeleton className="w-full h-64 rounded-lg" />
        </div>

        {/* Name and description skeletons */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 mx-auto" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>
      </div>
    </div>
  );
}

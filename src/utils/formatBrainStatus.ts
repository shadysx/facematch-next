import { BrainStatus } from "@/enums/BrainStatus";

export const formatBrainStatus = (brainStatus?: BrainStatus) => {
  switch (brainStatus) {
    case BrainStatus.UNTRAINED:
      return "Untrained";
    case BrainStatus.TRAINING:
      return "Training";
    case BrainStatus.READY:
      return "Ready";

    default:
      return "Not found";
  }
};

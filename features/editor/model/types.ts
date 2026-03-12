// features/editor/model/types.ts
import { Doc } from "@/convex/_generated/dataModel";


export type PostWithImageUrl = Doc<"posts"> & {
  imageUrl?: string | null;
};

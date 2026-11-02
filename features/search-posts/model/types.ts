import { api } from '@/convex/_generated/api';
import { FunctionReturnType } from 'convex/server';

// Inferred from the return type of the postSearch Convex query
export type TSearchResultElement = FunctionReturnType<typeof api.posts.postSearch>[number];

import { api } from '@/convex/_generated/api';
import { FunctionReturnType } from 'convex/server';

// Автоматично витягує тип, який повертає функція postSearch на бекенді!
export type TSearchResultElement = FunctionReturnType<typeof api.posts.postSearch>[number];



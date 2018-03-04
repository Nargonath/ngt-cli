import { isAbsolute, join } from 'path';

export const formatUserPath = path => isAbsolute(path) ? path : join(process.cwd(), path);

export type ServiceName =
  | 'users'
  | 'campos'
  | 'camposEspecificos'

// Define the cache tags structure
export const CACHE_TAGS = {
  users: {
    all: 'users',
    single: (id: string) => `user-${id}`,
  },
  campos: {
    all: 'campos',
  },
  camposEspecificos: {
    all: 'camposEspecificos',
  },
} as const;

// Helper function to get cache tag
export const getCacheTag = <T extends ServiceName>(
  service: T,
  tag: keyof (typeof CACHE_TAGS)[T],
  ...params: string[]
): string => {
  const cacheTag = CACHE_TAGS[service][tag];
  if (typeof cacheTag === 'function') {
    return cacheTag(...params);
  }
  return cacheTag as string;
};

export type ServiceName =
  | 'users'
  | 'campos'
  | 'camposEspecificos'
  | 'cuarteles'
  | 'variedades'
  | 'portainjertos'
  | 'estimacionesDeCosecha'

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
  cuarteles: {
    all: 'cuarteles',
  },
  variedades: {
    all: 'variedades',
  },
  portainjertos: {
    all: 'portainjertos',
  },
  estimacionesDeCosecha: {
    all: 'estimacionesDeCosecha',
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

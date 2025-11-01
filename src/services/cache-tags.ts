export type ServiceName =
  | 'users'
  | 'empresas'
  | 'unidadesProductivas'
  | 'cuarteles'
  | 'variedades'
  | 'portainjertos'
  | 'estimacionesDeCosecha'
  | 'analisisDeCalidad'
  | 'defectos'
  | 'especies'
  | 'etapaInspeccion'
  | 'unidadInspeccion'

// Define the cache tags structure
export const CACHE_TAGS = {
  users: {
    all: 'users',
    single: (id: string) => `user-${id}`,
  },
  empresas: {
    all: 'empresas',
  },
  unidadesProductivas: {
    all: 'unidadesProductivas',
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
  analisisDeCalidad: {
    all: 'analisisDeCalidad',
  },
  defectos: {
    all: 'defectos',
  },
  especies: {
    all: 'especies',
  },
  etapaInspeccion: {
    all: 'etapaInspeccion',
  },
  unidadInspeccion: {
    all: 'unidadInspeccion',
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

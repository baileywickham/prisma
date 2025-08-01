import { defineMatrix } from '../_utils/defineMatrix'
import { Providers } from '../_utils/providers'

export default defineMatrix(() => [
  [
    {
      provider: Providers.POSTGRESQL,
      previewFeatures: '"queryCompiler", "driverAdapters"',
      driverAdapter: 'js_pg',
    },
  ],
])

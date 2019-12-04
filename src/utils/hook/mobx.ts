import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import { Store } from '@libs/mobx'

export const useStores = (): Store => useContext(MobXProviderContext).store

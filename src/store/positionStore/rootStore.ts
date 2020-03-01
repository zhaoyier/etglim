import { useContext } from 'react'

import { RootContext } from '@shared/App/Provider'

export default function positionRootStore() {
    return useContext(RootContext)
}

import React, { FC } from 'react'
import { useObserver } from 'mobx-react'

import { useStores } from '@utils/hook/mobx'

const Index: FC = () => {
	return useObserver(() => {
		const {
			Authentication: { count, plus },
		} = useStores()
		return (
			<div>
				<div>Count: {count}</div>
				<div>
					<button onClick={plus}>Plus 1</button>
				</div>
			</div>
		)
	})
}

export default Index

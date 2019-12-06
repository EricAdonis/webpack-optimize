import React, { FC } from 'react'
import { useObserver } from 'mobx-react'

import { useStores } from '@utils/hook/mobx'

const Index: FC = () => {
	return useObserver(() => {
		const { Authentication } = useStores()
		return (
			<div>
				<div>Count: {Authentication?.count}</div>
				<div>
					<button onClick={Authentication?.plus}>Plus 1</button>
				</div>
			</div>
		)
	})
}

export default Index

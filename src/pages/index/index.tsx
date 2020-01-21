import React, { FC } from 'react'

import { Button } from '@components/button'

const Index: FC = () => (
	<main>
		Index Page
		<div>
			<Button
				onClick={() => {
					console.log(2)
				}}
			>
				yyy
			</Button>
		</div>
	</main>
)

export default Index

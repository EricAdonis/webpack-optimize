import { observable, action } from 'mobx'

export class Authentication {
	@observable Authentication = 'xxx'
	@observable count = 0

	@action
	plus = () => {
		this.count++
	}
}

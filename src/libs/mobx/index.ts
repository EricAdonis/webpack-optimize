import { Authentication } from './authentication'

export class Store {
	public Authentication: Authentication
	constructor() {
		this.Authentication = new Authentication()
	}
}

import React, { createContext, useContext } from 'react'

export interface IEAStoreProviderProps<T = void> {
	initialState?: T
	children: React.ReactNode
}

export interface IEAStore<K, T = void> {
	Provider: React.ComponentType<IEAStoreProviderProps<T>>
	useStore: () => K
}

export const initEAStore = <K extends unknown, T = void>(
	useHook: (initStore?: T) => K
): IEAStore<K, T> => {
	const Context = createContext<K | null>(null)
	const Provider = (props: IEAStoreProviderProps<T>) => {
		const value = useHook(props.initialState)
		return <Context.Provider {...{ value }}>{props.children}</Context.Provider>
	}
	const useStore = (): K => {
		const value = useContext(Context)
		if (value === null) {
			throw new Error('Error !!!')
		}
		return value
	}
	return { Provider, useStore }
}

export const useEAStore = <K extends unknown, T = void>(
	EAStore: IEAStore<K, T>
): K => EAStore.useStore()

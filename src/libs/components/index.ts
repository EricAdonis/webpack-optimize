export const mapClassName = <T>(defaultClassName: string, ...some: T[]) => {
	if (
		some.length === 0 ||
		(some.length === 1 && typeof some[0] === 'undefined')
	)
		return defaultClassName
	return [
		defaultClassName,
		...some.flatMap(v => [`${defaultClassName}-${v}`]),
	].join(' ')
}

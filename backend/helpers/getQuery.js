exports.queryHelper = (query) => {
	const isQueryLength = query && typeof query === 'object' && Object.keys(query).length === 0
	const isNull = query === null
	const isUndefined = query === undefined

	if (!query || isQueryLength || isNull || isUndefined) return ''

	const result = new URLSearchParams(query).toString()
	return `?${result}`
}

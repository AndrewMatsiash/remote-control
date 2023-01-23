export const convertsFromStrToNum = <T extends string | string[]>(data: T): number | number[] => {
	if (Array.isArray(data)) {
		return data.map(string => parseInt(string))
	}
	return parseInt(data)
}
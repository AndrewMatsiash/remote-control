export const parseParams = (params: string) => {
	const command = params.split(" ")[0];
	const coordinate = params.split(" ")[1];

	return { command, coordinate };
};

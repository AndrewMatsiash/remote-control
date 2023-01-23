import { RawData } from "ws";

export const parseParams = (data: RawData) => {
	const paramsArr = data.toString().split(' ');
	const [command, ...params] = paramsArr
	return { command, params };
};

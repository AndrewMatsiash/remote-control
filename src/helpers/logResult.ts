import { mouse } from "@nut-tree/nut-js";

export const logResult = async (command: string, params: string[]) => {
	if (command === "mouse_position") {
		const { x, y } = await mouse.getPosition();
		console.log(`received: mouse_position ${x},${y}`);
	} else {
		console.log(`received: ${command} ${params.join()}`)
	}

}

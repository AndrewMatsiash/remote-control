import { down, left, mouse, right, up } from "@nut-tree/nut-js";
import { TMouseMoves } from "../types/types.js";
import { MOUSE_MOVES } from "../constants/constants.js";



export const mouseMoves = async (command: string, [coordinate]: string[]) => {

	const coordinateNumber = parseInt(coordinate)

	switch (command) {
		case "mouse_up":
			await mouse.move(up(coordinateNumber));
			break;
		case "mouse_down":
			await mouse.move(down(coordinateNumber));
			break;
		case "mouse_left":
			await mouse.move(left(coordinateNumber));
			break;
		case "mouse_right":
			await mouse.move(right(coordinateNumber));
			break;

		default:
			break;

	}
}
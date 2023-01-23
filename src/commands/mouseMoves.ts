import { down, left, mouse, right, up } from "@nut-tree/nut-js";
import { TMouseMoves } from "../types/types.js";
import { MOUSE_MOVES } from "../constants/constants.js";



export const mouseMoves = async (command: string, coordinate: string) => {
	switch (command) {
		case "mouse_up":
			await mouse.move(up(+coordinate));
			break;
		case "mouse_down":
			await mouse.move(down(+coordinate));
			break;
		case "mouse_left":
			await mouse.move(left(+coordinate));
			break;
		case "mouse_right":
			await mouse.move(right(+coordinate));
			break;

		default:
			break;

	}
}
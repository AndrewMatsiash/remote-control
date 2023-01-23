import { httpServer } from "./src/http_server/index.js";
import { Button, Point, Region, centerOf, down, left, mouse, right, straightTo, up } from "@nut-tree/nut-js";
import { WebSocketServer } from "ws";
import { MOUSE_MOVES } from "./src/constants/constants.js";
import { mouseMoves } from "./src/commands/mouseMoves.js";
import { parseParams } from "./src/utils/parseParams.js";
import { calculateMovementTimesteps } from "@nut-tree/nut-js/dist/lib/mouse-movement.function.js";
import { drawRectangle } from "./src/commands/drawRectagle.js";
import { convertsFromStrToNum } from "./src/utils/convertsFromStrToNum.js";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);


const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
	ws.on("message", async (data) => {
		const { command, params } = parseParams(data);
		console.log(params);


		if (MOUSE_MOVES.includes(command)) {
			mouseMoves(command, params);
			ws.send(command);
		}

		if (command === "mouse_position") {
			const { x, y } = await mouse.getPosition();
			ws.send(`mouse_position ${x},${y}`);
		}

		if (command === "draw_rectangle") {
			const paramsRectangle = convertsFromStrToNum(params)
			Array.isArray(paramsRectangle) && await drawRectangle(paramsRectangle)
		}

		ws.send(command);

	});


});

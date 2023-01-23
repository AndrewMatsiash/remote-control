import { httpServer } from "./src/http_server/index.js";
import { Button, Point, Region, centerOf, down, left, mouse, right, straightTo, up } from "@nut-tree/nut-js";
import { WebSocketServer, createWebSocketStream } from "ws";
import { MOUSE_MOVES } from "./src/constants/constants.js";
import { mouseMoves } from "./src/commands/mouseMoves.js";
import { parseParams } from "./src/utils/parseParams.js";
import { drawRectangle } from "./src/commands/drawRectagle.js";
import { convertsFromStrToNum } from "./src/utils/convertsFromStrToNum.js";
import { drawSquare } from "./src/commands/drawSquare.js";
import { drawCircle } from "./src/commands/drawCircle.js";
import { printScreen } from "./src/commands/printScreen.js";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);


const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
	ws.on("message", async (data) => {
		const stream = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });
		const { command, params } = parseParams(data);
		ws.send(command);

		if (command === 'prnt_scrn') {
			await printScreen(ws)
			return
		}

		if (MOUSE_MOVES.includes(command)) {
			mouseMoves(command, params);
			return
		}

		if (command === "mouse_position") {
			const { x, y } = await mouse.getPosition();
			ws.send(`mouse_position ${x},${y}`);
			return
		}

		if (command === "draw_rectangle") {
			const paramsRectangle = convertsFromStrToNum(params)
			Array.isArray(paramsRectangle) && await drawRectangle(paramsRectangle)
		}

		if (command === "draw_square") {
			const paramsSquare = convertsFromStrToNum(params)
			Array.isArray(paramsSquare) && await drawSquare(paramsSquare)
			return
		}

		if (command === "draw_circle") {
			const paramsCircle = convertsFromStrToNum(params)
			Array.isArray(paramsCircle) && await drawCircle(paramsCircle)
			return
		}

	});


});

import { httpServer } from "./src/http_server/index.js";
import { mouse } from "@nut-tree/nut-js";
import { WebSocketServer, createWebSocketStream } from "ws";
import { MOUSE_MOVES } from "./src/constants/constants.js";
import { mouseMoves } from "./src/commands/mouseMoves.js";
import { parseParams } from "./src/helpers/parseParams.js";
import { drawRectangle } from "./src/commands/drawRectagle.js";
import { convertsFromStrToNum } from "./src/helpers/convertsFromStrToNum.js";
import { drawSquare } from "./src/commands/drawSquare.js";
import { drawCircle } from "./src/commands/drawCircle.js";
import { printScreen } from "./src/commands/printScreen.js";

const HTTP_PORT = 3000;
const WS_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);


const wss = new WebSocketServer({ port: WS_PORT });

wss.on("connection", (ws) => {
	ws.on("message", async (data) => {
		const stream = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });
		const { command, params = [] } = parseParams(data);

		if (command === 'prnt_scrn') {
			ws.send(command);
			await printScreen(ws)
			return
		}

		if (MOUSE_MOVES.includes(command)) {
			ws.send(command);
			mouseMoves(command, params);
			return
		}

		if (command === "mouse_position") {
			ws.send(command);
			const { x, y } = await mouse.getPosition();
			ws.send(`mouse_position ${x},${y}`);
			return
		}

		if (command === "draw_rectangle") {
			ws.send(command);
			const paramsRectangle = convertsFromStrToNum(params)
			Array.isArray(paramsRectangle) && await drawRectangle(paramsRectangle)
		}

		if (command === "draw_square") {
			ws.send(command);
			const paramsSquare = convertsFromStrToNum(params)
			Array.isArray(paramsSquare) && await drawSquare(paramsSquare)
			return
		}

		if (command === "draw_circle") {
			ws.send(command);
			const paramsCircle = convertsFromStrToNum(params)
			Array.isArray(paramsCircle) && await drawCircle(paramsCircle)
			return
		}

	});


});

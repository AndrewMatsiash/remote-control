import { httpServer } from "./src/http_server/index.js";
import { mouse } from "@nut-tree/nut-js";
import { WebSocketServer } from "ws";
import { MOUSE_MOVES } from "./src/constants/constants.js";
import { mouseMoves } from "./src/commands/mouseMoves.js";
import { parseParams } from "./src/utils/parseParams.js";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);


const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
	ws.on("message", async (data) => {
		const params = data.toString();
		const { command, coordinate } = parseParams(params);


		if (MOUSE_MOVES.includes(command)) {
			mouseMoves(command, coordinate);
			ws.send(command);
		}

		if (command === "mouse_position") {
			const { x, y } = await mouse.getPosition();
			ws.send(`mouse_position ${x},${y}`);
		}



	});


});

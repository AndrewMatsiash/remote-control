import { mouse, Region, screen } from "@nut-tree/nut-js";
import Jimp from "jimp";
import { WebSocket } from "ws";

const SCREENSHOT_SIZE = 200;

const getCurrentSize = async () => {
	const { x: currentX, y: currentY } = await mouse.getPosition();
	const halfOfScreen = SCREENSHOT_SIZE / 2;
	const width = await screen.width();
	const height = await screen.height();
	let top = Math.max(0, currentY - halfOfScreen);
	let left = Math.max(0, currentX - halfOfScreen);

	if (left + SCREENSHOT_SIZE > width) {
		left = width - SCREENSHOT_SIZE;
	}

	if (top + SCREENSHOT_SIZE > height) {
		top = height - SCREENSHOT_SIZE;
	}

	return { left, top };
};

export const printScreen = async (ws: WebSocket): Promise<string> => {
	const { left, top } = await getCurrentSize();
	const region = new Region(left, top, SCREENSHOT_SIZE, SCREENSHOT_SIZE);
	await screen.highlight(region);
	const imageBgr = await screen.grabRegion(region);
	const imageRgb = await imageBgr.toRGB();
	const jimpImage = new Jimp({
		data: imageRgb.data,
		width: imageRgb.width,
		height: imageRgb.height,
	});

	const screenshotBuffer = await jimpImage.getBufferAsync(Jimp.MIME_JPEG);
	const screenshotTransformed = screenshotBuffer.toString("base64");

	const out = `prnt_scrn ${screenshotTransformed}`;
	ws.send(out);
	return out;
};
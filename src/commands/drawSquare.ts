import { mouse, Button, left, right, down, up } from '@nut-tree/nut-js'

export const drawSquare = async ([width]: number[]) => {
	mouse.config.mouseSpeed = 200
	await mouse.pressButton(Button.LEFT)
	await mouse.move(right(width))
	await mouse.move(down(width))
	await mouse.move(left(width))
	await mouse.move(up(width))
	await mouse.releaseButton(Button.LEFT)
}
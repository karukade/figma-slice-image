import { Message } from "./types/message"
import { SliceImageResult } from "./utils/slice/sliceImages"

type CreateFrameParams = {
  x?: number
  size: {
    width: number
    height: number
  }
  name: string
}

figma.showUI(__html__, {
  width: 800,
  height: 500,
})

const putImage = (
  slice: SliceImageResult["slices"][number],
  frame: FrameNode
) => {
  const img = figma.createImage(slice.data)
  const rect = figma.createRectangle()
  const imagePaint: ImagePaint = {
    type: "IMAGE",
    scaleMode: "FIT",
    imageHash: img.hash,
  }
  rect.resize(slice.width, slice.height)
  rect.x = slice.x
  rect.y = slice.y
  rect.fills = [imagePaint]
  frame.appendChild(rect)
  return rect
}

const createFrame = ({ size, name, x }: CreateFrameParams) => {
  const frame = figma.createFrame()
  frame.name = name
  if (x) frame.x = x
  frame.resizeWithoutConstraints(size.width, size.height)
  return frame
}

figma.ui.onmessage = ({ type, data }: Message) => {
  if (type === "put-image") {
    const space = 200
    data.reduce<null | number>((prev, curr) => {
      const { name, size, slices } = curr
      const frame = createFrame({
        name,
        size,
        x: prev ? prev : undefined,
      })
      slices.forEach((slice) => putImage(slice, frame))
      return (prev ? prev + curr.size.width : curr.size.width) + space
    }, null)
  }

  figma.closePlugin()
}

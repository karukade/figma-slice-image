import { Message } from "./types/message"
import { SplitImageResult } from "./utils/splitImage/splitImages"

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
  imgInfo: SplitImageResult["splited"][number],
  frame: FrameNode
) => {
  const img = figma.createImage(imgInfo.data)
  const rect = figma.createRectangle()
  const imagePaint: ImagePaint = {
    type: "IMAGE",
    scaleMode: "FIT",
    imageHash: img.hash,
  }
  rect.resize(imgInfo.width, imgInfo.height)
  rect.x = imgInfo.x
  rect.y = imgInfo.y
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
      const { name, size, splited } = curr
      const frame = createFrame({
        name,
        size,
        x: prev ? prev : undefined,
      })
      splited.forEach((img) => putImage(img, frame))
      return (prev ? prev + curr.size.width : curr.size.width) + space
    }, null)
  }

  figma.closePlugin()
}

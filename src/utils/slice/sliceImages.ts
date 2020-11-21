// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import slices from "slices"
import { createClopper, CropSize, ClopReturnType } from "./clop"
import { ImgInfo } from "../fileReader"

export type SliceImageResult = {
  slices: ClopReturnType[]
  name: string
  size: {
    width: number
    height: number
  }
}

const createImage = async (src: string) => {
  const img = new Image()
  return new Promise<HTMLImageElement>((resolve) => {
    img.onload = () => resolve(img)
    img.src = src
  })
}

const getLineXArray = (imageHeight: number, splitSize: number) => {
  if (imageHeight < splitSize) return [imageHeight]
  const rest = imageHeight % splitSize
  const splitIn = (imageHeight - rest) / splitSize
  const xLineArr = [...new Array(splitIn).keys()].map(
    (_, i) => splitSize * (i + 1)
  )
  return [...xLineArr, splitSize * splitIn + rest]
}

const createSplitArray = (
  size: { width: number; height: number },
  splitSize: number
) => {
  const xArray = getLineXArray(size.height, splitSize)
  return {
    xArray,
    yArray: [size.width], // x軸の分割は一旦なし
  }
}

export const sliceImages = async (
  images: ImgInfo[],
  splitSize: number
): Promise<SliceImageResult[]> => {
  const sliced = []

  for (const imgInfo of images) {
    const { name, data, mimeType } = imgInfo
    const img = await createImage(data as string)
    const { width, height } = img

    const { xArray, yArray } = createSplitArray({ width, height }, splitSize)

    const blocks = slices(width, height, xArray, yArray) as CropSize[]
    const cropper = createClopper(img, mimeType)

    const result = await Promise.all(
      blocks.map((block) => {
        return cropper(block)
      })
    )

    sliced.push({
      name,
      size: { width, height },
      slices: result,
    })
  }

  return sliced
}

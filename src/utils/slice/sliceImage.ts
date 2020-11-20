/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import imageToSlices from "image-to-slices"
import { base64ToUint8Array } from "../utils"
import { ImgInfo } from "../fileReader"

export type ImageToSlicesResult = {
  x: number
  y: number
  width: number
  height: number
  dataURI: string
}

export type SlicedImage = Omit<ImageToSlicesResult, "dataURI"> & {
  data: Uint8Array
}

export type SliceImageResult = {
  slices: SlicedImage[]
  name: string
  size: {
    width: number
    height: number
  }
}

type SliceImageParam = {
  source: string
  splitSize: number
  size: {
    width: number
    height: number
  }
}

// 画像サイズ取得util
const getImageSize = (
  src: string
): Promise<{ width: number; height: number }> => {
  const img = new Image()
  return new Promise((resolve, reject) => {
    img.onload = () => {
      resolve({ width: img.width, height: img.height })
    }
    img.onerror = () => {
      reject()
    }
    img.src = src
  })
}

// imageToSlicesのXArrayを生成する
const getLineXArray = (imageHeight: number, splitSize: number) => {
  if (imageHeight < splitSize) return [imageHeight]
  const rest = imageHeight % splitSize
  const splitIn = (imageHeight - rest) / splitSize
  const xLineArr = [...new Array(splitIn).keys()].map(
    (_, i) => splitSize * (i + 1)
  )
  return [...xLineArr, splitSize * splitIn + rest]
}

// image-to-sliceのbase64の戻り値をfigma向けにUnit8Arrayに変換
const convertImageToSliceResult = (result: ImageToSlicesResult) => {
  const { dataURI, ...rest } = result
  return {
    ...rest,
    data: base64ToUint8Array(dataURI.replace(/^data:[^,]+,/, "")),
  }
}

// 画像のスライス
const sliceImage = async ({ source, splitSize }: SliceImageParam) => {
  const { width, height } = await getImageSize(source)
  const lineXArray = getLineXArray(height, splitSize)
  const lineYArray = [width]
  return new Promise<SlicedImage[]>((resolve) => {
    imageToSlices(
      source,
      lineXArray,
      lineYArray,
      {
        saveToDataUrl: true,
      },
      (dataUrlList: ImageToSlicesResult[]) => {
        resolve(dataUrlList.map(convertImageToSliceResult))
      }
    )
  })
}

// 画像リストからスライス
export const sliceImages = (
  sources: ImgInfo[],
  splitSize = 100
): Promise<SliceImageResult[]> => {
  const filtered = sources.filter((source) => source.data)
  return Promise.all(
    filtered.map(async ({ data, name }) => {
      const size = await getImageSize(data as string)
      const sliceResult = await sliceImage({
        source: data as string,
        splitSize: splitSize,
        size,
      })
      return {
        slices: sliceResult,
        name,
        size,
      }
    })
  )
}

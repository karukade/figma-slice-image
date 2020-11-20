/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import imageToSlices from "image-to-slices"
import { ImgInfo, FileReaderResult } from "../fileReader"

export type ImageToSlicesResult = {
  dataURI: string
}
export type SliceImageResult = ImageToSlicesResult & { name: string }

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

const isString = (string: unknown): string is string =>
  typeof string === "string"

type SliceImageParam = {
  source: FileReaderResult
  splitSize: number
  name: string
}

// ダウンロードするファイル名の生成
const createDownloadName = (sourceName: string, index: number) => {
  const [name, ext] = sourceName.split(".")
  return `${name}-${index}.${ext}`
}

// 画像のスライス
const sliceImage = async ({ source, splitSize, name }: SliceImageParam) => {
  if (!isString(source)) return
  const { width, height } = await getImageSize(source)
  const lineXArray = getLineXArray(height, splitSize)
  const lineYArray = [width]
  return new Promise<SliceImageResult[]>((resolve) => {
    imageToSlices(
      source,
      lineXArray,
      lineYArray,
      {
        saveToDataUrl: true,
      },
      (dataUrlList: ImageToSlicesResult[]) => {
        resolve(
          dataUrlList.map((slicedInfo, i) => ({
            ...slicedInfo,
            name: createDownloadName(name, i),
          }))
        )
      }
    )
  })
}

// 画像リストからスライス
export const sliceImages = (
  sources: ImgInfo[],
  splitSize = 100
): Promise<(SliceImageResult[] | undefined)[]> => {
  return Promise.all(
    sources.map((source, i) =>
      sliceImage({
        source: source.data,
        splitSize: splitSize,
        name: source.name,
      })
    )
  )
}

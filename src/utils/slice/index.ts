import { downloadsImages } from "./download"
import { ImgInfo } from "../fileReader"
import { sliceImages } from "./sliceImage"

// 画像をスライスしてダウンロード
export const sliceAndDownload = async (
  sources: ImgInfo[],
  splitSize = 100
): Promise<void> => {
  const slicedImagesList = await sliceImages(sources, splitSize)
  await downloadsImages(slicedImagesList)
}

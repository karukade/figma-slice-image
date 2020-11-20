import { ImgInfo } from "../fileReader"
import { sliceImages, SliceImageResult } from "./sliceImage"

// 画像をスライスしてダウンロード
export const slice = async (
  sources: ImgInfo[],
  splitSize = 100
): Promise<SliceImageResult[]> => {
  return sliceImages(sources, splitSize)
}

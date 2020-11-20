import { SliceImageResult } from "./sliceImage"

// 画像のダウンロード遅延用
const sleep = async (ms = 500) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })

// 画像のダウンロード
const downloadImageToLocal = ({ dataURI, name }: SliceImageResult) => {
  const dlLink = document.createElement("a")
  dlLink.href = dataURI
  dlLink.download = name
  document.body.insertAdjacentElement("beforeEnd" as any, dlLink)
  dlLink.click()
  dlLink.remove()
  // ダウンロードを連続で実行できないので、sleepさせる
  return sleep()
}

// スライスした画像リストをダウンロード
export const downloadsImages = async (
  slicedImagesList: (SliceImageResult[] | undefined)[]
): Promise<void> => {
  for (const slicedImages of slicedImagesList) {
    if (!slicedImages) continue
    for (const slicedImage of slicedImages) {
      await downloadImageToLocal(slicedImage)
    }
  }
}

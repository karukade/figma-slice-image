import { useState, useCallback } from "preact/hooks"
import { splitImages, SplitImageResult } from "../utils/splitImage/splitImages"
import { ImgInfo } from "../utils/fileReader"

export type UseSplitImageReturn = {
  splitSize: number
  splitting: boolean
  splited: SplitImageResult[] | null
  setSplitSize: (splitSize: string) => void
  splitImg: () => void
}

export const useSplitImage = (
  initialSplitSize: number,
  imgList: ImgInfo[] | null
): UseSplitImageReturn => {
  const [splitSize, _setSplitSize] = useState(initialSplitSize)
  const [splitting, setSplitting] = useState(false)
  const [splited, setSplited] = useState<SplitImageResult[] | null>(null)

  const setSplitSize = useCallback((splitSize: string) => {
    if (!/^[1-9]\d*$/.test(splitSize)) return
    _setSplitSize(parseInt(splitSize))
  }, [])

  const splitImg = useCallback(async () => {
    if (!imgList) return
    setSplitting(true)
    const splited = await splitImages(imgList, splitSize)
    setSplited(splited)
    setSplitting(false)
  }, [imgList, splitSize])

  return {
    splitSize,
    splitting,
    splited,
    setSplitSize,
    splitImg,
  }
}

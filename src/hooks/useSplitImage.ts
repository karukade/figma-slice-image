import { useState, useCallback } from "preact/hooks"
import { sliceImages, SliceImageResult } from "../utils/slice/sliceImages"
import { ImgInfo } from "../utils/fileReader"

export type UseSplitImageReturn = {
  sliceSize: number
  slicing: boolean
  sliced: SliceImageResult[] | null
  setSliceSize: (splitSize: string) => void
  sliceImg: () => void
}

export const useSplitImage = (
  initialSliceSize: number,
  imgList: ImgInfo[] | null
): UseSplitImageReturn => {
  const [sliceSize, _setSliceSize] = useState(initialSliceSize)
  const [slicing, setSlicing] = useState(false)
  const [sliced, setSliced] = useState<SliceImageResult[] | null>(null)

  const setSliceSize = useCallback((splitSize: string) => {
    if (!/^[1-9]\d*$/.test(splitSize)) return
    _setSliceSize(parseInt(splitSize))
  }, [])

  const sliceImg = useCallback(async () => {
    if (!imgList) return
    setSlicing(true)
    const sliced = await sliceImages(imgList, sliceSize)
    setSliced(sliced)
    setSlicing(false)
  }, [imgList, sliceSize])

  return {
    sliceSize,
    slicing,
    sliced,
    setSliceSize,
    sliceImg,
  }
}

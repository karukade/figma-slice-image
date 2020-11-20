import { useState, useEffect, useCallback } from "preact/hooks"
import { slice } from "../utils/slice/"
import { fileListToDataUrlList, ImgInfo } from "../utils/fileReader"
import { sendImages } from "../utils/send"

export type UseSplitImageReturn = {
  splitSize: number
  imgInfo: ImgInfo[] | null
  slicing: boolean
  setFileList: (files: FileList) => void
  setSliceSize: (splitSize: string) => void
  sliceImgAndSend: () => void
}

export const useSplitImage = (
  initialSplitSize: number
): UseSplitImageReturn => {
  const [splitSize, _setSliceSize] = useState(initialSplitSize)
  const [fileList, _setFileList] = useState<FileList | null>(null)
  const [imgInfo, setImgInfo] = useState<ImgInfo[] | null>(null)
  const [slicing, setSlicing] = useState(false)

  const setSliceSize = useCallback((splitSize: string) => {
    if (!/^[1-9]\d*$/.test(splitSize)) return
    _setSliceSize(parseInt(splitSize))
  }, [])

  const setFileList = useCallback((files: FileList) => {
    _setFileList(files)
  }, [])

  const sliceImgAndSend = useCallback(async () => {
    if (!imgInfo) return
    setSlicing(true)
    const sliced = await slice(imgInfo, splitSize)
    sendImages(sliced)
    setSlicing(false)
  }, [imgInfo, splitSize])

  useEffect(() => {
    if (!fileList) return
    let cancel = false
    ;(async () => {
      const imgInfo = await fileListToDataUrlList(fileList)
      if (!cancel)
        setImgInfo((current) => {
          if (current) return [...current, ...imgInfo]
          return imgInfo
        })
    })()
    return () => (cancel = true)
  }, [fileList])

  return {
    splitSize,
    imgInfo,
    slicing,
    setFileList,
    setSliceSize,
    sliceImgAndSend,
  }
}

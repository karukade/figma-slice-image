import { useState, useEffect, useCallback } from "preact/hooks"
import { sliceAndDownload } from "../utils/slice/"
import { fileListToDataUrlList, ImgInfo } from "../utils/fileReader"

export type UseSplitImageReturn = {
  splitSize: number
  imgInfo: ImgInfo[] | null
  setFileList: (files: FileList) => void
  setSliceSize: (splitSize: string) => void
  sliceImgAndDownload: () => void
}

export const useSplitImage = (
  initialSplitSize: number
): UseSplitImageReturn => {
  const [splitSize, _setSliceSize] = useState(initialSplitSize)
  const [fileList, _setFileList] = useState<FileList | null>(null)
  const [imgInfo, setImgInfo] = useState<ImgInfo[] | null>(null)

  const setSliceSize = useCallback((splitSize: string) => {
    if (!/^[1-9]\d*$/.test(splitSize)) return
    _setSliceSize(parseInt(splitSize))
  }, [])

  const setFileList = useCallback((files: FileList) => {
    _setFileList(files)
  }, [])

  const sliceImgAndDownload = useCallback(() => {
    imgInfo && sliceAndDownload(imgInfo, splitSize)
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
    setFileList,
    setSliceSize,
    sliceImgAndDownload,
  }
}

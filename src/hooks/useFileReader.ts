import { useState, useEffect, useCallback } from "preact/hooks"
import { fileListToDataUrlList, ImgInfo } from "../utils/fileReader"

export type UseFileReaderReturn = {
  imgInfo: ImgInfo[] | null
  setFileList: (files: FileList) => void
  removeImg: (name: string) => void
}

export const useFileReader = (): UseFileReaderReturn => {
  const [fileList, setFileList] = useState<FileList | null>(null)
  const [imgInfo, setImgInfo] = useState<ImgInfo[] | null>(null)

  const removeImg = useCallback((name: string) => {
    setImgInfo((imgInfo) => {
      if (!imgInfo) return null
      const filtered = imgInfo.filter((info) => info.name !== name)
      return filtered ? filtered : null
    })
  }, [])

  useEffect(() => {
    if (!fileList) return
    ;(async () => {
      const imgInfo = await fileListToDataUrlList(fileList)
      setImgInfo((current) => {
        if (current) return [...current, ...imgInfo]
        return imgInfo
      })
    })()
  }, [fileList])

  return {
    imgInfo,
    setFileList,
    removeImg,
  }
}

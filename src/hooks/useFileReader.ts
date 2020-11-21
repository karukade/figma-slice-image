import { useState, useEffect } from "preact/hooks"
import { fileListToDataUrlList, ImgInfo } from "../utils/fileReader"

export type UseFileReaderReturn = {
  imgInfo: ImgInfo[] | null
  setFileList: (files: FileList) => void
}

export const useFileReader = (): UseFileReaderReturn => {
  const [fileList, setFileList] = useState<FileList | null>(null)
  const [imgInfo, setImgInfo] = useState<ImgInfo[] | null>(null)

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
  }
}

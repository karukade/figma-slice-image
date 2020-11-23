import { nanoid } from "nanoid"

export type FileReaderResult = string | ArrayBuffer | null | undefined
export type ImgInfo = {
  data: FileReaderResult
  id: string
  name: string
  mimeType: string
}

export const fileListToDataUrlList = (files: FileList): Promise<ImgInfo[]> => {
  return Promise.all<ImgInfo>(
    [...files].map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = function (e) {
          resolve({
            id: nanoid(),
            data: e.target?.result,
            name: file.name,
            mimeType: file.type,
          })
        }
        reader.readAsDataURL(file)
      })
    })
  )
}

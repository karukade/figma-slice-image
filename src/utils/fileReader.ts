export type FileReaderResult = string | ArrayBuffer | null | undefined
export type ImgInfo = {
  data: FileReaderResult
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

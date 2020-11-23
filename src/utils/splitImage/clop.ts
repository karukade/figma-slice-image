import { resolve } from "path"

export type CropSize = {
  width: number
  height: number
  x: number
  y: number
}

const drawImage = (img: HTMLImageElement, cropSize: CropSize) => {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  if (!ctx) throw new Error("Can't get canvas context")
  canvas.width = cropSize.width
  canvas.height = cropSize.height
  ctx.drawImage(
    img,
    cropSize.x,
    cropSize.y,
    cropSize.width,
    cropSize.height,
    0,
    0,
    cropSize.width,
    cropSize.height
  )
  return canvas
}

const blobToUnit8Array = (blob: Blob) => {
  return new Promise<Uint8Array>((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(new Uint8Array(reader.result as ArrayBuffer))
    reader.readAsArrayBuffer(blob)
  })
}

const getCanvasBlob = (canvas: HTMLCanvasElement, mimeType: string) => {
  return new Promise<Blob>((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) throw new Error("Can't get blob from canvas.")
        resolve(blob)
      },
      mimeType,
      1
    )
  })
}

type ClopParams = {
  img: HTMLImageElement
  cropSize: CropSize
  mimeType: string
}

export type ClopReturnType = CropSize & { data: Uint8Array }

const clop = async ({ img, cropSize, mimeType }: ClopParams) => {
  const canvas = drawImage(img, cropSize)
  const blob = await getCanvasBlob(canvas, mimeType)
  const typedArray = await blobToUnit8Array(blob)
  return {
    ...cropSize,
    data: typedArray,
  }
}

export const createClopper = (
  img: HTMLImageElement,
  mimeType: string
): ((cropSize: CropSize) => Promise<ClopReturnType>) => {
  return (cropSize: CropSize) =>
    clop({
      img,
      mimeType,
      cropSize,
    })
}

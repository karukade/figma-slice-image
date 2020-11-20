import { SliceImageResult } from "./slice/sliceImage"
import { SendImageMessage } from "../types/message"

export const sendImages = (images: SliceImageResult[]): void => {
  const pluginMessage: SendImageMessage = {
    type: "put-image",
    data: images,
  }
  parent.postMessage({ pluginMessage }, "*")
}

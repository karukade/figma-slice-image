import { SplitImageResult } from "./splitImage/splitImages"
import { SendImageMessage } from "../types/message"

export const sendImages = (images: SplitImageResult[]): void => {
  const pluginMessage: SendImageMessage = {
    type: "put-image",
    data: images,
  }
  parent.postMessage({ pluginMessage }, "*")
}

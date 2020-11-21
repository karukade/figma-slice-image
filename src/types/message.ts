import { SliceImageResult } from "../utils/slice/sliceImages"
export type MessageBase<Message extends string, Data> = {
  type: Message
  data: Data
}
export type SendImageMessage = MessageBase<"put-image", SliceImageResult[]>
export type Message = SendImageMessage

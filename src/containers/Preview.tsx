import { h } from "preact"
import PreviewItem from "../components/PreviewItem"
import { UseFileReaderReturn } from "../hooks/useFileReader"

type Props = {
  imgInfo: NonNullable<UseFileReaderReturn["imgInfo"]>
  removeImg: UseFileReaderReturn["removeImg"]
}

export default function Preview({ imgInfo, removeImg }: Props): h.JSX.Element {
  return (
    <ul className="flex flex-wrap">
      {imgInfo.map((source) => (
        <li className="w-1/3 p-1" key={source.name}>
          <PreviewItem src={source} removeImg={removeImg} />
        </li>
      ))}
    </ul>
  )
}

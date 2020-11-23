import { h } from "preact"
import { Ref } from "preact/hooks"
import PreviewItem from "../components/PreviewItem"
import { UseFileReaderReturn } from "../hooks/useFileReader"

type Props = {
  mousePos: Ref<{ x: number; y: number }>
  imgInfo: NonNullable<UseFileReaderReturn["imgInfo"]>
  removeImg: UseFileReaderReturn["removeImg"]
}

export default function Preview({
  imgInfo,
  removeImg,
  mousePos,
}: Props): h.JSX.Element {
  return (
    <ul className="flex flex-wrap">
      {imgInfo.map((source, index) => (
        <li className="w-1/3 p-1" key={source.id}>
          <PreviewItem
            mousePos={mousePos}
            index={index}
            src={source}
            removeImg={removeImg}
          />
        </li>
      ))}
    </ul>
  )
}

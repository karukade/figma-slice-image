import { h } from "preact"
import PreviewItem from "../components/PreviewItem"
import { ImgInfo } from "../utils/fileReader"

type Props = {
  sources: ImgInfo[]
}

export default function Preview({ sources }: Props): h.JSX.Element {
  return (
    <ul className="flex flex-wrap">
      {sources.map((source) => (
        <li className="w-1/4" key={source.name}>
          <PreviewItem src={source.data as string} />
        </li>
      ))}
    </ul>
  )
}

import { h } from "preact"
import { useRef, Ref } from "preact/hooks"
import { memo } from "preact/compat"

import {
  useRemoveTransition,
  useAddTransition,
} from "../hooks/usePreviewItemTransition"
import { ImgInfo } from "../utils/fileReader"
import { UseFileReaderReturn } from "../hooks/useFileReader"

type Props = {
  mousePos: Ref<{ x: number; y: number }>
  index: number
  src: ImgInfo
  removeImg: UseFileReaderReturn["removeImg"]
}

function PreviewItem({ index, src, removeImg, mousePos }: Props) {
  const remove = () => removeImg(src.name)
  const itemRef = useRef<HTMLDivElement | null>(null)
  useRemoveTransition(itemRef, index)
  useAddTransition(itemRef, mousePos)

  return (
    <div ref={itemRef} className="bg-white rounded-lg text-center p-1">
      <div className="h-18 overflow-hidden relative">
        <CloseButton onClick={remove} />
        <img src={src.data as string} alt="" />
      </div>
      <span className="block text-xs text-gray-600 mt-1">{src.name}</span>
    </div>
  )
}

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute flex justify-center items-center rounded-full right-0 top-0 w-3 h-3 text-xs bg-blue-900 text-white opacity-75"
    >
      <svg
        className="w-1 text-white fill-current"
        viewBox="0 0 9 9"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M3.79297 4.50056L0.964355 1.67195L1.67146 0.964844L4.50008 3.79346L7.32861 0.964919L8.03572 1.67203L5.20718 4.50056L8.03542 7.3288L7.32832 8.03591L4.50008 5.20767L1.67176 8.03599L0.964652 7.32888L3.79297 4.50056Z"
        />
      </svg>
    </button>
  )
}

export default memo(PreviewItem)

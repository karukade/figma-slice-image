import { h } from "preact"
import { memo } from "preact/compat"

import { useRemoveTransition } from "../hooks/useRemoveTransition"
import { ImgInfo } from "../utils/fileReader"
import { UseFileReaderReturn } from "../hooks/useFileReader"

function PreviewItem({
  index,
  src,
  removeImg,
}: {
  index: number
  src: ImgInfo
  removeImg: UseFileReaderReturn["removeImg"]
}) {
  const onClick = () => removeImg(src.name)
  const targetRef = useRemoveTransition(index)

  return (
    <div ref={targetRef} className="bg-white rounded-lg text-center p-1">
      <div className="h-18 overflow-hidden relative">
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
        <img src={src.data as string} alt="" />
      </div>
      <span className="block text-xs text-gray-600 mt-1">{src.name}</span>
    </div>
  )
}

export default memo(PreviewItem)

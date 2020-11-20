import { h, Fragment } from "preact"
import { UseSplitImageReturn } from "../hooks/useSplitImage"

import DropArea from "../components/DropArea"
import Input from "../components/Input"

type Props = Omit<UseSplitImageReturn, "imgInfo">

export default function Inputs({
  setFileList,
  setSliceSize,
  sliceImgAndDownload,
  splitSize,
}: Props): h.JSX.Element {
  return (
    <Fragment>
      <DropArea onDrop={setFileList} />
      <div className="mt-4">
        <Input
          label="分割するサイズ"
          onChange={setSliceSize}
          value={splitSize}
        />
      </div>
      <div className="mt-4 flex justify-center items-center">
        <button
          className="w-20 md:w-40 text-center bg-blue-700 font-bold text-white rounded-full shadow-xl p-1 hover:bg-blue-400 transition-colors duration-200"
          onClick={sliceImgAndDownload}
        >
          Slice
        </button>
      </div>
    </Fragment>
  )
}

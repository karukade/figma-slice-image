import { h, Fragment } from "preact"
import { UseSplitImageReturn } from "../hooks/useSplitImage"
import Button from "../components/Button"

import DropArea from "../components/DropArea"
import Input from "../components/Input"

type Props = Omit<UseSplitImageReturn, "imgInfo">

export default function Inputs({
  setFileList,
  setSliceSize,
  sliceImgAndSend,
  slicing,
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
        <Button onClick={sliceImgAndSend} disabled={slicing}>
          {slicing ? "Slicing" : "Slice"}
        </Button>
      </div>
    </Fragment>
  )
}

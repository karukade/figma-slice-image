import { h, Fragment } from "preact"
import { UseSplitImageReturn } from "../hooks/useSplitImage"
import { UseFileReaderReturn } from "../hooks/useFileReader"
import Button from "../components/Button"

import DropArea from "../components/DropArea"
import Input from "../components/Input"

type Props = Omit<UseSplitImageReturn, "sliced"> &
  Pick<UseFileReaderReturn, "setFileList">

export default function Inputs({
  setFileList,
  setSliceSize,
  sliceImg,
  slicing,
  sliceSize,
}: Props): h.JSX.Element {
  return (
    <Fragment>
      <DropArea onDrop={setFileList} />
      <div className="mt-4">
        <Input
          label="分割するサイズ"
          onChange={setSliceSize}
          value={sliceSize}
        />
      </div>
      <div className="mt-4 flex justify-center items-center">
        <Button onClick={sliceImg} disabled={slicing}>
          {slicing ? "Slicing" : "Slice"}
        </Button>
      </div>
    </Fragment>
  )
}

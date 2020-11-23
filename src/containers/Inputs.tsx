import { h, Fragment } from "preact"
import { UseSplitImageReturn } from "../hooks/useSplitImage"
import Button from "../components/Button"
import Spinner from "../components/Spinner"

import DropArea from "../components/DropArea"
import Input from "../components/Input"

type Props = Omit<UseSplitImageReturn, "splited"> & {
  onDrop: (fileList: DragEvent) => void
}

export default function Inputs({
  onDrop,
  setSplitSize,
  splitImg,
  splitting,
  splitSize,
}: Props): h.JSX.Element {
  return (
    <Fragment>
      <DropArea onDrop={onDrop} />
      <div className="mt-3">
        <Input label="split height" onChange={setSplitSize} value={splitSize} />
        <span className="text-xs">Currently, only height is supported.</span>
      </div>
      <div className="mt-3 flex justify-center items-center">
        <Button onClick={splitImg} disabled={splitting}>
          {splitting ? (
            <Fragment>
              <Spinner />
              Splitting...
            </Fragment>
          ) : (
            "Split"
          )}
        </Button>
      </div>
    </Fragment>
  )
}

import { h } from "preact"
import { useSplitImage } from "../hooks/useSplitImage"

import Layout from "../components/Layout"
import Inputs from "./Inputs"
import Preview from "./Preview"

const initialValue = 100

export default function App(): h.JSX.Element {
  const {
    splitSize,
    imgInfo,
    slicing,
    setFileList,
    setSliceSize,
    sliceImgAndSend,
  } = useSplitImage(initialValue)

  const InputsProps = {
    slicing,
    splitSize,
    setFileList,
    setSliceSize,
    sliceImgAndSend,
  }

  return (
    <Layout
      left={<Inputs {...InputsProps} />}
      right={imgInfo && <Preview sources={imgInfo} />}
    />
  )
}

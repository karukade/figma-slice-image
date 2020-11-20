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
    setFileList,
    setSliceSize,
    sliceImgAndDownload,
  } = useSplitImage(initialValue)

  const InputsProps = {
    splitSize,
    setFileList,
    setSliceSize,
    sliceImgAndDownload,
  }

  return (
    <Layout
      left={<Inputs {...InputsProps} />}
      right={imgInfo && <Preview sources={imgInfo} />}
    />
  )
}

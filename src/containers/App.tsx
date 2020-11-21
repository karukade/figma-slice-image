import { h, Fragment } from "preact"
import { useEffect } from "preact/hooks"
import { useSplitImage } from "../hooks/useSplitImage"
import { useFileReader } from "../hooks/useFileReader"
import { sendImages } from "../utils/send"

import Layout from "../components/Layout"
import Inputs from "./Inputs"
import Preview from "./Preview"

const initialValue = 4096 // figma image size limit

export default function App(): h.JSX.Element {
  const { imgInfo, setFileList } = useFileReader()
  const { sliceSize, slicing, sliced, setSliceSize, sliceImg } = useSplitImage(
    initialValue,
    imgInfo
  )

  const InputsProps = {
    slicing,
    sliceSize,
    setFileList,
    setSliceSize,
    sliceImg,
  }

  useEffect(() => {
    if (!sliced) return
    sendImages(sliced)
  }, [sliced])

  return (
    <Fragment>
      <Layout
        left={<Inputs {...InputsProps} />}
        right={imgInfo && <Preview sources={imgInfo} />}
      />
    </Fragment>
  )
}

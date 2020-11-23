import { h, Fragment } from "preact"
import { useEffect, useCallback, useRef } from "preact/hooks"
import { useSplitImage } from "../hooks/useSplitImage"
import { useFileReader } from "../hooks/useFileReader"
import { sendImages } from "../utils/send"

import Layout from "../components/Layout"
import Inputs from "./Inputs"
import Preview from "./Preview"

const initialValue = 4096 // figma image size limit

export default function App(): h.JSX.Element {
  const mousePos = useRef<{ x: number; y: number }>()
  const { imgInfo, setFileList, removeImg } = useFileReader()
  const {
    splitSize,
    splitting,
    splited,
    setSplitSize,
    splitImg,
  } = useSplitImage(initialValue, imgInfo)

  const onDrop = useCallback((e: DragEvent) => {
    if (!e.dataTransfer) return
    mousePos.current = { x: e.pageX, y: e.pageY }
    const fileList = e.dataTransfer.files
    setFileList(fileList)
  }, [])

  const InputsProps = {
    splitting,
    splitSize,
    onDrop,
    setSplitSize,
    splitImg,
  }

  useEffect(() => {
    if (!splited) return
    sendImages(splited)
  }, [splited])

  return (
    <Fragment>
      <Layout
        left={<Inputs {...InputsProps} />}
        right={
          imgInfo &&
          mousePos.current && (
            <Preview
              mousePos={mousePos}
              imgInfo={imgInfo}
              removeImg={removeImg}
            />
          )
        }
      />
    </Fragment>
  )
}

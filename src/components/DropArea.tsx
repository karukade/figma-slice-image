import { h } from "preact"
import { memo } from "preact/compat"
import clsx from "clsx"
import { useDropHandler, UseDropHandlerParams } from "../hooks/useDropHandler"

type Props = UseDropHandlerParams

function DropArea(props: Props): h.JSX.Element {
  const { isDragOver, onDragLeave, onDragOver, onDrop } = useDropHandler(props)
  const className = clsx("drop-area", { "is-drag-over": isDragOver })

  return (
    <div
      className={className}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      Drop Here
    </div>
  )
}

export default memo(DropArea)

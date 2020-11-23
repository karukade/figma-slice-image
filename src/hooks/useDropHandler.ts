import { useState } from "preact/hooks"

export type UseDropHandlerParams = {
  onDrop?: (e: DragEvent) => void
  onDragOver?: (e: DragEvent) => void
  onDragLeave?: (e: DragEvent) => void
}

export const useDropHandler = ({
  onDrop,
  onDragLeave,
  onDragOver,
}: UseDropHandlerParams): {
  isDragOver: boolean
  onDrop: (e: DragEvent) => void
  onDragOver: (e: DragEvent) => void
  onDragLeave: (e: DragEvent) => void
} => {
  const [isDragOver, setIsDragOver] = useState(false)
  const _onDrop = (e: DragEvent) => {
    e.stopPropagation()
    e.preventDefault()
    onDrop && onDrop(e)
    setIsDragOver(false)
  }

  const _onDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer) e.dataTransfer.dropEffect = "copy"
    setIsDragOver(true)
    onDragOver && onDragOver(e)
  }

  const _onDragLeave = (e: DragEvent) => {
    setIsDragOver(false)
    onDragLeave && onDragLeave(e)
  }

  return {
    isDragOver,
    onDrop: _onDrop,
    onDragOver: _onDragOver,
    onDragLeave: _onDragLeave,
  }
}

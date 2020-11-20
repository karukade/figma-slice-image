import { h } from "preact"
import { memo } from "preact/compat"

function PreviewItem({ src }: { src: string }) {
  return <div className="h-10 overflow-hidden"><img src={src} alt="" /></div>
}

export default memo(PreviewItem)

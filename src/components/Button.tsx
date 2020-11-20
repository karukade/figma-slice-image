import { h } from "preact"
import clsx from "clsx"
export default function Button({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void
  children: h.JSX.Element | string
  disabled: boolean
}): h.JSX.Element {
  const className = clsx("btn-primary", { "is-disabled": disabled })
  return (
    <button disabled={disabled} className={className} onClick={onClick}>
      {children}
    </button>
  )
}

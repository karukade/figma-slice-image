import { h, Fragment } from "preact"

type Props = {
  left: h.JSX.Element | null
  right: h.JSX.Element | null
}

export default function Layout({ left, right }: Props): h.JSX.Element {
  return (
    <Fragment>
      <div className="grid grid-cols-2">
        <div className="p-2">{left}</div>
        <div className="bg-gray-200 p-2">{right}</div>
      </div>
    </Fragment>
  )
}

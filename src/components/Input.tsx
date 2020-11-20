import { h } from "preact"

export default function Input({
  onChange,
  value,
  label,
}: {
  onChange: (val: string) => void
  label?: string
  value?: string | number
}): h.JSX.Element {
  const _onChange: h.JSX.GenericEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget
    onChange(value)
  }

  return (
    <label className="block flex items-center">
      {label && (
        <span className="mr-1 text-sm text-gray-600 flex-shrink-0">
          {label}
        </span>
      )}
      <input
        className="border rounded-md bg-gray-100 p-1 text-right w-full"
        type="text"
        value={value}
        onChange={_onChange}
      />
    </label>
  )
}

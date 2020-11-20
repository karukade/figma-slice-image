import { h } from "preact"

export default function Header(): h.JSX.Element {
  return (
    <header className="bg-blue-700 shadow-xl h-7 flex items-center fixed left-0 top-0 w-full">
      <div className="container mx-auto text-white leading-none">
        Image Slice
      </div>
    </header>
  )
}

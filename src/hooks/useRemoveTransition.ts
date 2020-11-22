import { useRef, useLayoutEffect, Ref } from "preact/hooks"

export const useRemoveTransition = (
  index: number
): Ref<HTMLDivElement | null> => {
  const prevPos = useRef<{ x: number; y: number } | null>(null)
  const elmRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const { current: elm } = elmRef
    if (!elm) return

    const y = elm.offsetTop
    const x = elm.offsetLeft
    const { current: prev } = prevPos

    if (!prev) {
      prevPos.current = { x, y }
      return
    }

    elm.style.transform = `translate(${prev.x - x}px, ${prev.y - y}px)`

    elm.offsetLeft // force reflow

    const ontransitionEnd = () => {
      elm.style.transition = ""
      elm.style.transform = ""
      elm.removeEventListener("transitionend", ontransitionEnd)
    }
    elm.addEventListener("transitionend", ontransitionEnd)
    elm.style.transition = "transform 0.25s ease"
    elm.style.transform = `translate(0, 0)`

    prevPos.current = { x, y }
  }, [index])

  return elmRef
}

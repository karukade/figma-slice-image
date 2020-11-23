import { useRef, useLayoutEffect, Ref } from "preact/hooks"

const moveFromPrevPos = (
  elm: HTMLElement,
  prevPos: { x: number; y: number }
) => {
  elm.style.transform = `translate(${prevPos.x}px, ${prevPos.y}px)`
  elm.offsetLeft // force reflow
  const ontransitionEnd = () => {
    elm.style.transition = ""
    elm.style.transform = ""
    elm.removeEventListener("transitionend", ontransitionEnd)
  }
  elm.addEventListener("transitionend", ontransitionEnd)
  elm.style.transition = "transform 0.25s ease"
  elm.style.transform = `translate(0, 0)`
}

const getElmPos = (elm: HTMLElement) => {
  const { top, left } = elm.getBoundingClientRect()
  const { pageXOffset, pageYOffset } = window
  return { x: left + pageXOffset, y: top + pageYOffset }
}

// 削除時のアニメーション
export const useRemoveTransition = (
  elmRef: Ref<HTMLElement | null>,
  index: number
): void => {
  const prevPos = useRef<{ x: number; y: number } | null>(null)

  useLayoutEffect(() => {
    const { current: elm } = elmRef
    if (!elm) return

    const { x, y } = getElmPos(elm)
    const { current: prev } = prevPos
    if (!prev) {
      prevPos.current = { x, y }
      return
    }

    moveFromPrevPos(elm, { x: prev.x - x, y: prev.y - y })
    prevPos.current = { x, y }
  }, [index])
}

// 追加時のアニメーション
export const useAddTransition = (
  elmRef: Ref<HTMLElement | null>,
  mousePos: Ref<{ x: number; y: number }>
): void => {
  useLayoutEffect(() => {
    const { current: pos } = mousePos
    const { current: elm } = elmRef
    if (!elm) return
    const { x, y } = getElmPos(elm)
    moveFromPrevPos(elm, { x: pos.x - x, y: pos.y - y })
  }, [])
}

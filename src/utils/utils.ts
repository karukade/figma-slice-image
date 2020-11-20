export const base64ToUint8Array = (base64Str: string): Uint8Array => {
  const raw = atob(base64Str)
  return Uint8Array.from(
    [...raw].map((x) => {
      return x.charCodeAt(0)
    })
  )
}

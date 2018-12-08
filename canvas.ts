let canvas: null | HTMLCanvasElement = null

function GetCanvas(): HTMLCanvasElement {
  if (canvas === null) {
    canvas = document.createElement(`canvas`)
    canvas.style.position = `fixed`
    canvas.style.display = `none`
    canvas.style.left = `0`
    canvas.style.top = `0`
    canvas.style.width = `100%`
    canvas.style.height = `100%`
    document.body.appendChild(canvas)
  }

  return canvas
}

function ShowCanvas(): void {
  GetCanvas().style.display = `block`
}

function HideCanvas(): void {
  if (canvas !== null) {
    canvas.style.display = `none`
  }
}

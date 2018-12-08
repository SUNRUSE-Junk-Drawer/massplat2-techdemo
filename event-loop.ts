let animationFrame: null | number = null
let loaded = false

function CheckEventLoop(): void {
  const focused = document.hasFocus()
  if (loaded && focused && !errorOccurred && !contextLost) {
    HideMessage()
    ShowCanvas()
    if (animationFrame === null) {
      animationFrame = requestAnimationFrame(OnFrame)
    }
  } else {
    HideCanvas()
    if (loaded && !errorOccurred) {
      if (!focused) {
        ShowMessage(`(paused)`)
      } else {
        ShowMessage(`Waiting for WebGL restart...`)
      }
    }
    if (animationFrame !== null) {
      cancelAnimationFrame(animationFrame)
      animationFrame = null
    }
  }
}

function OnFrame(time: number): void {
  animationFrame = null
  const gl = GetGl()
  gl.canvas.width = gl.canvas.clientWidth
  gl.canvas.height = gl.canvas.clientHeight
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  animationFrame = requestAnimationFrame(OnFrame)
}

onfocus = CheckEventLoop
onblur = CheckEventLoop

onload = function () {
  loaded = true
  CheckEventLoop()
}

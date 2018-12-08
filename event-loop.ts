let animationFrame: null | number = null
let loaded = false

function CheckEventLoop(): void {
  const focused = document.hasFocus()
  if (loaded && focused && !errorOccurred) {
    HideMessage()
    if (animationFrame === null) {
      animationFrame = requestAnimationFrame(OnFrame)
    }
  } else {
    if (loaded && !errorOccurred) {
      ShowMessage(`(paused)`)
    }
    if (animationFrame !== null) {
      cancelAnimationFrame(animationFrame)
      animationFrame = null
    }
  }
}

function OnFrame(time: number): void {
  animationFrame = null
  animationFrame = requestAnimationFrame(OnFrame)
}

onfocus = CheckEventLoop
onblur = CheckEventLoop

onload = function () {
  loaded = true
  CheckEventLoop()
}

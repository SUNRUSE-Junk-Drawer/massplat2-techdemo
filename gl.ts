let gl: null | WebGLRenderingContext = null
let contextLost = false
let contextId = 0

function GetGl(): WebGLRenderingContext {
  if (!gl) {
    const canvas = GetCanvas()
    const attributes: WebGLContextAttributes = {
      alpha: false,
      antialias: false,
      depth: true,
      failIfMajorPerformanceCaveat: true,
      powerPreference: `high-performance`,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      stencil: false
    }
    gl = canvas.getContext(`webgl`, attributes)
      || canvas.getContext(`experimental-webgl`, attributes)
    if (!gl) {
      throw new Error(`Failed to create a WebGL context.`)
    }
    canvas.addEventListener(`webglcontextlost`, event => {
      contextLost = true
      activeAttributeIndices = null
      CheckEventLoop()
      event.preventDefault()
    }, false)
    canvas.addEventListener(`webglcontextrestored`, event => {
      contextLost = false
      contextId++
      CheckEventLoop()
      event.preventDefault()
    })
  }

  return gl
}

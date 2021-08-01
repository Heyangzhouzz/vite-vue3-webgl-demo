import { defineComponent, onMounted, ref } from 'vue'
import initShaderProgram from './loadShader';
import initBuffers from './buffers'
import dorw from './draw'

export default defineComponent({
  name: 'App',
  setup() {
    const glCanvas = ref<HTMLCanvasElement|null>(null)
    const vsSource = `
        attribute vec3 aVertexPosition;
        attribute vec4 aVertexColor;

        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;

        varying lowp vec4 vColor;

        void main(void) {
          gl_Position = uProjectionMatrix* uModelViewMatrix * vec4(aVertexPosition, 1.0);
          vColor = aVertexColor;
        }
    `;
    const fsSource = `
      varying lowp vec4 vColor;

      void main(void) {
        gl_FragColor = vColor;
      }
    `;
    onMounted(() => {
      const glCanvasEl = glCanvas.value
      if (!glCanvasEl) {
        return
      }
      const gl = glCanvasEl.getContext('webgl')
      if (!gl) {
        return
      }
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
      if (!shaderProgram) {
        return
      }
      const programInfo = {
        program: shaderProgram,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
          vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
        },
        uniformLocations: {
          projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
          modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        },
      };
      const buffers = initBuffers(gl)
      dorw(gl,programInfo,buffers)
    })
    return ()=> (
      <div>
        <h1>vite test</h1>
        <canvas ref={glCanvas} id="glcanvas" width="640" height="480"></canvas>
      </div>
    )
  }
})
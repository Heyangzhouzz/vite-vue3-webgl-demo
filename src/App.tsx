import {defineComponent, onMounted, ref} from 'vue';
import initShaderProgram from './loadShader';
import initBuffers from './buffers';
import dorw from './draw';

export default defineComponent({
  name: 'App',
  setup() {
    const glCanvas = ref<HTMLCanvasElement|null>(null);
    const vsSource = `
        attribute vec4 aVertexPosition;
        attribute vec4 aVertexColor;

        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;

        varying lowp vec4 vColor;

        void main(void) {
          gl_Position = uProjectionMatrix* uModelViewMatrix * aVertexPosition;
          vColor = aVertexColor;
        }
    `;
    const fsSource = `
      varying lowp vec4 vColor;

      void main(void) {
        gl_FragColor = vColor;
      }
    `;
    let then = 0;
    let squareRotation = 0;

    onMounted(() => {
      const glCanvasEl = glCanvas.value;
      if (!glCanvasEl) {
        return;
      }
      const gl = glCanvasEl.getContext('webgl');
      if (!gl) {
        return;
      }
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
      if (!shaderProgram) {
        return;
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
      const buffers = initBuffers(gl);

      /** *
       * [Description]
       * @param {number} now - 动画时间戳
       */
      function render(now: number) {
        if (!gl) {
          return;
        }
        now *= 0.001; // convert to seconds
        const deltaTime = now - then;
        then = now;
        squareRotation += deltaTime;

        dorw(gl, programInfo, buffers, squareRotation);

        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
    });
    return ()=> (
      <div>
        <h1>vite test</h1>


        <canvas ref={glCanvas} id="glcanvas" width="640" height="640"></canvas>
      </div>
    );
  },
});

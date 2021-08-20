import {defineComponent, onMounted, ref} from 'vue';
import initShaderProgram from '@/utils/loadShader';
import fsSource from './shader/fsSource.glsl?raw';
import vsSource from './shader/vsSource.glsl?raw';

export default defineComponent({
  name: 'Rect',
  setup() {
    const glCanvas = ref<HTMLCanvasElement | null>(null);
    onMounted(() => {
      if (!glCanvas.value) {
        return;
      }
      const gl = glCanvas.value.getContext('webgl');
      if (!gl) {
        return;
      }
      const program = initShaderProgram(gl, vsSource, fsSource);
      gl.useProgram(program);
      const aposLocation = gl.getAttribLocation(program, 'apos');
      const data = new Float32Array([0.5, 0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5]);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      gl.vertexAttribPointer(aposLocation, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(aposLocation);
      gl.drawArrays(gl.LINE_LOOP, 0, 4);
    });
    return ()=> (
      <div>
        <canvas ref={glCanvas} id="glcanvas" width="640" height="640"></canvas>
      </div>
    );
  },
});

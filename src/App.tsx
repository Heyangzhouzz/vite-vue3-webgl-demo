import {defineComponent} from 'vue';
import CubeNative from './packages/cubeDemo/Cube';
import Cube from './packages/three/cube/Cube';
import Rect from '@/packages/rect/Rect';

export default defineComponent({
  name: 'App',
  setup() {
    return ()=> (
      <div>
        <p>webGl立方体:</p>
        <CubeNative ></CubeNative>
        <p>threejs立方体:</p>
        <Cube />
        <Rect></Rect>

      </div>
    );
  },
});

import {defineComponent} from 'vue';
// import CubeNative from './packages/cubeDemo/Cube';
// import Cube from './packages/three/cube/Cube';
// import Ball from './packages/three/ball/Ball';
// import Rect from '@/packages/rect/Rect';
import FullShot from '@/packages/three/fullshot/FullShot';
// import Drag from './packages/dragDemo/Drag';

export default defineComponent({
  name: 'App',
  setup() {
    return ()=> (
      <div>
        {/* <CubeNative ></CubeNative>
        <p>threejs立方体:</p>
        <Cube /> */}
        {/* <Ball /> */}
        {/* <Rect></Rect> */}
        {/* <Drag></Drag> */}
        <FullShot/>
      </div>
    );
  },
});

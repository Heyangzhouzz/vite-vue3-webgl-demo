import {defineComponent} from 'vue';
import Cube from './packages/cubeDemo/Cube';
import Rect from '@/packages/rect/Rect';

export default defineComponent({
  name: 'App',
  setup() {
    return ()=> (
      <div>
        <Cube />
        <Rect></Rect>
      </div>
    );
  },
});

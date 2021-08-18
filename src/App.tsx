import {defineComponent} from 'vue';
import Cube from './components/cubeDemo/Cube';

export default defineComponent({
  name: 'App',
  setup() {
    return ()=> (
      <div>
        <Cube/>
      </div>
    );
  },
});

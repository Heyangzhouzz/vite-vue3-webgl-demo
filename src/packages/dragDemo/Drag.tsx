import {defineComponent} from 'vue';
import style from './drag.module.stylus';

export default defineComponent({
  name: 'Drag',
  setup() {
    const dropHandler = (ev:any) => {
      console.log(ev);
    };
    const dragOver = (ev:any) => {
      ev.preventDefault();
    };

    return () => (
      <div class={style.container}>
        <div class={style.main} onDrop={dropHandler} onDragover={dragOver}>main</div>
        <div class={style.aside}>
          <span draggable="true">aside</span>
        </div>
      </div>
    );
  },
});

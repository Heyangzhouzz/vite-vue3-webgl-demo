import {defineComponent, onMounted, ref} from 'vue';

import Zdog from 'zdog';

export default defineComponent({
  name: 'Ellipse',
  setup() {
    const glCanvas = ref<HTMLCanvasElement | null>(null);
    let illo: Zdog.Illustration;
    let isSpinning = true;

    const animate = () => {
      if (isSpinning) {
        illo.rotate.y += 0.03;
      }
      illo.updateRenderGraph();
      // animate next frame
      requestAnimationFrame( animate );
    };
    const onDragStart = () => {
      isSpinning = false;
    };
    const onDragEnd = () => {
      isSpinning = true;
    };
    onMounted(() => {
      if (!glCanvas.value) {
        return;
      }
      illo = new Zdog.Illustration({
        element: glCanvas.value,
        dragRotate: true,
        onDragStart,
        onDragEnd,
      });

      new Zdog.Ellipse({
        addTo: illo,
        diameter: 80,
        stroke: 20,
        translate: {z: 40},
        color: '#636',
      });

      new Zdog.Rect({
        addTo: illo,
        width: 80,
        height: 80,
        // position further back
        translate: {z: -40},
        stroke: 12,
        color: '#E62',
        fill: true,
      });
      // start animation
      animate();
    });
    return () => (
      <div class="container">
        <canvas ref={glCanvas} class="zdog-canvas" width="240" height="240"></canvas>
      </div>
    );
  },
});

import {defineComponent, onMounted, ref} from 'vue';
import {Scene, BoxGeometry, MeshLambertMaterial, Mesh, PointLight, OrthographicCamera, WebGLRenderer} from 'three';

export default defineComponent({
  name: 'Cube',
  setup() {
    const glCanvas = ref<HTMLCanvasElement|null>(null);
    const scene = new Scene();

    const box = new BoxGeometry(100, 100, 100);
    const material = new MeshLambertMaterial({color: 0x00eeff});
    const mesh = new Mesh(box, material);
    scene.add(mesh);

    const point = new PointLight(0xffeeff);
    point.position.set(400, 200, 300);
    scene.add(point);

    onMounted(() => {
      if (!glCanvas.value) {
        return;
      }
      const width = glCanvas.value.clientWidth;
      const height = glCanvas.value.clientHeight;
      const k = width/height;
      const s = 100;

      const camera = new OrthographicCamera(-s*k, s*k, s, -s, 1, 1000);
      camera.position.set(200, 300, 200);
      camera.lookAt(scene.position);

      const render = new WebGLRenderer({canvas: glCanvas.value, alpha: true});
      console.log(render);
      render.setClearColor(0xb9d3ff, 1);

      render.render(scene, camera);
    });
    return ()=> (
      <div>
        <canvas ref={glCanvas} id="glcanvas" width="640" height="640"></canvas>
      </div>
    );
  },
});

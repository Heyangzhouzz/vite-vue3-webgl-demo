import {defineComponent, onMounted, ref} from 'vue';
import * as Three from 'three';

import {OrbitControls} from 'three-orbitcontrols-ts';

import vrbg from 'assets/vr-model2.jpg';

export default defineComponent({
  name: 'Fullshot',
  setup() {
    const glCanvas = ref<HTMLCanvasElement|null>(null);
    const scene = new Three.Scene();
    const box = new Three.SphereGeometry(130, 256, 256);
    const texture = new Three.TextureLoader().load(vrbg);
    const material = new Three.MeshPhongMaterial({map: texture, side: Three.DoubleSide});
    const mesh = new Three.Mesh(box, material);
    scene.add(mesh);

    const point = new Three.AmbientLight(0x444444, 3);
    const axisHelper = new Three.AxesHelper(600);
    scene.add(point, axisHelper);

    onMounted(() => {
      if (!glCanvas.value) {
        return;
      }
      const width = glCanvas.value.clientWidth;
      const height = glCanvas.value.clientHeight;
      const k = width/height;

      const camera=new Three.PerspectiveCamera(90, k, 1, 1000);
      camera.position.set(0, 0, 10);
      camera.lookAt(new Three.Vector3(0, 0, 0));

      const render = new Three.WebGLRenderer({canvas: glCanvas.value, alpha: true});
      console.log(render);
      render.setClearColor(0xb9d3ff, 1);

      let then = 0;
      const rederfn = (now:number) => {
        now *= 0.0001;
        const deltaTime = now - then;
        then = now;
        render.render(scene, camera);
        mesh.rotateY(deltaTime);
        requestAnimationFrame(rederfn);
      };
      requestAnimationFrame(rederfn);
      const controls = new OrbitControls(camera);
      controls.enableZoom = true;
      controls.zoomSpeed = 1.0;
    });
    return ()=> (
      <div>
        <canvas ref={glCanvas} id="glcanvas" width="640" height="640"></canvas>
      </div>
    );
  },
});

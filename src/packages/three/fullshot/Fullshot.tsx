import {defineComponent, onMounted, ref} from 'vue';
import * as Three from 'three';

import {OrbitControls} from '@/utils/orbitControls';
import style from './fullshot.module.stylus';

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
      camera.position.set(0, 0, 50);
      camera.lookAt(new Three.Vector3(0, 0, 0));

      const render = new Three.WebGLRenderer({canvas: glCanvas.value, alpha: true, antialias: true});
      render.setClearColor(0xb9d3ff, 1);
      render.setPixelRatio(window.devicePixelRatio);
      render.setSize(window.innerWidth, window.innerHeight);


      const controls = new OrbitControls(camera, render.domElement);
      controls.enableZoom = true;
      controls.maxDistance = 80;
      controls.zoomSpeed = 4;
      controls.autoRotate = true;

      const rederfn = (now:number) => {
        controls.update();
        render.render(scene, camera);
        requestAnimationFrame(rederfn);
      };
      requestAnimationFrame(rederfn);
    });
    return ()=> (
      <div class={style.container}>
        <canvas ref={glCanvas} class={style.canvas} id="glcanvas"></canvas>
      </div>
    );
  },
});

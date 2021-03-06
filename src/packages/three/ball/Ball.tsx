import {defineComponent, onMounted, ref} from 'vue';
import {
  Scene, BoxGeometry, MeshLambertMaterial,
  Mesh, PointLight, OrthographicCamera, WebGLRenderer, SphereGeometry, MeshPhongMaterial,
} from 'three';

import {OrbitControls} from 'three-orbitcontrols-ts';

export default defineComponent({
  name: 'Ball',
  setup() {
    const glCanvas = ref<HTMLCanvasElement|null>(null);
    const scene = new Scene();

    const box = new BoxGeometry(100, 100, 100);
    const material = new MeshLambertMaterial({color: 0x00eeff});
    const mesh = new Mesh(box, material);
    scene.add(mesh);

    {
      const box = new SphereGeometry(60, 40, 40);
      const material = new MeshPhongMaterial({color: 0x0000ff, specular: 0x4488ee, shininess: 12});
      const mesh = new Mesh(box, material);
      mesh.translateY(100);
      scene.add(mesh);
    }

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
      const s = 200;

      const camera = new OrthographicCamera(-s * k, s * k, s, -s, 1, 2000);
      camera.position.set(200, 200, 200);
      camera.lookAt(scene.position);

      const render = new WebGLRenderer({canvas: glCanvas.value, alpha: true});
      console.log(render);
      render.setClearColor(0xb9d3ff, 1);

      let then = 0;
      const rederfn = (now:number) => {
        now *= 0.001; // convert to seconds
        const deltaTime = now - then;
        then = now;
        render.render(scene, camera);
        mesh.rotateY(deltaTime);
        requestAnimationFrame(rederfn);
      };
      requestAnimationFrame(rederfn);
      new OrbitControls(camera);
    });
    return ()=> (
      <div>
        <canvas ref={glCanvas} id="glcanvas" width="640" height="640"></canvas>
      </div>
    );
  },
});

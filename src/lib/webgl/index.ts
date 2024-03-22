import Dots from '@/lib/webgl/components/dots';
import { Cells } from '@/lib/webgl/components/lines';
import Grid from '@/lib/webgl/components/tiles';
import { Clock, Color, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

type ThreeJSVisualizationOptions = {
  dom: HTMLElement;
};

class ThreeJSVisualization {
  private _scene: Scene = new Scene();
  private _container: HTMLElement;
  private _width: number;
  private _height: number;
  private _renderer: WebGLRenderer;
  private _camera: PerspectiveCamera;
  private _controls: OrbitControls;
  private _time: number = 0;
  private _clock: Clock = new Clock();
  private _isPlaying: boolean = true;
  private _grid!: Grid;
  private _dots!: Dots;
  private _cells!: Cells;

  constructor(options: ThreeJSVisualizationOptions) {
    this._container = options.dom;
    this._width = this._container.offsetWidth;
    this._height = this._container.offsetHeight;

    this._renderer = new WebGLRenderer();
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this._renderer.setSize(this._width, this._height);
    this._renderer.setClearColor(0xeeeeee, 1);
    this._container.appendChild(this._renderer.domElement);

    this._scene.background = new Color(0x000);

    this._camera = new PerspectiveCamera(
      50,
      this._width / this._height,
      0.1,
      100
    );
    this._camera.position.set(0, 0, 1);
    this._camera.lookAt(0, 0, 0);

    this._controls = new OrbitControls(this._camera, this._renderer.domElement);

    this._initializeObjects();
    this._setupResize();
    this.play();
  }

  public play() {
    this._render();
  }

  private _initializeObjects() {
    const commonOptions = {
      renderer: this._renderer,
      scene: this._scene,
      width: this._width,
      height: this._height,
      camera: this._camera,
    };

    this._grid = new Grid(commonOptions);
    this._dots = new Dots(commonOptions);
    this._cells = new Cells(commonOptions);
  }

  private _resize = () => {
    this._width = this._container.offsetWidth;
    this._height = this._container.offsetHeight;

    this._renderer.setSize(this._width, this._height);
    this._camera.aspect = this._width / this._height;
    this._camera.updateProjectionMatrix();
  };

  private _setupResize() {
    window.addEventListener('resize', this._resize);
  }

  private _render = () => {
    if (!this._isPlaying) return;

    this._time = this._clock.getElapsedTime();

    this._dots.material.uniforms.uTime.value = this._time;
    this._grid.material.uniforms.uMouse.value.x = Math.sin(this._time * 0.5);
    this._grid.material.uniforms.uMouse.value.y =
      Math.cos(this._time * 0.5) * 0.5;

    console.log(this._grid.material.uniforms.uMouse.value);

    requestAnimationFrame(this._render);
    this._renderer.render(this._scene, this._camera);
  };
}

export default ThreeJSVisualization;

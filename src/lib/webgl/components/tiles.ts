import {
  InstancedMesh,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
} from 'three';

import { tileParams } from '@/lib/webgl/parameters/parameters';
import fragment from '../shader/dots/fragment.glsl';
import vertex from '../shader/dots/vertex.glsl';

interface TGridOptions {
  renderer: WebGLRenderer;
  scene: Scene;
  width: number;
  height: number;
  camera: PerspectiveCamera;
}

export class Grid {
  private _renderer: WebGLRenderer;
  private _scene: Scene;
  private _size: { w: number; h: number; aspect: number };
  private _camera: PerspectiveCamera;
  private geometry: PlaneGeometry;
  private _instanceTile: InstancedMesh;

  public material: ShaderMaterial;

  constructor(options: TGridOptions) {
    this._renderer = options.renderer;
    this._scene = options.scene;
    this._size = {
      w: options.width,
      h: options.height,
      aspect: options.width / options.height,
    };
    this._camera = options.camera;
    this.geometry = new PlaneGeometry();
    this.material = new ShaderMaterial();
    this._instanceTile = new InstancedMesh(
      this.geometry,
      this.material,
      tileParams.amount ** 2
    );

    this._createTiles();
  }

  private _createTiles(): void {
    const { amount, size } = tileParams;

    this.geometry = new PlaneGeometry();
    this.material = new ShaderMaterial({
      uniforms: {
        uMouse: { value: new Vector3(0.4, 0.3) },
        uTime: { value: 0 },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      depthTest: false,
      wireframe: true,
    });

    this._instanceTile = new InstancedMesh(
      this.geometry,
      this.material,
      amount ** 2
    );
    this._instanceTile.name = 'Tiles';

    const dummy = new Object3D();
    const offset = -(amount - 1) * 0.5 * size;
    let count = 0;

    for (let x = 0; x < amount; x++) {
      for (let y = 0; y < amount; y++) {
        dummy.scale.set(size * 0.8, size * 0.8, 1);
        dummy.position.set(x * size + offset, y * size + offset, 0.001);
        dummy.updateMatrix();
        this._instanceTile.setMatrixAt(count++, dummy.matrix);
      }
    }

    this._instanceTile.instanceMatrix.needsUpdate = true;

    console.log(this._instanceTile);
    this._scene.add(this._instanceTile);
  }
}

export default Grid;

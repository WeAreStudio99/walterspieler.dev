import { tileParams } from '@/lib/webgl/parameters/parameters';
import {
  BufferGeometry,
  LineBasicMaterial,
  LineSegments,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';

interface CellsOptions {
  renderer: WebGLRenderer;
  scene: Scene;
  width: number;
  height: number;
  camera: PerspectiveCamera;
}

class Cells {
  private _renderer: WebGLRenderer;
  private _scene: Scene;
  private _size: { w: number; h: number; aspect: number };
  private _camera: PerspectiveCamera;

  constructor(options: CellsOptions) {
    this._renderer = options.renderer;
    this._scene = options.scene;
    this._size = {
      w: options.width,
      h: options.height,
      aspect: options.width / options.height,
    };
    this._camera = options.camera;

    this._createLines();
  }

  private _createLines(): void {
    const amount = tileParams.amount + 1;
    const length = tileParams.amount * tileParams.size;

    const offset = -(amount - 1) * 0.5 * tileParams.size;

    const points: Vector3[] = [];
    for (let i = 0; i < amount; i++) {
      const x = i * tileParams.size + offset;
      points.push(new Vector3(x, -length / 2, 0));
      points.push(new Vector3(x, length / 2, 0));
    }
    for (let i = 0; i < amount; i++) {
      const y = i * tileParams.size + offset;
      points.push(new Vector3(-length / 2, y, 0));
      points.push(new Vector3(length / 2, y, 0));
    }

    const geometry = new BufferGeometry().setFromPoints(points);
    const material = new LineBasicMaterial({ transparent: true, opacity: 0.2 });
    const lines = new LineSegments(geometry, material);
    lines.position.z = 0.001;

    this._scene.add(lines);
  }
}

export { Cells };

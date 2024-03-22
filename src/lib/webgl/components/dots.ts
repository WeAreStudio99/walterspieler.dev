import { tileParams } from '@/lib/webgl/parameters/parameters';
import {
  BufferGeometry,
  Float32BufferAttribute,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from 'three';

import fragment from '../shader/dots/fragment.glsl';
import vertex from '../shader/dots/vertex.glsl';

interface DotsOptions {
  renderer: WebGLRenderer;
  scene: Scene;
  width: number;
  height: number;
  camera: PerspectiveCamera;
}

class Dots {
  private renderer: WebGLRenderer;
  private scene: Scene;
  private size: { w: number; h: number; aspect: number };
  private camera: PerspectiveCamera;
  private dotGeom: BufferGeometry;
  private dots: Points;

  public material: ShaderMaterial;

  constructor(options: DotsOptions) {
    this.renderer = options.renderer;
    this.scene = options.scene;
    this.size = {
      w: options.width,
      h: options.height,
      aspect: options.width / options.height,
    };
    this.camera = options.camera;
    this.dotGeom = new BufferGeometry();
    this.material = new ShaderMaterial();
    this.dots = new Points();

    this.createDots();
  }

  private createDots(): void {
    const { amount } = tileParams;
    const dotAmount = amount + 1;
    const positions: number[] = [];
    const offset = -(dotAmount - 1) * 0.5 * tileParams.size;

    for (let x = 0; x < dotAmount; x++) {
      for (let y = 0; y < dotAmount; y++) {
        positions.push(
          x * tileParams.size + offset,
          y * tileParams.size + offset,
          0.001
        );
      }
    }

    this.dotGeom = new BufferGeometry();
    this.dotGeom.setAttribute(
      'position',
      new Float32BufferAttribute(positions, 3)
    );

    this.material = new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
    });

    this.dots = new Points(this.dotGeom, this.material);
    this.dots.name = 'Dots';
    this.scene.add(this.dots);
  }
}

export default Dots;

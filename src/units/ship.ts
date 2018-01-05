import { AbstractMesh, Vector3 } from "babylonjs";

export class Ship {
  private _speed: number;
  private _spin: Vector3;
  private _mesh: AbstractMesh;

  constructor(mesh: AbstractMesh) {
    this._mesh = mesh;
    this._speed = 0;
    this._spin = new Vector3(0, 0, 0);
  }

  // Depending on current direction and spin, updates its mesh's position and rotation
  // http://gameprogrammingpatterns.com/update-method.html
  public update(): void {
    // update mesh. Rotation before movement.
    this._mesh.rotatePOV(this._spin.x, this._spin.y, this._spin.z).movePOV(0, 0, this._speed);
  }

  public position() {
    return this._mesh.position;
  }

  public accelerate() {
    this._speed += 0.1;
  }

  public decelerate() {
    this._speed -= 0.1;
  }

  public turnLeft() {
    this._spin.y -= 0.01;
  }

  public turnRight() {
    this._spin.y += 0.01;
  }
}

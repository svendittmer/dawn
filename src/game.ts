import {
  AbstractMesh, Animation, Engine, HemisphericLight, Light, Scene, SceneLoader, UniversalCamera, Vector3,
} from "babylonjs";
import { Ship } from "./units/ship";

class Game {
  private _canvas: HTMLCanvasElement;
  private _engine: Engine;
  private _scene: Scene;
  private _camera: UniversalCamera;
  private _light: Light;
  private _plane: AbstractMesh;
  private _units: Ship[] = [];

  constructor(canvasElement: string) {
    // Create canvas and engine
    this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
    this._engine = new Engine(this._canvas, true);
  }

  public createScene(): void {
    // create a basic BJS Scene object
    this._scene = new Scene(this._engine);

    this.initializeCamera();
    this.initializeLight();

    this.initializeUnits();
  }

  public animate(): void {
    // run update within render loop
    // http://gameprogrammingpatterns.com/update-method.html
    this._scene.registerBeforeRender(() => {
      for (const unit of this._units) {
        unit.update();
      }
    });

    // run the render loop
    // http://gameprogrammingpatterns.com/game-loop.html
    this._engine.runRenderLoop(() => {
      this._scene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener("resize", () => {
      this._engine.resize();
    });
  }

  private initializeCamera(): void {
    // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
    this._camera = new UniversalCamera("camera1", new Vector3(0, 5, -10), this._scene);

    // target the camera to scene origin
    this._camera.setTarget(Vector3.Zero());

    // attach the camera to the canvas
    this._camera.attachControl(this._canvas, false);
  }

  private initializeLight(): void {
    // create a basic light, aiming 0,1,0 - meaning, to the sky
    this._light = new HemisphericLight("light1", new Vector3(0, 1, 0), this._scene);
  }

  private initializeUnits() {
    SceneLoader.ImportMesh("", "meshes/", "spaceship.babylon", this._scene, (meshes) => {
      this._units.push(new Ship(meshes[0]));
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  // Create the game using the 'renderCanvas'
  const game = new Game("renderCanvas");

  // Create the scene
  game.createScene();

  // start animation
  game.animate();
});

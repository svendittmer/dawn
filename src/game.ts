import Map from "./map";
import Ship from "./units/ship";

class Game {
  private _canvas: HTMLCanvasElement;
  private _engine: BABYLON.Engine;
  private _scene: BABYLON.Scene;
  private _camera: BABYLON.FreeCamera;
  private _light: BABYLON.Light;
  private _map: Map;
  private _units: [Ship];

  constructor(canvasElement: string) {
    // Create canvas and engine
    this._canvas = <HTMLCanvasElement>document.getElementById(canvasElement);
    this._engine = new BABYLON.Engine(this._canvas, true);
  }

  createScene(): void {
    // create a basic BJS Scene object
    this._scene = new BABYLON.Scene(this._engine);

    this.initializeCamera();
    this.initializeLight();

    this._map = new Map(this._scene);
    this._units = [new Ship(this._scene), new Ship(this._scene)];
  }

  animate(): void {
    // run the render loop
    this._engine.runRenderLoop(() => {
      this._scene.render();
    });

    // the canvas/window resize event handler
    window.addEventListener('resize', () => {
      this._engine.resize();
    });
  }

  private initializeCamera(): void {
    // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
    this._camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), this._scene);

    // target the camera to scene origin
    this._camera.setTarget(BABYLON.Vector3.Zero());

    // attach the camera to the canvas
    this._camera.attachControl(this._canvas, false);
  }

  private initializeLight(): void {
    // create a basic light, aiming 0,1,0 - meaning, to the sky
    this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this._scene);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // Create the game using the 'renderCanvas'
  let game = new Game('renderCanvas');

  // Create the scene
  game.createScene();

  // start animation
  game.animate();
});

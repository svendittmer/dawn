// import {
//   AbstractMesh, ActionManager, Animation, ArcFollowCamera, ArcRotateCamera, Engine, HemisphericLight, Light, Scene,
//   SceneLoader, Vector3,
// } from "babylonjs";
import { Ship } from "./units/ship";

class Game {
  private _canvas: HTMLCanvasElement;
  private _engine: BABYLON.Engine;
  private _scene: BABYLON.Scene;
  private _camera: BABYLON.ArcRotateCamera;
  private _light: BABYLON.Light;
  private _plane: BABYLON.AbstractMesh;
  private _units: Ship[] = [];

  constructor(canvasElement: string) {
    // Create canvas and engine
    this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
    this._engine = new BABYLON.Engine(this._canvas, true);
  }

  public createScene(): void {
    // create a basic BJS Scene object
    this._scene = new BABYLON.Scene(this._engine);
    this._scene.actionManager = new BABYLON.ActionManager(this._scene);

    this.initializeCamera();
    this.initializeLight();

    this.initializeUnits();
    this.createDummyObjects();
  }

  public animate(): void {
    // run update before each render loop
    // http://gameprogrammingpatterns.com/update-method.html
    this._scene.registerBeforeRender(() => {
      for (const unit of this._units) {
        unit.update();
        this._camera.setTarget(unit.position());
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
    this._camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 10, BABYLON.Vector3.Zero(), this._scene);

    // attach the camera to the canvas
    this._camera.attachControl(this._canvas, false);
  }

  private initializeLight(): void {
    // create a basic light, aiming 0,1,0 - meaning, to the sky
    this._light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this._scene);
  }

  private initializeUnits() {
    BABYLON.SceneLoader.ImportMesh("", "meshes/", "spaceship.babylon", this._scene, (meshes) => {
      this._units.push(new Ship(meshes[0]));
      const ship = this._units[0];
      this._scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, (evt) => {
          console.log(evt.sourceEvent.key);
          console.log(ship);
          switch (evt.sourceEvent.key) {
            case "w":
            ship.accelerate();
            break;
            case "s":
            ship.decelerate();
            break;
            case "a":
            ship.turnLeft();
            break;
            case "d":
            ship.turnRight();
            break;
          }
        },
      ));
    });
  }

  private createDummyObjects() {
    const box = BABYLON.MeshBuilder.CreateBox("box", {}, this._scene);
    box.position = new BABYLON.Vector3(20, 0, 10);

    const boxesSPS = new BABYLON.SolidParticleSystem("boxes", this._scene, {updatable: false});

    // function to position of grey boxes
    const setBoxes = (particle: any, i: any, s: any) => {
      particle.position = new BABYLON.Vector3(-200 + Math.random() * 400, 0, -200 + Math.random() * 400);
    };

    // add 400 boxes
    boxesSPS.addShape(box, 400, {positionFunction: setBoxes});
    const boxes = boxesSPS.buildMesh(); // mesh of boxes
    boxes.material = new BABYLON.StandardMaterial("", this._scene);
    boxes.material.alpha = 0.25;
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

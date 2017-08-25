export default class Ship {
  private _mesh: BABYLON.Mesh = null;

  constructor(scene: BABYLON.Scene) {
    this.importMesh(scene);
  }

  private importMesh(scene: BABYLON.Scene) {
    BABYLON.SceneLoader.ImportMesh("", "meshes/", "pirate-ship.babylon", scene,
      (newMeshes, particleSystems, skeletons) => {
        this._mesh = <BABYLON.Mesh>newMeshes[0];
        this._mesh.position.x = 10 * Math.random() -6;

        // add blink effect on click on ship
        this._mesh.actionManager = new BABYLON.ActionManager(scene);
        const action = new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPickTrigger, this._mesh, "visibility", 0.2, 1000);
        const action2 = new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPickTrigger, this._mesh, "visibility", 1.0, 1000);
        this._mesh.actionManager.registerAction(action).then(action2);
      }
    );
  }
}

export default class Ship {
  private _mesh: BABYLON.Mesh = null;

  constructor(mesh: BABYLON.Mesh, scene: BABYLON.Scene) {
    this._mesh = mesh;

    // add blink effect on click on ship
    this._mesh.actionManager = new BABYLON.ActionManager(scene);
    const action = new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPickTrigger, this._mesh, "visibility", 0.2, 1000);
    const action2 = new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPickTrigger, this._mesh, "visibility", 1.0, 1000);
    this._mesh.actionManager.registerAction(action).then(action2);
  }
}

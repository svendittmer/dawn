import Ship from "./units/ship";

export default class Map {
  private _mesh: BABYLON.Mesh;

  constructor(scene: BABYLON.Scene) {
    // create a built-in "ground" shape
    this._mesh = BABYLON.MeshBuilder.CreateGround("ground1",
      { width: 64, height: 64, subdivisions: 2 }, scene);

    // apply a texture to the ground
    const material = new BABYLON.StandardMaterial("texturePlane", scene);
    material.diffuseTexture = new BABYLON.Texture("textures/worldmap.png", scene);
    // material.diffuseTexture.uScale = 5.0; // Repeat 5 times on the Vertical Axes
    // material.diffuseTexture.vScale = 5.0; // Repeat 5 times on the Horizontal Axes
    material.backFaceCulling = false; // Always show the front and the back of an element
    this._mesh.material = material;

    // add blink effect on click on ship
    this._mesh.actionManager = new BABYLON.ActionManager(scene);

    const clearSelectionAction = new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnPickTrigger, () => { Ship.clearSelection(); });

    this._mesh.actionManager.registerAction(clearSelectionAction);
  }
}

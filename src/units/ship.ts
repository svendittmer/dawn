export default class Ship {
  public static clearSelection() {
    Ship._selectedShips.forEach((ship) => {
      ship.unSelect();
    });
    Ship._selectedShips = [] as [Ship];
  }

  private static _selectedShips: [Ship] = [] as [Ship];
  private static _highlightAnimation = new BABYLON.Animation("highlightAnimation",
                                          "visibility",
                                          30,
                                          BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                          BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
  private _mesh: BABYLON.Mesh = null;

  constructor(mesh: BABYLON.Mesh, scene: BABYLON.Scene) {
    this._mesh = mesh;

    // add blink effect on click on ship
    this._mesh.actionManager = new BABYLON.ActionManager(scene);

    const predicateUnselected = new BABYLON.PredicateCondition(
      this._mesh.actionManager, () => Ship._selectedShips.indexOf(this) === -1);

    const selectAction = new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnPickTrigger, () => { this.select(); }, predicateUnselected);

    this._mesh.actionManager.registerAction(selectAction);
  }

  public select(): void {
    this.highlight();
    Ship.clearSelection();
    Ship._selectedShips = [this];
  }

  public unSelect(): void {
    this.unHighlight();
  }

  private highlight(): void {
    BABYLON.Animation.CreateAndStartAnimation(
      "highlight", this._mesh, "visibility", 30, 15, 1.0, 0.2, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
  }

  private unHighlight(): void {
    BABYLON.Animation.CreateAndStartAnimation(
      "highlight", this._mesh, "visibility", 30, 15, 0.2, 1.0, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
  }
}

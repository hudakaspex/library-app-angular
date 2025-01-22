export class Placement {
  public id: number;
  public shelf: string;
  public level: number;
  public section: number;

  constructor(placement?: Placement) {
    if (placement) {
      this.id = placement.id;
      this.shelf = placement.shelf;
      this.level = placement.level;
      this.section = placement.section;
    }
  }
}

import { Placement } from "app/features/placement-feature/core/models/placement.model";

export class Shelves {
  public id: number;
  public label: string;
  public placements: Placement[];

  constructor(shelves?: Partial<Shelves>) {
    if (shelves) {
      this.id = shelves.id;
      this.label = shelves.label;
      this.placements = shelves.placements;
    }
  }
}

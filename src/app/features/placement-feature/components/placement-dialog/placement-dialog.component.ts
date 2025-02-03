import { CommonModule } from "@angular/common";
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from "@angular/core";
import { DialogComponent } from "app/shared/dialog/dialog.component";
import { GenericFormComponent } from "app/shared/generic-form/generic-form.component";
import { FieldConfig } from "app/shared/generic-form/models/field-config.model";
import { Placement } from "../../core/models/placement.model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-placement-dialog",
  templateUrl: "./placement-dialog.component.html",
  styleUrls: ["./placement-dialog.component.scss"],
  standalone: true,
  imports: [CommonModule, GenericFormComponent, DialogComponent],
})
export class PlacementDialogComponent {
  private dialogRef = inject(MatDialogRef);
  private data = inject(MAT_DIALOG_DATA);
  public isFormValid = signal(false);
  public placement: WritableSignal<Placement>;
  public formConfig: FieldConfig[] = [];

  constructor() {
    const placement = this.data ? this.data : new Placement();
    this.placement = signal(placement);
    this.initFormConfig();
  }

  private initFormConfig() {
    this.formConfig = [
      {
        type: "input",
        label: "Shelf",
        name: "shelf",
        validators: [{ type: "required", errorMessage: "Shelf is required" }],
        fieldType: "text",
      },
      {
        type: "input",
        value: this.placement().level,
        label: "Level",
        name: "level",
        validators: [{ type: "required", errorMessage: "Level is required" }],
        fieldType: "number",
      },

      {
        type: "input",
        value: this.placement().section,
        label: "Section",
        name: "section",
        validators: [{ type: "required", errorMessage: "Section is required" }],
        fieldType: "number",
      },
    ];
  }

  public onSave() {
    if (this.isFormValid()) {
      this.placement.update((placement) => {
        placement.id = this.data?.id;
        return placement;
      });
      this.dialogRef.close(this.placement());
    }
  }

  public onCancel() {
    this.dialogRef.close();
  }
}

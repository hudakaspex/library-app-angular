import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  WritableSignal,
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogComponent } from "app/shared/dialog/dialog.component";
import { GenericFormComponent } from "app/shared/generic-form/generic-form.component";
import { Shelves } from "../../core/models/shelves.model";
import { FieldConfig } from "app/shared/generic-form/models/field-config.model";

@Component({
  selector: "app-shelves-dialog",
  standalone: true,
  imports: [CommonModule, GenericFormComponent, DialogComponent],
  templateUrl: "./shelves-dialog.component.html",
  styleUrl: "./shelves-dialog.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShelvesDialogComponent {
  private dialogRef = inject(MatDialogRef);
  private data = inject(MAT_DIALOG_DATA);
  public isFormValid = signal(false);
  public shelves: WritableSignal<Shelves>;
  public formConfig: FieldConfig[] = [];

  constructor() {
    const shelves = this.data ? this.data : new Shelves();
    this.shelves = signal(shelves);
    this.initFormConfig();
  }

  private initFormConfig() {
    this.formConfig = [
      {
        type: "input",
        label: "Label",
        name: "label",
        validators: [{ type: "required", errorMessage: "Label is required" }],
        fieldType: "text",
        value: this.shelves().label,
        cssClass: "col-12",
      },
    ];
  }

  public onSave() {
    if (this.isFormValid()) {
      this.shelves.update((shelves) => {
        shelves.id = this.data?.id;
        return shelves;
      });
      this.dialogRef.close(this.shelves());
    }
  }

  public onCancel() {
    this.dialogRef.close();
  }
}

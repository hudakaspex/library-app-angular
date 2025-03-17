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
import { PlacementService } from "../../core/services/placement.service";
import { map, Observable, share, shareReplay } from "rxjs";
import { AutoCompleteComponent } from "app/shared/auto-complete/auto-complete.component";
import { AutoCompleteType } from "app/shared/auto-complete/models/auto-complete-type.enum";
import { Shelves } from "app/features/shelves-feature/core/models/shelves.model";
import { Book } from "app/features/book-feature/core/models/book.model";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-placement-dialog",
  templateUrl: "./placement-dialog.component.html",
  styleUrls: ["./placement-dialog.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    GenericFormComponent,
    DialogComponent,
    AutoCompleteComponent,
  ],
})
export class PlacementDialogComponent {
  private placementService = inject(PlacementService);
  private dialogRef = inject(MatDialogRef);
  private data = inject(MAT_DIALOG_DATA);
  private toastr = inject(ToastrService);
  public isFormValid = signal(false);
  public placement: WritableSignal<Placement>;
  public formConfig: FieldConfig[] = [];
  public autoCompleteType = AutoCompleteType.BOOK_NOT_IN_PLACEMENT;
  private selectedBookId = signal(null);

  constructor() {
    const placement = this.data ? this.data : new Placement();
    this.placement = signal(placement);
    this.selectedBookId.set(placement.book?.id);
    this.initFormConfig();
  }

  private initFormConfig() {
    this.formConfig = [
      {
        type: "select",
        asyncOptions: this.shelvesOptions(),
        label: "Shelf",
        name: "shelves_id",
        validators: [{ type: "required", errorMessage: "Shelf is required" }],
        value: this.placement().shelves?.id,
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

  public onSelectBook(book: { key: number; value: string }) {
    this.selectedBookId.set(book.key);
  }

  public onClearBook() {
    this.selectedBookId.set(null);
    this.isFormValid.set(false);
  }

  private shelvesOptions(): Observable<{ label: string; value: string }[]> {
    return this.placementService.getShelves().pipe(
      map((result: any) => result.data),
      map((shelves: any) =>
        shelves.map((shelf) => ({ label: shelf.label, value: shelf.id }))
      ),
      shareReplay(1)
    );
  }

  public onSave() {
    if (this.isFormValid()) {
      this.placement.update((placement) => {
        placement.id = this.data?.id;
        placement.shelves = new Shelves({ id: placement["shelves_id"] });
        placement.book = new Book({ id: this.selectedBookId() });
        return placement;
      });
      this.dialogRef.close(this.placement());
    } else {
      this.toastr.error("Please fill all required fields", "Error");
    }
  }

  public onCancel() {
    this.dialogRef.close();
  }
}

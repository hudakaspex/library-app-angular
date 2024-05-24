import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule
  ]
})
export class DialogComponent implements OnInit {
  @Input('dialogTitle') title = "New Form";

  @Output("onCancel") cancelEvent = new EventEmitter();

  @Output("onSave") saveEvent = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public onSave() {
    this.saveEvent.emit();
  }

  public onCancel() {
    this.cancelEvent.emit();
  }
}

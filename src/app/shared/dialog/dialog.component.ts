import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
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

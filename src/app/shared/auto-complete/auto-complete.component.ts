import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from "@angular/material/autocomplete";
import {
  MatFormFieldAppearance,
  MatFormFieldModule,
  MatLabel,
} from "@angular/material/form-field";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
} from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatInputModule } from "@angular/material/input";
import { AutoCompleteType } from "./models/auto-complete-type.enum";
import { AutoCompleteService } from "./services/auto-complete.service";
import { Utils } from "../utils";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "auto-complete",
  templateUrl: "./auto-complete.component.html",
  styleUrls: ["./auto-complete.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [AutoCompleteService],
})
export class AutoCompleteComponent implements OnChanges {
  private autoCompleteService = inject(AutoCompleteService);
  private toastr = inject(ToastrService);
  @Input() label = "Search ...";
  @Input() placeholder = "Search ..";
  @Input() autoCompleteType: AutoCompleteType;
  @Input() clearOnSelect = true;
  @Input() appearance: MatFormFieldAppearance = "outline";
  @Input() initialVal: string;
  @Output("onSelectOption") selectOption = new EventEmitter();

  inputCtrl: FormControl = new FormControl();
  filteredOptions$ = this.inputCtrl.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    filter(
      (query) =>
        Utils.isNotEmpty(query) && typeof query == "string" && query?.length > 2
    ),
    switchMap((query: string) => {
      return this.autoCompleteService.getOptionByType(
        this.autoCompleteType,
        query
      );
    }),
    tap((options) => {
      if (options.length === 0) {
        this.toastr.info("No results found", "Info");
      }
    }),
    takeUntilDestroyed()
  );

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.initialVal && changes.initialVal.currentValue) {
      const val = { label: changes.initialVal.currentValue };
      this.inputCtrl.setValue(val);
    }
  }

  public onSelectOption(event: MatAutocompleteSelectedEvent) {
    const value = event.option.value;
    this.selectOption.emit(value);
    if (this.clearOnSelect) {
      this.inputCtrl.reset(null, { onlySelf: true, emitEvent: true });
    }
  }

  displayFn(val: any): string {
    return val && val.label ? val.label : "";
  }
}

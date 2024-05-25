import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-dialog-generic-form',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './dialog-generic-form.component.html',
    styleUrl: './dialog-generic-form.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogGenericFormComponent { }

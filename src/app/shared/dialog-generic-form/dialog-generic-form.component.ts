import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GenericFormComponent } from '../generic-form/generic-form.component';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
    selector: 'app-dialog-generic-form',
    standalone: true,
    imports: [
        CommonModule,
        GenericFormComponent, 
        DialogComponent
    ],
    templateUrl: './dialog-generic-form.component.html',
    styleUrl: './dialog-generic-form.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogGenericFormComponent {
    
}

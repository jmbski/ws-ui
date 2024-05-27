import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ComponentConfig, ContainerConfig, GenericFunction } from 'warskald-ui/models';
import { ModularDialogConfig, ModularDialogRef } from 'warskald-ui/services';
import { ElementRendererComponent } from '../element-renderer/element-renderer.component';
import { isFunction } from 'warskald-ui/type-guards';

@Component({
    selector: 'ws-element-render-dialog',
    standalone: true,
    imports: [
        CommonModule,
        ElementRendererComponent,
        ReactiveFormsModule,
    ],
    templateUrl: './element-render-dialog.component.html',
    styleUrl: './element-render-dialog.component.scss'
})
export class ElementRenderDialogComponent {

    // #region public properties
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs

    @Input() renderConfig?: ContainerConfig;

    @Input() submitFunction: (data?: unknown) => void = (data?: unknown) => {};

    @Input() form?: FormGroup;
    
    // #endregion standard inputs
    
    
    // #region get/set inputs
    
    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren

    @ViewChild('elementRenderer') elementRenderer?: ElementRendererComponent;
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
        public dialogRef: ModularDialogRef,
        public config: ModularDialogConfig,
    ) {
        dialogRef.onSubmit.subscribe(() => {
            this.submitFunction(this.form?.value);
            this.dialogRef.destroy();
        });

        dialogRef.onClose.subscribe(() => {
            this.dialogRef.destroy();
        });

        dialogRef.onCancel.subscribe(() => {
            this.dialogRef.destroy();
        });

    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

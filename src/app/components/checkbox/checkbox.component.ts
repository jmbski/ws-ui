import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { ComponentConfig, CheckboxConfig, ElementType, GenericFunction, StyleGroup, WeakObject } from 'warskald-ui/models';
import { LoggableComponent, LogLevels } from 'warskald-ui/services';
import { BaseWidget } from '../base-widget';

/**
 * Widget that implements a PrimeNG Checkbox component.
 */
@LoggableComponent({
    LOCAL_ID: 'CheckboxComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-checkbox',
    standalone: true,
    imports: [
        CheckboxModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true
        }
    ],
    templateUrl: './checkbox.component.html',
    styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent extends BaseWidget<boolean> implements CheckboxConfig, ControlValueAccessor {

    // #region public properties

    public defaultBaseStyleClass: string = 'ws-checkbox';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];

    [key: string]: unknown;

    // #endregion public properties


    // #region private properties

    // #endregion private properties


    // #region getters/setters

    // #endregion getters/setters


    // #region standard inputs
    @Input() elementType = ElementType.CHECKBOX as const;

    @Input() value: boolean = false;
    
    @Input() options?: WeakObject;

    @Input() onChangeHandler(event: CheckboxChangeEvent): void {}
   
    @Input() onFocusHandler(event: Event): void {}
   
    @Input() onBlurHandler(event: Event): void {}

    // #endregion standard inputs


    // #region get/set inputs

    // #endregion get/set inputs


    // #region outputs, emitters, and event listeners

    // #endregion outputs, emitters, and event listeners


    // #region viewchildren and contentchildren

    // #endregion viewchildren and contentchildren


    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
    ) {
        super(cd);
    }

    // #endregion constructor and lifecycle hooks


    // #region public methods

    // #endregion public methods


    // #region protected methods

    // #endregion protected methods


    // #region private methods

    // #endregion private methods


}

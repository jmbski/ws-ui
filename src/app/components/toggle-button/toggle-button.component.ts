import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ToggleButton, ToggleButtonChangeEvent, ToggleButtonModule } from 'primeng/togglebutton';
import { ComponentConfig, ToggleButtonConfig, ElementType, GenericFunction, StyleGroup, WeakObject, PToggleButtonConfig } from 'warskald-ui/models';
import { initStyleGroups, LoggableComponent, LogLevels } from 'warskald-ui/services';
import { BaseWidget } from '../base-widget';

@LoggableComponent({
    LOCAL_ID: 'ToggleButtonComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-toggle-button',
    standalone: true,
    imports: [
        ToggleButtonModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ToggleButtonComponent),
            multi: true
        }
    ],
    templateUrl: './toggle-button.component.html',
    styleUrl: './toggle-button.component.scss'
})
export class ToggleButtonComponent extends BaseWidget<boolean> implements ToggleButtonConfig, ControlValueAccessor {

    // #region public properties


    public defaultBaseStyleClass: string = 'app-toggle-button';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];


    [key: string]: unknown;

    // #endregion public properties


    // #region private properties

    // #endregion private properties


    // #region getters/setters

    // #endregion getters/setters


    // #region standard inputs
    @Input() elementType = ElementType.TOGGLE_BUTTON as const;

    @Input() value: boolean = false;
    
    @Input() options: PToggleButtonConfig = {};

    @Input() onChangeHandler(event: ToggleButtonChangeEvent): void {}

    // #endregion standard inputs


    // #region get/set inputs

    // #endregion get/set inputs


    // #region outputs, emitters, and event listeners

    // #endregion outputs, emitters, and event listeners


    // #region viewchildren and contentchildren
    
    @ViewChild('toggleButtonRef') toggleButtonRef?: ToggleButton;

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

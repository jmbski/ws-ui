import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputSwitch, InputSwitchChangeEvent, InputSwitchModule } from 'primeng/inputswitch';
import { ComponentConfig, InputSwitchConfig, ElementType, GenericFunction, StyleGroup, WeakObject, PInputSwitchConfig } from 'warskald-ui/models';
import { initStyleGroups, LoggableComponent, LogLevels } from 'warskald-ui/services';
import { BaseWidget } from '../base-widget';

@LoggableComponent({
    LOCAL_ID: 'InputSwitchComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-input-switch',
    standalone: true,
    imports: [
        InputSwitchModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputSwitchComponent),
            multi: true
        }
    ],
    templateUrl: './input-switch.component.html',
    styleUrl: './input-switch.component.scss'
})
export class InputSwitchComponent extends BaseWidget<boolean> implements InputSwitchConfig, ControlValueAccessor {

    // #region public properties


    public defaultBaseStyleClass: string = 'app-input-switch';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];


    [key: string]: unknown;

    // #endregion public properties


    // #region private properties

    // #endregion private properties


    // #region getters/setters

    // #endregion getters/setters


    // #region standard inputs
    @Input() elementType = ElementType.INPUT_SWITCH as const;

    @Input() value: boolean = false;
    
    @Input() options: PInputSwitchConfig = {};

    @Input() onChangeHandler(event: InputSwitchChangeEvent): void {}

    // #endregion standard inputs


    // #region get/set inputs

    // #endregion get/set inputs


    // #region outputs, emitters, and event listeners

    // #endregion outputs, emitters, and event listeners


    // #region viewchildren and contentchildren

    @ViewChild('inputSwitch') inputSwitch?: InputSwitch;
    
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

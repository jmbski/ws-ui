import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { SelectButtonChangeEvent, SelectButtonModule, SelectButtonOptionClickEvent } from 'primeng/selectbutton';
import { ComponentConfig, SelectButtonConfig, ElementType, GenericFunction, StyleGroup, WeakObject, PSelectButtonConfig } from 'warskald-ui/models';
import { initStyleGroups, LoggableComponent, LogLevels } from 'warskald-ui/services';
import { BaseWidget } from '../base-widget';

@LoggableComponent({
    LOCAL_ID: 'SelectButtonComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-select-button',
    standalone: true,
    imports: [
        SelectButtonModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectButtonComponent),
            multi: true
        }
    ],
    templateUrl: './select-button.component.html',
    styleUrl: './select-button.component.scss'
})
export class SelectButtonComponent extends BaseWidget<unknown> implements SelectButtonConfig, ControlValueAccessor {

    // #region public properties


    public defaultBaseStyleClass: string = 'app-select-button';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];


    [key: string]: unknown;

    // #endregion public properties


    // #region private properties

    // #endregion private properties


    // #region getters/setters

    // #endregion getters/setters


    // #region standard inputs
    @Input() elementType = ElementType.SELECT_BUTTON as const;

    @Input() value: boolean = false;
    
    @Input() options: PSelectButtonConfig = {};
    
    @Input() onOptionClickHandler(event: SelectButtonOptionClickEvent): void {}

    @Input() onChangeHandler(event: SelectButtonChangeEvent): void {}

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

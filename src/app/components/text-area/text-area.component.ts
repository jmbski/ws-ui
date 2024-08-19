import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ComponentConfig, TextAreaConfig, ElementType, GenericFunction, StyleGroup, WeakObject, PInputTextAreaConfig } from 'warskald-ui/models';
import { initStyleGroups, LoggableComponent, LogLevels } from 'warskald-ui/services';
import { BaseWidget } from '../base-widget';

@LoggableComponent({
    LOCAL_ID: 'TextAreaComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-text-area',
    standalone: true,
    imports: [
        InputTextareaModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextAreaComponent),
            multi: true
        }
    ],
    templateUrl: './text-area.component.html',
    styleUrl: './text-area.component.scss'
})
export class TextAreaComponent extends BaseWidget<string> implements TextAreaConfig, ControlValueAccessor {

    // #region public properties


    public defaultBaseStyleClass: string = 'app-text-area';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];


    [key: string]: unknown;

    // #endregion public properties


    // #region private properties

    // #endregion private properties


    // #region getters/setters

    // #endregion getters/setters


    // #region standard inputs
    
    @Input() elementType = ElementType.TEXT_AREA as const;

    @Input() value: string = '';
    
    @Input() options: PInputTextAreaConfig = {};

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

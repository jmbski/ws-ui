import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ToggleButton, ToggleButtonChangeEvent, ToggleButtonModule } from 'primeng/togglebutton';
import { BaseComponentConfig, ToggleButtonConfig, ElementType, GenericFunction, StyleGroup, WeakObject, PToggleButtonConfig } from 'warskald-ui/models';
import { initStyleGroups, LoggableComponent, LogLevels } from 'warskald-ui/services';

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
export class ToggleButtonComponent implements ToggleButtonConfig, ControlValueAccessor {

    // #region public properties


    public defaultBaseStyleClass: string = 'app-toggle-button';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];

    public innerControl: FormControl = new FormControl(false);


    [key: string]: unknown;

    // #endregion public properties


    // #region private properties

    // #endregion private properties


    // #region getters/setters

    // #endregion getters/setters


    // #region standard inputs
    @Input() elementType = ElementType.TOGGLE_BUTTON as const;

    @Input() value: boolean = false;

    @Input() hasForm = true as const;

    @Input() form?: FormControl | FormGroup;

    @Input() label?: string;

    @Input() actionID?: string;

    @Input() id: string = '';

    @Input() baseStyles?: StyleGroup = {};
    
    @Input() options: PToggleButtonConfig = {};

    @Input() children?: BaseComponentConfig[];

    @Input() layoutStyles?: StyleGroup = {};

    @Input() onChanged: GenericFunction<void> = () => {};

    @Input() onTouched: GenericFunction<void> = () => {};

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
    
    }

    ngOnInit() {
        initStyleGroups.bind(this)();
        this.cd.detectChanges();

        this.innerControl = new FormControl(this.value);
        this.innerControl.valueChanges.subscribe((value) => {
            this.onChanged(value);
            this.onTouched(value);
            this.writeValue(value);
        });
    }

    // #endregion constructor and lifecycle hooks


    // #region public methods

    public writeValue(obj: boolean): void {
        this.value = obj;
        this.form?.patchValue(this.value);
    }

    public registerOnChange(fn: GenericFunction<unknown>): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: GenericFunction<unknown>): void {
        this.onTouched = fn;
    }

    public setDisabledState?(isDisabled: boolean): void {
        isDisabled ? this.innerControl?.disable() : this.innerControl?.enable();
    }

    // #endregion public methods


    // #region protected methods

    // #endregion protected methods


    // #region private methods

    // #endregion private methods


}

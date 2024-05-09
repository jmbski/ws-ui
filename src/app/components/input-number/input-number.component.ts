import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputNumberInputEvent, InputNumberModule } from 'primeng/inputnumber';
import { BaseComponentConfig, InputNumberConfig, ElementType, GenericFunction, StyleGroup, WeakObject, PInputNumberConfig } from 'warskald-ui/models';
import { initStyleGroups, LoggableComponent, LogLevels } from 'warskald-ui/services';

@LoggableComponent({
    LOCAL_ID: 'InputNumberComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-input-number',
    standalone: true,
    imports: [
        InputNumberModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputNumberComponent),
            multi: true
        }
    ],
    templateUrl: './input-number.component.html',
    styleUrl: './input-number.component.scss'
})
export class InputNumberComponent implements InputNumberConfig, ControlValueAccessor {

    // #region public properties


    public defaultBaseStyleClass: string = 'app-input-number';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];

    public innerControl: FormControl = new FormControl(undefined);


    [key: string]: unknown;

    // #endregion public properties


    // #region private properties

    // #endregion private properties


    // #region getters/setters

    // #endregion getters/setters


    // #region standard inputs
    @Input() elementType = ElementType.INPUT_NUMBER as const;

    @Input() value: number = 0;

    @Input() hasForm = true as const;

    @Input() form?: FormControl | FormGroup;

    @Input() label?: string;

    @Input() actionID?: string;

    @Input() id: string = '';

    @Input() baseStyles?: StyleGroup = {};
    
    @Input() options: PInputNumberConfig = {};

    @Input() children?: BaseComponentConfig[];

    @Input() layoutStyles?: StyleGroup = {};

    @Input() onChanged: GenericFunction<void> = () => {};

    @Input() onTouched: GenericFunction<void> = () => {};

    @Input() onInputHandler(event: InputNumberInputEvent): void {}

    @Input() onFocusHandler(event: Event): void {}

    @Input() onBlurHandler(event: Event): void {}

    @Input() onKeyDownHandler(event: KeyboardEvent): void {}

    @Input() onClearHandler(event: void): void {}

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

    public writeValue(obj: number): void {
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

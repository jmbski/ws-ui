import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { DropdownChangeEvent, DropdownFilterEvent, DropdownLazyLoadEvent, DropdownModule } from 'primeng/dropdown';
import { BaseComponentConfig, DropdownConfig, ElementType, GenericFunction, StyleGroup, WeakObject } from 'warskald-ui/models';
import { LoggableComponent, LogLevels } from 'warskald-ui/services';

@LoggableComponent({
    LOCAL_ID: 'DropdownComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-dropdown',
    standalone: true,
    imports: [
        DropdownModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DropdownComponent),
            multi: true
        }
    ],
    templateUrl: './dropdown.component.html',
    styleUrl: './dropdown.component.scss'
})
export class DropdownComponent implements DropdownConfig, ControlValueAccessor {

    // #region public properties


    public defaultBaseStyleClass: string = 'app-dropdown';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];

    public innerControl: FormControl = new FormControl('');


    [key: string]: unknown;

    // #endregion public properties


    // #region private properties

    // #endregion private properties


    // #region getters/setters

    // #endregion getters/setters


    // #region standard inputs
    @Input() elementType = ElementType.DROPDOWN as const;

    @Input() value: string = '';

    @Input() hasForm = true as const;

    @Input() form?: FormControl | FormGroup;

    @Input() label?: string;

    @Input() actionID?: string;

    @Input() id: string = '';

    @Input() baseStyles?: StyleGroup = {};
    
    @Input() options?: WeakObject;

    @Input() children?: BaseComponentConfig[];

    @Input() layoutStyles?: StyleGroup = {};

    @Input() optionValues: SelectItem[] = [];

    @Input() onChanged: GenericFunction<void> = () => {};

    @Input() onTouched: GenericFunction<void> = () => {};

    @Input() onMouseEnterHandler(event: unknown): void {}

    @Input() onChangeHandler(event: DropdownChangeEvent): void {}

    @Input() onFilterHandler(event: DropdownFilterEvent): void {}

    @Input() onFocusHandler(event: Event): void {}

    @Input() onBlurHandler(event: Event): void {}

    @Input() onClickHandler(event: MouseEvent): void {}

    @Input() onShowHandler(event: unknown): void {}

    @Input() onHideHandler(event: unknown): void {}

    @Input() onClearHandler(event: Event): void {}

    @Input() onLazyLoadHandler(event: DropdownLazyLoadEvent): void {}

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
        this.innerControl = new FormControl(this.value);
        this.innerControl.valueChanges.subscribe((value) => {
            this.onChanged(value);
            this.onTouched(value);
            this.writeValue(value);
        });
    }

    // #endregion constructor and lifecycle hooks


    // #region public methods

    public writeValue(obj: string): void {
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

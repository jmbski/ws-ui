import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { AutoComplete, AutoCompleteCompleteEvent, AutoCompleteDropdownClickEvent, AutoCompleteLazyLoadEvent, AutoCompleteModule, AutoCompleteSelectEvent, AutoCompleteUnselectEvent } from 'primeng/autocomplete';
import { ComponentConfig, AutoCompleteConfig, ElementType, GenericFunction, StyleGroup, WeakObject, PAutoCompleteConfig } from 'warskald-ui/models';
import { initStyleGroups, LoggableComponent, LogLevels } from 'warskald-ui/services';

@LoggableComponent({
    LOCAL_ID: 'AutoCompleteComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-auto-complete',
    standalone: true,
    imports: [
        AutoCompleteModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AutoCompleteComponent),
            multi: true
        }
    ],
    templateUrl: './auto-complete.component.html',
    styleUrl: './auto-complete.component.scss'
})
export class AutoCompleteComponent implements AutoCompleteConfig, ControlValueAccessor {

    // #region public properties


    public defaultBaseStyleClass: string = 'app-auto-complete';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];
    
    public innerControl: FormControl = new FormControl(undefined);

    public suggestions: WeakObject[] = [];


    [key: string]: unknown;

    // #endregion public properties


    // #region private properties

    // #endregion private properties


    // #region getters/setters

    // #endregion getters/setters


    // #region standard inputs
    @Input() elementType = ElementType.AUTO_COMPLETE as const;

    @Input() value: unknown = undefined;

    @Input() hasForm = true as const;

    @Input() form?: FormControl | FormGroup;

    @Input() label?: string;

    @Input() actionID?: string;

    @Input() id: string = '';

    @Input() baseStyles?: StyleGroup = {};
    
    @Input() options: PAutoCompleteConfig = {};

    @Input() children?: ComponentConfig[];

    @Input() layoutStyles?: StyleGroup = {};

    @Input() onChanged: GenericFunction<void> = () => {};

    @Input() onTouched: GenericFunction<void> = () => {};

    @Input() completeMethodHandler(event: AutoCompleteCompleteEvent): void {}

    @Input() onSelectHandler(event: AutoCompleteSelectEvent): void {}

    @Input() onUnselectHandler(event: AutoCompleteUnselectEvent): void {}

    @Input() onFocusHandler(event: Event): void {}

    @Input() onBlurHandler(event: Event): void {}

    @Input() onDropdownClickHandler(event: AutoCompleteDropdownClickEvent): void {}

    @Input() onKeyUpHandler(event: KeyboardEvent): void {}

    @Input() onShowHandler(event: Event): void {}

    @Input() onHideHandler(event: Event): void {}

    @Input() onLazyLoadHandler(event: AutoCompleteLazyLoadEvent): void {}


    // #endregion standard inputs


    // #region get/set inputs

    // #endregion get/set inputs


    // #region outputs, emitters, and event listeners

    // #endregion outputs, emitters, and event listeners


    // #region viewchildren and contentchildren
    
    @ViewChild('autoCompleteRef') autoCompleteRef?: AutoComplete;

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

    public writeValue(obj: unknown): void {
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

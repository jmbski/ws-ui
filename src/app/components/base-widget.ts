import { ChangeDetectorRef, Component, Inject, Input } from '@angular/core';
import { ComponentConfig, FunctionMap, GenericFunction, StyleGroup } from 'warskald-ui/models';
import { FormControl, FormGroup } from '@angular/forms';
import { initActions, initStyleGroups } from 'warskald-ui/services';

@Component({
    selector: 'ws-base-widget',
    template: '',
    styleUrls: []
})
export class BaseWidget<T> {
    // #region public properties

    public innerControl: FormControl = new FormControl(undefined);

    [key: string]: unknown;
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs

    @Input() hasForm = true as const;

    @Input() hasFormGroup: boolean = false;

    @Input() label?: string;

    @Input() actionID?: string;

    @Input() actionMap?: FunctionMap;

    @Input() id: string = '';

    @Input() form?: FormControl | FormGroup;

    @Input() children?: ComponentConfig[];

    @Input() baseStyles?: StyleGroup = {};

    @Input() layoutStyles?: StyleGroup = {};

    @Input() labelStyles?: StyleGroup = {};

    @Input() onChanged: GenericFunction<void> = () => {};

    @Input() onTouched: GenericFunction<void> = () => {};
    
    // #endregion standard inputs
    
    
    // #region get/set inputs
    

    private _disabled: boolean = false;
    @Input() 
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value: boolean) {
        this._disabled = value;
        if(this.setDisabledState) {
            this.setDisabledState(value);
        }
    }
    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks

    constructor(
        public _cd: ChangeDetectorRef,
    ) {
        this.disabled = this._disabled;
    }

    ngAfterContentInit() {
        initStyleGroups.bind(this)();
        initActions.bind(this)();
        this._cd.detectChanges();

        this.innerControl = new FormControl(this.value);
        this.innerControl.valueChanges.subscribe((value) => {
            if(value !== this.value) {
                this.onChanged(value);
                this.onTouched(value);
                this.writeValue(value);
            }
        });

        this.form?.valueChanges.subscribe((value) => {
            if(value !== this.value) {
                this.writeValue(value);
            }
        });

        this.setDisabledState(this.disabled);
    }
    
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    public writeValue(obj: T): void {
        this.value = obj;
        this.form?.patchValue(this.value);
        this._cd.detectChanges();
    }
    

    public registerOnChange(fn: GenericFunction<unknown>): void {
        this.onChanged = fn;
    }

    public registerOnTouched(fn: GenericFunction<unknown>): void {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        isDisabled ? this.disableForm() : this.enableForm();
    }

    public disableForm(): void {
        this.form?.disable();  
        this.innerControl.disable();
        
    }

    public enableForm(): void {
        this.form?.enable();
        this.innerControl.enable();
    }
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}
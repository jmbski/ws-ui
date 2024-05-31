import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { BehaviorSubject } from 'rxjs';
import { ComponentConfig, InputTextConfig, ElementType, GenericFunction, StyleGroup, WeakObject, PInputTextConfig } from 'warskald-ui/models';
import { initStyleGroups, LoggableComponent, LogLevels } from 'warskald-ui/services';

@LoggableComponent({
    LOCAL_ID: 'InputTextComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-input-text',
    standalone: true,
    imports: [
        InputTextModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputTextComponent),
            multi: true
        }
    ],
    templateUrl: './input-text.component.html',
    styleUrl: './input-text.component.scss'
})
export class InputTextComponent implements InputTextConfig, ControlValueAccessor {

    // #region public properties


    public defaultBaseStyleClass: string = 'app-input-text';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];

    public innerControl: FormControl = new FormControl(undefined);


    [key: string]: unknown;

    // #endregion public properties


    // #region private properties

    // #endregion private properties


    // #region getters/setters

    // #endregion getters/setters


    // #region standard inputs
    @Input() elementType = ElementType.INPUT_TEXT as const;

    @Input() value: string = '';

    @Input() hasForm = true as const;

    @Input() form?: FormControl | FormGroup;

    @Input() label?: string;

    @Input() actionID?: string;

    @Input() id: string = '';

    @Input() baseStyles?: StyleGroup = {};
    
    @Input() options?: WeakObject;

    @Input() children?: ComponentConfig[];

    @Input() layoutStyles?: StyleGroup = {};

    @Input() onChanged: GenericFunction<void> = () => {};

    @Input() onTouched: GenericFunction<void> = () => {};

    // #endregion standard inputs


    // #region get/set inputs

    private _externalListener$?: BehaviorSubject<string>;
    @Input()
    get externalListener$(): BehaviorSubject<string> | undefined {
        return this._externalListener$;
    }
    set externalListener$(value: BehaviorSubject<string> | undefined) {
        if(this._externalListener$) {
            this._externalListener$.unsubscribe();
        }
        this._externalListener$ = value;
        if(value) {
            value.subscribe((newValue) => {
                this.writeValue(newValue);
            });
        }
    }

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

        this.form?.valueChanges.subscribe((value) => {
            if(value !== this.value) {
                this.writeValue(value);
            }
        });
    }

    // #endregion constructor and lifecycle hooks


    // #region public methods

    public writeValue(obj: string): void {
        this.value = obj;
        this.form?.patchValue(this.value);
        this.cd.detectChanges();
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

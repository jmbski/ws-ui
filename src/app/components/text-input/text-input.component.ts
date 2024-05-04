import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ElementType, FormElementConfig, GenericFunction, StyleGroup } from 'warskald-ui/models';
import { initStyleGroups, LoggableComponent, LogLevels, NgLogService, RegisterClassType } from 'warskald-ui/services';
import { pipe, debounceTime } from 'rxjs';

@RegisterClassType(ElementType.TEXT_INPUT)
@Component({
    selector: 'ws-text-input',
    standalone: true,
    imports: [
        CommonModule,
        InputTextModule,
        ReactiveFormsModule,
    ],
    templateUrl: './text-input.component.html',
    styleUrl: './text-input.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextInputComponent),
            multi: true
        }
    ],
})
@LoggableComponent({
    LOCAL_ID: 'TextInputComponent',
    autoAddLogs: true,
    appendNanoId: true,
    canLog: true,
    localLogLevel: LogLevels.Error,
})
export class TextInputComponent implements ControlValueAccessor, FormElementConfig {

    // #region public properties
    [key: string]: unknown;

    // #endregion public properties


    // #region private properties

    public defaultBaseStyleClass: string = 'w-full';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];

    // #endregion private properties


    // #region getters/setters

    // #endregion getters/setters


    // #region standard inputs

    @Input() elementType: ElementType.TEXT_INPUT = ElementType.TEXT_INPUT;
    @Input() id: string = '';
    @Input() hasForm = true as const;
    @Input() form?: FormControl;
    @Input() label?: string = 'Label';
    @Input() layoutStyles?: StyleGroup = {};

    @Input() baseStyles?: StyleGroup = {};

    @Input() actionID?: string;

    // #endregion standard inputs


    // #region get/set inputs

    private _value: string = '';
    @Input()
    get value() {
        return this._value;
    }
    set value(input: string) {
        this._value = input;
        this.onChange(input);
        this.onTouched();
        this.form?.patchValue(input);
    }

    public innerControl: FormControl = new FormControl(this.value);

    // #endregion get/set inputs


    // #region outputs, emitters, and event listeners

    // #endregion outputs, emitters, and event listeners


    // #region viewchildren and contentchildren

    // #endregion viewchildren and contentchildren

    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
    ) {
        NgLogService.updateLocalLogSettings(this);
    }

    ngOnInit() {
        this.innerControl = new FormControl(this.value);
        this.cd.detectChanges();
        this.innerControl.valueChanges.pipe(debounceTime(500)).subscribe(value => {
            this.writeValue(value);
        });

        initStyleGroups.bind(this)();
    }
    // #endregion constructor and lifecycle hooks


    // #region public methods

    public onChange: GenericFunction<unknown> = () => { };

    public onTouched: GenericFunction<unknown> = () => { };

    writeValue(obj: string): void {
        this.value = obj;
    }

    registerOnChange(fn: GenericFunction<unknown>): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: GenericFunction<unknown>): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        isDisabled ? this.innerControl.disable() : this.innerControl.enable();
    }

    // #endregion public methods


    // #region protected methods

    // #endregion protected methods


    // #region private methods

    // #endregion private methods


}

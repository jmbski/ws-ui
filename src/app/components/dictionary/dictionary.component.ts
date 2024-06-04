import { CommonModule, KeyValue } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { BaseWidget } from '../base-widget';
import { DictionaryType, DictionaryTypes, ElementType, PPanelConfig, DictionaryItem, StyleGroup, WeakObject } from 'warskald-ui/models';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { isBoolean, isString } from 'warskald-ui/type-guards';
import { isNumber } from 'lodash';
import { LoggableComponent, LogLevels } from 'warskald-ui/services';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SelectItem } from 'primeng/api';
import { SelectButtonModule } from 'primeng/selectbutton';

@LoggableComponent({
    LOCAL_ID: 'DictionaryComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-dictionary',
    standalone: true,
    imports: [
        ButtonModule,
        CommonModule,
        DropdownModule,
        InputGroupModule,
        InputGroupAddonModule,
        InputNumberModule,
        InputTextModule,
        ReactiveFormsModule,
        SelectButtonModule,
        ToggleButtonModule,
    ],
    templateUrl: './dictionary.component.html',
    styleUrl: './dictionary.component.scss'
})
export class DictionaryComponent extends BaseWidget<WeakObject[]> {

    // #region public properties

    public defaultBaseStyleClass: string = 'ws-dictionary';

    public defaultHeaderStyleClass: string = 'ws-dictionary-header';

    public defaultBodyStyleClass: string = 'ws-dictionary-body';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];

    public headerStyleClasses: string[] = [this.defaultHeaderStyleClass];

    public bodyStyleClasses: string[] = [this.defaultBodyStyleClass];

    public items$: BehaviorSubject<DictionaryItem[]> = new BehaviorSubject<DictionaryItem[]>([]);

    public typeOptions = DictionaryTypes;

    public objectForm: FormGroup = new FormGroup({});

    public currentType: DictionaryType = 'string';

    public typesControl = new FormControl(this.currentType);

    public newKey: string = '';

    public newKeyControl = new FormControl('', this._uniqueKeyValidator);

    public initialized: boolean = false;

    public booleanOptions: SelectItem[] = [
        { label: 'True', value: true },
        { label: 'False', value: false },
    ];
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters    
    
    public get items(): DictionaryItem[] {
        return Object.entries(this._value).map(([key, value]) => ({
            key,
            value,
            type: this._getDictType(value)
        }));
    }
    
    // #endregion getters/setters
    
    
    // #region standard inputs

    @Input() elementType = ElementType.DICTIONARY as const;

    @Input() headerStyles?: StyleGroup = {};

    @Input() bodyStyles?: StyleGroup = {};

    
    
    // #endregion standard inputs
    
    
    // #region get/set inputs
                       
    /* private _items: DictionaryItem[] = [];
    @Input()
    public get items(): DictionaryItem[] {
        return this._items;
    }
    public set items(value: DictionaryItem[]) {
        this._items = value;
        this.items$.next(value);
    } */

    private _value: WeakObject = {};
    @Input() 
    get value(): WeakObject {
        return this._value;
    }
    set value(value: WeakObject) {
        this._value = value;
        if(!this.initialized) {
            this.initialized = true;
        
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
        super(cd);
    }

    ngOnInit() {
        this.typesControl.valueChanges.subscribe((value: unknown) => {
            this.currentType = value as DictionaryType;
        });

        this.newKeyControl.valueChanges.subscribe((value: unknown) => {
            this.newKey = value as string;
        });

        this._updateObjectForm();

        
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    public addItem() {
        const defaultValue = this.currentType === 'boolean' ? false : 
            this.currentType === 'number' ? 0 : '';

        this.objectForm.addControl(this.newKey, new FormControl(this.newKey, this._uniqueKeyValidator), { emitEvent: false });
        this.objectForm.addControl(`${this.newKey}Value`, new FormControl(defaultValue, this._uniqueKeyValidator));

        this.newKeyControl.setValue('');
    }

    public updateKey(...args: unknown[]) {
        console.log('updateKey', args);
    }

    public updateValue(...args: unknown[]) {
        console.log('updateValue', args);
    }

    public deleteItem(item: DictionaryItem) {
        this.objectForm.removeControl(item.key);
        this.objectForm.removeControl(`${item.key}Value`);
        delete this._value[item.key];
        this.form?.patchValue(this._value);
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods

    private _updateObjectForm() {

        const formValue: Record<string, FormControl> = {};
        Object.entries(this.value).forEach(([key, value]) => {
            formValue[key] = new FormControl(key, this._uniqueKeyValidator);
            formValue[`${key}Value`] = new FormControl(value);
            
            formValue[key].valueChanges.pipe(debounceTime(300)).subscribe((newKey) => {
                const value = this._value[key];
                console.log('newKey', newKey);
                /* delete this._value[key];
                this._value[newKey] = value; */
            });

            formValue[`${key}Value`].valueChanges.pipe(debounceTime(300)).subscribe((newValue) => {
                this._value[key] = newValue;
            });
        });
        this.objectForm = new FormGroup(formValue);
        this.objectForm.valueChanges.subscribe((value) => {
            const obj = this._formValueToObject(value);
            this.form?.patchValue(obj);
        });
    }

    private _formValueToObject(valueObject: WeakObject): WeakObject {
        const newValue: WeakObject = {};

        Object.keys(valueObject).forEach((key) => {
            if(!key.includes('Value')) {
                const valueKey = `${key}Value`;
                newValue[key] = valueObject[valueKey] ?? '';
            }
        });

        return newValue;
    }

    private _getDictType(value: unknown): DictionaryType {
        if(isNumber(value)) {
            return 'number';
        }
        else if(isBoolean(value)) {
            return 'boolean';
        }
        return 'string';
    }

    private _uniqueKeyValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const keyUsed = this.items.some((item) => item.key === control.value);

            return keyUsed ? { keyInUse: { value: control.value } } : null;
        };
    }
    
    // #endregion private methods
    
    
}

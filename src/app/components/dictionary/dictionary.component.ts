import { CommonModule, KeyValue } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { BaseWidget } from '../base-widget';
import { DictionaryType, DictionaryTypes, ElementType, PPanelConfig, DictionaryItem, StyleGroup, WeakObject, DictionaryDefaults } from 'warskald-ui/models';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, FormRecord, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { isBoolean, isNumberArray, isString, isStringArray } from 'warskald-ui/type-guards';
import { isNumber } from 'lodash';
import { FormService, LoggableComponent, LogLevels } from 'warskald-ui/services';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SelectItem, TooltipOptions } from 'primeng/api';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InplaceModule } from 'primeng/inplace';
import { OverlayModule } from 'primeng/overlay';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BooleanOptions } from 'warskald-ui/common';
import { TooltipModule } from 'primeng/tooltip';
import { ChipsModule } from 'primeng/chips';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PanelAfterToggleEvent, PanelBeforeToggleEvent, PanelModule } from 'primeng/panel';

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
        ChipsModule,
        CommonModule,
        DropdownModule,
        FormsModule,
        InputGroupModule,
        InputGroupAddonModule,
        InputNumberModule,
        InplaceModule,
        InputTextModule,
        KeyFilterModule,
        OverlayPanelModule,
        PanelModule,
        ReactiveFormsModule,
        SelectButtonModule,
        ToggleButtonModule,
        TooltipModule,
    ],
    templateUrl: './dictionary.component.html',
    styleUrl: './dictionary.component.scss'
})
export class DictionaryComponent extends BaseWidget<WeakObject[]> {

    // #region public properties

    public defaultBaseStyleClass: string = 'ws-dict';

    public defaultHeaderStyleClass: string = 'ws-dict-header';

    public defaultBodyStyleClass: string = 'ws-dict-body';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];

    public headerStyleClasses: string[] = [this.defaultHeaderStyleClass];

    public bodyStyleClasses: string[] = [this.defaultBodyStyleClass];

    public items$: BehaviorSubject<DictionaryItem[]> = new BehaviorSubject<DictionaryItem[]>([]);

    public typeOptions = DictionaryTypes;

    public currentType: DictionaryType = 'string';

    public typesControl = new FormControl(this.currentType);

    //public newKey: string = '';

    public newKeyControl = new FormControl('', this.getKeyValidators(true));

    public newKeyTooltip: string = 'Enter a unique key for the new item';

    public tooltipOptions: TooltipOptions = {
        appendTo: 'body',
        showDelay: 300,
        tooltipPosition: 'left',
        escape: false,
    };

    public initialized: boolean = false;

    public booleanOptions = BooleanOptions;

    public items: DictionaryItem[] = [];
    
    public mappedKeys: Set<string> = new Set();

    public getErrorTooltip = FormService.getValidatorMsgTooltip;

    public anyRegex = /.*/;

    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters   
    
    // #endregion getters/setters
    
    
    // #region standard inputs

    @Input() elementType = ElementType.DICTIONARY as const;

    @Input() headerStyles?: StyleGroup = {};

    @Input() bodyStyles?: StyleGroup = {};

    @Input() value: WeakObject = {};

    @Input() options: PPanelConfig = {};

    @Input() keyLabel: string = 'Key';

    @Input() valueLabel: string = 'Value';

    @Input() keyTooltip: string = 'Enter a unique key for the property';

    @Input() valueTooltip: string = 'Enter a value for the property';

    @Input() usePanel?: boolean = false;

    @Input() panelOptions?: PPanelConfig = {};
    
    @Input() enableNewKeys: boolean = true;

    @Input() enableTypeSelection: boolean = true;

    @Input() enableEdit: boolean = true;

    @Input() collapsedChangeHandler(event: boolean): void {}

    @Input() onBeforeToggleHandler(event: PanelBeforeToggleEvent): void {}

    @Input() onAfterToggleHandler(event: PanelAfterToggleEvent): void {}

    
    
    // #endregion standard inputs
    
    
    // #region get/set inputs

    private _validTypeOptions?: DictionaryType[];
    @Input()
    get validTypeOptions(): DictionaryType[] | undefined {
        return this._validTypeOptions;
    }
    set validTypeOptions(value: DictionaryType[] | undefined) {
        this._validTypeOptions = value;
        if(value) {
            this.typeOptions = this.typeOptions.filter((type) => value.includes(type.value));
            if(value.length === 1) {
                this.typesControl.disable();
            }
        }
        else {
            this.typeOptions = DictionaryTypes;
        }
    }

    private _initialType?: DictionaryType;
    @Input()
    get initialType(): DictionaryType | undefined {
        return this._initialType;
    }
    set initialType(value: DictionaryType | undefined) {
        this._initialType = value;
        if(value) {

            if(!this.validTypeOptions || this.validTypeOptions.includes(value)) {
                this.currentType = value;
                this.typesControl.setValue(value);
            }
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

        FormService.addValidatorMsg('keyInUse', 'Key is already in use');

        this.newKeyControl.statusChanges.subscribe(() => {
            if(this.newKeyControl.invalid && !this.newKeyControl.pristine) {
                this.newKeyTooltip = FormService.getValidatorMsgTooltip(this.newKeyControl);
            }
            else {
                this.newKeyTooltip = 'Enter a unique key for the new item';
            }
        });
        this._updateObjectForm();

        
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    public getKeyValidators(newKey: boolean = false) {
        return [Validators.required, Validators.minLength(1), this._uniqueKeyValidator(this.items$, newKey)];
    }

    public addItem() {
        if(this.newKeyControl.valid && this.newKeyControl.value) {
            const defaultValue = DictionaryDefaults[this.currentType];
    
            this.addDictItem(this.newKeyControl.value, defaultValue, true);
    
            this.newKeyControl.reset('');
        }
    }

    public updateItem(item: DictionaryItem, isKey: boolean = false) {
        const { keyControl, valueControl, key } = item;

        if(isKey) {
            const newKey: string = keyControl.value;
            if(keyControl.valid) {
                item.key = newKey;
                this.mappedKeys.delete(key);
                this.mappedKeys.add(newKey);
                delete this.value[key];
                this.value[newKey] = item.value;
                this.form?.patchValue(this.value);
                this.items$.next(this.items);
            }
            else {
                keyControl.reset(key);
            }
            item.keyControl.disable();
        }
        else {
            const newValue = valueControl.value;
            item.value = newValue;
            this.value[key] = newValue;
            this.form?.patchValue(this.value);
            
            valueControl.disable();
        }
    }

    public cancelEdit(item: DictionaryItem, isKey: boolean = false) {
        if(isKey) {
            item.keyControl.reset(item.value);
            item.keyControl.disable();
        }
        else {
            item.valueControl.reset(item.value);
            item.valueControl.disable();
        }
    }

    public deleteItem(item: DictionaryItem) {
        this.items = this.items.filter((item) => item.key !== item.key);
        this.items$.next(this.items);

        delete this.value[item.key];
        this.mappedKeys.delete(item.key);
        this.form?.patchValue(this.value);
    }

    public editItem(item: DictionaryItem, isKey: boolean) {
        if(isKey) {
            item.keyControl.enable();
        }
        else {
            item.valueControl.enable();
        }
    }

    public addDictItem(key: string, value: unknown, emit: boolean = false): DictionaryItem {
        const keyControl = new FormControl(key, this.getKeyValidators());
        const valueControl = new FormControl(value);
        const type = this._getDictType(value);

        valueControl.disable();
        keyControl.disable();

        const dictItem: DictionaryItem = {
            key,
            value,
            type,
            keyControl,
            valueControl,
            tooltip: this.keyTooltip,
        };

        keyControl.statusChanges.subscribe(() => {
            if(keyControl.invalid && !keyControl.pristine && keyControl.value !== dictItem.key) {
                dictItem.tooltip = FormService.getValidatorMsgTooltip(keyControl);
            }
            else {
                dictItem.tooltip = this.keyTooltip;
            }
        });

        if(!this.mappedKeys.has(key)) {
            this.mappedKeys.add(key);
            this.items.push(dictItem);

            if(emit) {
                this.items$.next(this.items);
            }
        }

        return dictItem;
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods

    private _updateObjectForm() {
        this.items = [];
        this.objectForm = new FormRecord({});
        
        Object.entries(this.value).forEach(([key, value]) => {
            this.addDictItem(key, value);
        });

        this.items$.next(this.items);

        /* this.objectForm.valueChanges.subscribe((value) => {
            console.log('valueChanges', value);
        }); */
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
        else if(isStringArray(value)) {
            return 'string[]';
        }
        else if(isNumberArray(value)) {
            return 'number[]';
        }
        return 'string';
    }

    private _uniqueKeyValidator(items$: BehaviorSubject<DictionaryItem[]>, newKey: boolean = false): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const keyMatches = items$.value.filter((item) => {
                return item.keyControl.value === control.value;
            }).length;

            const keyUsed = newKey ? keyMatches > 0 : keyMatches > 1;

            return keyUsed ? { keyInUse: { value: control.value } } : null;
        };
    }
    
    // #endregion private methods
    
    
}

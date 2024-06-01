import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { MultiSelect, MultiSelectBlurEvent, MultiSelectChangeEvent, MultiSelectFilterEvent, MultiSelectFocusEvent, MultiSelectLazyLoadEvent, MultiSelectModule, MultiSelectRemoveEvent, MultiSelectSelectAllChangeEvent } from 'primeng/multiselect';
import { ComponentConfig, MultiSelectConfig, ElementType, GenericFunction, StyleGroup, WeakObject, PMultiSelectConfig } from 'warskald-ui/models';
import { initStyleGroups, LoggableComponent, LogLevels } from 'warskald-ui/services';
import { isWeakObject } from 'warskald-ui/type-guards';
import { BaseWidget } from '../base-widget';

@LoggableComponent({
    LOCAL_ID: 'MultiSelectComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-multi-select',
    standalone: true,
    imports: [
        MultiSelectModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MultiSelectComponent),
            multi: true
        }
    ],
    templateUrl: './multi-select.component.html',
    styleUrl: './multi-select.component.scss'
})
export class MultiSelectComponent extends BaseWidget<unknown> implements MultiSelectConfig, ControlValueAccessor {

    // #region public properties

    public defaultBaseStyleClass: string = 'app-multi-select w-full';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];

    [key: string]: unknown;

    // #endregion public properties


    // #region private properties

    // #endregion private properties


    // #region getters/setters

    // #endregion getters/setters


    // #region standard inputs
    @Input() elementType = ElementType.MULTI_SELECT as const;

    @Input() value: string[] = [];
    
    @Input() options: PMultiSelectConfig = {};

    @Input() optionValues: SelectItem[] = [];

    @Input() filterValue?: string;

    @Input() onMouseEnterHandler(event: unknown): void {}

    @Input() onChangeHandler(event: MultiSelectChangeEvent): void {}

    @Input() onFilterHandler(event: MultiSelectFilterEvent): void {}

    @Input() onFocusHandler(event: MultiSelectFocusEvent): void {}

    @Input() onBlurHandler(event: MultiSelectBlurEvent): void {}

    @Input() onClickHandler(event: Event): void {}

    @Input() onClearHandler(event: void): void {}

    @Input() onPanelShowHandler(event: void): void {}

    @Input() onPanelHideHandler(event: void): void {}

    @Input() onLazyLoadHandler(event: MultiSelectLazyLoadEvent): void {}

    @Input() onRemoveHandler(event: MultiSelectRemoveEvent): void {}

    @Input() onSelectAllChangeHandler(event: MultiSelectSelectAllChangeEvent): void {}

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

    ngOnInit() {
        initStyleGroups.bind(this)();
        this.cd.detectChanges();
        this._initializeOptions();

        this.innerControl = new FormControl(this.value);
        this.innerControl.valueChanges.subscribe((value) => {
            this.onChanged(value);
            this.onTouched(value);
            this.writeValue(value);
        });
    }

    // #endregion constructor and lifecycle hooks


    // #region public methods

    // #endregion public methods


    // #region protected methods

    // #endregion protected methods


    // #region private methods

    private _initializeOptions() {
        const baseOptions: PMultiSelectConfig = {
            styleClass: this.baseStyleClasses.join(' '),
            filter: true,
            tabindex: 0,
            appendTo: 'body',
            showToggleAll: true,
            optionGroupLabel: 'label',
            optionGroupChildren: 'items',
            showHeader: true,
            scrollHeight: '200px',
            filterMatchMode: 'contains',
            tooltipPosition: 'right',
            tooltipPositionStyle: 'absolute',
            autofocusFilter: true,
            display: 'comma',
            autocomplete: 'off',
            autoOptionFocus: true,
        };

        if(isWeakObject(this.baseStyles?.style)) {
            baseOptions.style = this.baseStyles.style;
        
        }

        const options = Object.assign({}, baseOptions, this.options);
        console.log('OPTIONS',options);
        this.options = options;
    }
    // #endregion private methods


}

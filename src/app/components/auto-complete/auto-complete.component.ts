import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { AutoComplete, AutoCompleteCompleteEvent, AutoCompleteDropdownClickEvent, AutoCompleteLazyLoadEvent, AutoCompleteModule, AutoCompleteSelectEvent, AutoCompleteUnselectEvent } from 'primeng/autocomplete';
import { ComponentConfig, AutoCompleteConfig, ElementType, GenericFunction, StyleGroup, WeakObject, PAutoCompleteConfig } from 'warskald-ui/models';
import { initStyleGroups, LoggableComponent, LogLevels } from 'warskald-ui/services';
import { BaseWidget } from '../base-widget';
import { isString } from 'lodash';

/**
 * Widget that implements a PrimeNG AutoComplete component.
 */
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
    templateUrl: './auto-complete.component.html',
    styleUrl: './auto-complete.component.scss'
})
export class AutoCompleteComponent extends BaseWidget<unknown> implements AutoCompleteConfig {

    // #region public properties

    /**
     * The default base style class for the component. This gets merged with incoming style classes.
     */
    public defaultBaseStyleClass: string = 'app-auto-complete';

    /**
     * The combined base style classes for the component.
     */
    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];

    /**
     * The suggestions for the autocomplete.
     */
    public suggestions: WeakObject[] = [];


    [key: string]: unknown;

    // #endregion public properties


    // #region private properties

    // #endregion private properties


    // #region getters/setters

    // #endregion getters/setters


    // #region standard inputs

    /**
     * The type of element to render.
     */
    @Input() elementType = ElementType.AUTO_COMPLETE as const;

    /**
     * Value input to keep ngComponentOutlet happy
     */
    @Input() value: unknown = undefined;
    
    /**
     * The configuration object for the component.
     */
    @Input() options: PAutoCompleteConfig = {};

    @Input() data: WeakObject[] = [];

    /**
     * Provided function to handle generating the autocomplete suggestions.
     * 
     * @param event - The event object for the complete event. 
     * @see {@link AutoCompleteCompleteEvent}
     */
    @Input() completeMethodHandler(event: AutoCompleteCompleteEvent): void {}

    /**
     * Provided function to handle the select event.
     * 
     * @param event - The event object for the select event. 
     * @see {@link AutoCompleteSelectEvent}
     */
    @Input() onSelectHandler(event: AutoCompleteSelectEvent): void {}

    /**
     * Provided function to handle the unselect event.
     * 
     * @param event - The event object for the unselect event.
     * @see {@link AutoCompleteUnselectEvent}
     */
    @Input() onUnselectHandler(event: AutoCompleteUnselectEvent): void {}

    /**
     * Provided function to handle the focus event.
     * 
     * @param event - The event object for the focus event.
     * @see {@link Event}
     */
    @Input() onFocusHandler(event: Event): void {}

    /**
     * Provided function to handle the blur event.
     * 
     * @param event - The event object for the blur event.
     * @see {@link Event}
     */
    @Input() onBlurHandler(event: Event): void {}

    /**
     * Provided function to handle the dropdown click event.
     * 
     * @param event - The event object for the dropdown click event.
     * @see {@link AutoCompleteDropdownClickEvent}
     */
    @Input() onDropdownClickHandler(event: AutoCompleteDropdownClickEvent): void {}

    /**
     * Provided function to handle the key up event.
     * 
     * @param event - The event object for the key up event.
     * @see {@link KeyboardEvent}
     */
    @Input() onKeyUpHandler(event: KeyboardEvent): void {}

    /**
     * Provided function to handle when the overlay panel is shown.
     * 
     * @param event - The event object passed by the onShow event.
     * @see {@link Event}
     */
    @Input() onShowHandler(event: Event): void {}

    /**
     * Provided function to handle when the overlay panel is hidden.
     * 
     * @param event - The event object passed by the onHide event.
     * @see {@link Event}
     */
    @Input() onHideHandler(event: Event): void {}

    /**
     * Provided function to handle when lazy loading data.
     * 
     * @param event - The event object passed when using lazy loading.
     * @see {@link AutoCompleteLazyLoadEvent}
     */
    @Input() onLazyLoadHandler(event: AutoCompleteLazyLoadEvent): void {}


    // #endregion standard inputs


    // #region get/set inputs

    // #endregion get/set inputs


    // #region outputs, emitters, and event listeners

    // #endregion outputs, emitters, and event listeners


    // #region viewchildren and contentchildren
    
    /**
     * Reference to the autocomplete component.
     */
    @ViewChild('autoCompleteRef') autoCompleteRef?: AutoComplete;

    // #endregion viewchildren and contentchildren


    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
    ) {
        super(cd);
    }

    // #endregion constructor and lifecycle hooks


    // #region public methods

    public completeHandler(event: AutoCompleteCompleteEvent) {
        const { query } = event;

        const optionValue = this.options?.optionValue || 'value';
        
        this.suggestions = this.data.filter((item) => {
            const key = isString(optionValue) ? optionValue : optionValue(item);
            const value = item[key];
            return isString(value) && value.toLowerCase().includes(query.toLowerCase());
        });
        
    }

    // #endregion public methods


    // #region protected methods

    // #endregion protected methods


    // #region private methods

    // #endregion private methods


}

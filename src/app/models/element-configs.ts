import { FormControl, FormGroup } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { CalendarMonthChangeEvent, CalendarYearChangeEvent } from 'primeng/calendar';
import { ColorPickerChangeEvent } from 'primeng/colorpicker';
import { InputNumberInputEvent } from 'primeng/inputnumber';
import { InputSwitchChangeEvent } from 'primeng/inputswitch';
import { MultiSelectBlurEvent, MultiSelectChangeEvent, MultiSelectFilterEvent, MultiSelectFocusEvent, MultiSelectLazyLoadEvent, MultiSelectRemoveEvent, MultiSelectSelectAllChangeEvent } from 'primeng/multiselect';
import { PanelAfterToggleEvent, PanelBeforeToggleEvent } from 'primeng/panel';
import { RadioButtonClickEvent } from 'primeng/radiobutton';
import { SelectButtonChangeEvent, SelectButtonOptionClickEvent } from 'primeng/selectbutton';
import { SliderChangeEvent, SliderSlideEndEvent } from 'primeng/slider';
import { ToggleButtonChangeEvent } from 'primeng/togglebutton';
import { ElementType } from './element-types';
import { ButtonAction, DictionaryItem, DictionaryType, FunctionMap, GenericFunction, WeakObject } from './general';
import * as PrimeConfigs from './prime_configs/_index';
import { StyleGroup } from './style-types';
import { TreeFilterEvent, TreeNodeUnSelectEvent, TreeNodeSelectEvent } from 'primeng/tree';
import { TreeSelectNodeExpandEvent, TreeSelectNodeCollapseEvent } from 'primeng/treeselect';
import { AccordionTabCloseEvent, AccordionTabOpenEvent } from 'primeng/accordion';
import { AutoCompleteCompleteEvent, AutoCompleteSelectEvent, AutoCompleteUnselectEvent, AutoCompleteDropdownClickEvent, AutoCompleteLazyLoadEvent } from 'primeng/autocomplete';
import { BehaviorSubject } from 'rxjs';

/**
 * Represents an element to render on a page
 */
export interface BaseComponentConfig {

    LOCAL_ID?: string;

    canLog?: boolean;

    localLogLevel?: number;

    label?: string;

    actionID?: string;

    /**
     * The type of element to render
     */
    elementType: ElementType; // @todo: add type/enum later

    /**
     * The id of the element
     */
    id: string;

    /**
     * The content to render in the element
     */
    value?: unknown;

    /**
     * Styles and classes to apply to the element
     */
    baseStyles?: StyleGroup;

    /**
     * Styles and classes to use for the layout of the element
     */
    layoutStyles?: StyleGroup;

    /**
     * The syles to apply to the item label
     */
    labelStyles?: StyleGroup;

    /**
     * The options to apply to the element
     */
    options?: WeakObject;

    /**
     * The children of the element
     */
    children?: ComponentConfig[];

    disabled?: boolean;

    [key: string]: unknown;
}

export interface FormElementConfig extends BaseComponentConfig {
    hasForm: true;
    hasFormGroup?: boolean;
    //value: unknown;
    form?: FormControl | FormGroup;
    onChanged?: GenericFunction<void>;
    onTouched?: GenericFunction<void>;
}

/**
 * Represents a block of text meant to be rendered as an illuminated text block.
 */
export interface TextBlockConfig extends BaseComponentConfig {
    elementType: ElementType.TEXT_BLOCK;
    value: string;
    illuminated?: boolean;
    illuminatedColor?: string;
    illuminatedBorder?: string;
    escapeHTML?: boolean;
    bodyStyles?: StyleGroup;
}

export interface ContainerConfig extends FormElementConfig {
    elementType: ElementType.CONTAINER | ElementType.COMPONENT;
    elements: ComponentConfig[];
    actionMap?: FunctionMap;
}

export interface WsImageConfig extends BaseComponentConfig {
    elementType: ElementType.IMAGE;
    src?: string;
}

export interface ButtonTemplate {
    id: string,
    label?: string;
    action?: ButtonAction;
    icon?: string;
    iconPosition?: string;
    iconStyles?: StyleGroup;
    styles?: StyleGroup;
    disabled?: boolean;

    [key: string]: unknown;
}

export interface ButtonGroupConfig extends BaseComponentConfig {
    elementType: ElementType.BUTTON_GROUP;
    buttons: ButtonTemplate[];
    buttonStyles?: StyleGroup;
}

export interface HtmlEditorConfig extends FormElementConfig {
    elementType: ElementType.HTML_EDITOR;
    value: string;
}

export interface CheckboxConfig extends FormElementConfig {
    elementType: ElementType.CHECKBOX;
    value: boolean;
}

export interface DropdownConfig extends FormElementConfig {
    elementType: ElementType.DROPDOWN;
    optionValues: SelectItem[];
    options?: PrimeConfigs.PDropdownConfig;
}

export interface MultiSelectConfig extends FormElementConfig {
    elementType: ElementType.MULTI_SELECT;
    value?: unknown[];
    optionValues?: SelectItem[];
    options?: PrimeConfigs.PMultiSelectConfig;
    onClickHandler?: (event: Event) => void;
    onMouseEnterHandler?: (event: unknown) => void;
    onChangeHandler?: (event: MultiSelectChangeEvent) => void;
    onFilterHandler?: (event: MultiSelectFilterEvent) => void;
    onFocusHandler?: (event: MultiSelectFocusEvent) => void;
    onBlurHandler?: (event: MultiSelectBlurEvent) => void;
    onClearHandler?: (event: void) => void;
    onPanelShowHandler?: (event: void) => void;
    onPanelHideHandler?: (event: void) => void;
    onLazyLoadHandler?: (event: MultiSelectLazyLoadEvent) => void;
    onRemoveHandler?: (event: MultiSelectRemoveEvent) => void;
    onSelectAllChangeHandler?: (event: MultiSelectSelectAllChangeEvent) => void;
}

export interface AutoCompleteConfig extends FormElementConfig {
    elementType: ElementType.AUTO_COMPLETE;
    options?: PrimeConfigs.PAutoCompleteConfig;

}


export interface InputTextConfig extends FormElementConfig {
    elementType: ElementType.INPUT_TEXT;
    options?: PrimeConfigs.PInputTextConfig;
    externalListener$?: BehaviorSubject<string>;
    disabled?: boolean;
}


export interface InputNumberConfig extends FormElementConfig {
    elementType: ElementType.INPUT_NUMBER;
    options?: PrimeConfigs.PInputNumberConfig;
    onInputHandler?: (event: InputNumberInputEvent) => void;
    onFocusHandler?: (event: Event) => void;
    onBlurHandler?: (event: Event) => void;
    onKeyDownHandler?: (event: KeyboardEvent) => void;
    onClearHandler?: (event: void) => void;
}


export interface TextAreaConfig extends BaseComponentConfig {
    elementType: ElementType.TEXT_AREA;
    options?: PrimeConfigs.PInputTextAreaConfig;

}


export interface InputSwitchConfig extends FormElementConfig {
    elementType: ElementType.INPUT_SWITCH;
    options?: PrimeConfigs.PInputSwitchConfig;
    onChangeHandler?: (event: InputSwitchChangeEvent) => void;

}


export interface KnobConfig extends FormElementConfig {
    elementType: ElementType.KNOB;
    options?: PrimeConfigs.PKnobConfig;
    onChangeHandler?: (event: number) => void;

}


export interface RadioButtonConfig extends BaseComponentConfig {
    elementType: ElementType.RADIO_BUTTON;
    options?: PrimeConfigs.PRadioButtonConfig;
    onClickHandler?: (event: RadioButtonClickEvent) => void;
    onFocusHandler?: (event: Event) => void;
    onBlurHandler?: (event: Event) => void;

}


export interface SelectButtonConfig extends FormElementConfig {
    elementType: ElementType.SELECT_BUTTON;
    options?: PrimeConfigs.PSelectButtonConfig;
    onOptionClickHandler?: (event: SelectButtonOptionClickEvent) => void;
    onChangeHandler?: (event: SelectButtonChangeEvent) => void;

}


export interface SliderConfig extends FormElementConfig {
    elementType: ElementType.SLIDER;
    options?: PrimeConfigs.PSliderConfig;
    onChangeHandler?: (event: SliderChangeEvent) => void;
    onSlideEndHandler?: (event: SliderSlideEndEvent) => void;

}


export interface ToggleButtonConfig extends FormElementConfig {
    elementType: ElementType.TOGGLE_BUTTON;
    options?: PrimeConfigs.PToggleButtonConfig;
    onChangeHandler?: (event: ToggleButtonChangeEvent) => void;

}


export interface SplitButtonConfig extends BaseComponentConfig {
    elementType: ElementType.SPLIT_BUTTON;
    options?: PrimeConfigs.PSplitButtonConfig;
    onClickHandler?: (event: MouseEvent) => void;
    onDropdownClickHandler?: (event: MouseEvent) => void;

}


export interface ColorPickerConfig extends FormElementConfig {
    elementType: ElementType.COLOR_PICKER;
    options?: PrimeConfigs.PColorPickerConfig;
    onChangeHandler?: (event: ColorPickerChangeEvent) => void;
    onShowHandler?: (event: unknown) => void;
    onHideHandler?: (event: unknown) => void;
}

export interface CalendarConfig extends FormElementConfig {
    elementType: ElementType.CALENDAR;
    options?: PrimeConfigs.PCalendarConfig;

    onFocusHandler?: (event: Event) => void;
    onBlurHandler?: (event: Event) => void;
    onCloseHandler?: (event: AnimationEvent) => void;
    onSelectHandler?: (event: Date) => void;
    onClearHandler?: (event: unknown) => void;
    onInputHandler?: (event: unknown) => void;
    onTodayClickHandler?: (event: Date) => void;
    onClearClickHandler?: (event: unknown) => void;
    onMonthChangeHandler?: (event: CalendarMonthChangeEvent) => void;
    onYearChangeHandler?: (event: CalendarYearChangeEvent) => void;
    onClickOutsideHandler?: (event: unknown) => void;
    onShowHandler?: (event: unknown) => void;}

export interface ButtonConfig extends BaseComponentConfig {
    elementType: ElementType.BUTTON;
    options?: PrimeConfigs.PButtonConfig;

    onClickHandler?: (event: MouseEvent) => void;
    onFocusHandler?: (event: FocusEvent) => void;
    onBlurHandler?: (event: FocusEvent) => void;
}


export interface PanelConfig extends FormElementConfig {
    elementType: ElementType.PANEL;
    options?: PrimeConfigs.PPanelConfig;
    headerContent?: ComponentConfig[];
    content?: ComponentConfig[];
    footerContent?: ComponentConfig[];
    
    collapsedChangeHandler?: (event: boolean) => void;
    onBeforeToggleHandler?: (event: PanelBeforeToggleEvent) => void;
    onAfterToggleHandler?: (event: PanelAfterToggleEvent) => void;
}


export interface TreeSelectConfig extends FormElementConfig {
    elementType: ElementType.TREE_SELECT;
    options?: PrimeConfigs.PTreeSelectConfig;

    onNodeExpandHandler?: (event: TreeSelectNodeExpandEvent) => void;
    onNodeCollapseHandler?: (event: TreeSelectNodeCollapseEvent) => void;
    onShowHandler?: (event: Event) => void;
    onHideHandler?: (event: Event) => void;
    onClearHandler?: (event: unknown) => void;
    onFilterHandler?: (event: TreeFilterEvent) => void;
    onNodeUnselectHandler?: (event: TreeNodeUnSelectEvent) => void;
    onNodeSelectHandler?: (event: TreeNodeSelectEvent) => void;
}


export interface AccordionConfig extends BaseComponentConfig {
    elementType: ElementType.ACCORDION;
    options?: PrimeConfigs.PAccordionConfig;

    onCloseHandler?: (event: AccordionTabCloseEvent) => void;
    onOpenHandler?: (event: AccordionTabOpenEvent) => void;
}


export interface AutoCompleteConfig extends FormElementConfig {
    elementType: ElementType.AUTO_COMPLETE;
    options?: PrimeConfigs.PAutoCompleteConfig;

    completeMethodHandler?: (event: AutoCompleteCompleteEvent) => void;
    onSelectHandler?: (event: AutoCompleteSelectEvent) => void;
    onUnselectHandler?: (event: AutoCompleteUnselectEvent) => void;
    onFocusHandler?: (event: Event) => void;
    onBlurHandler?: (event: Event) => void;
    onDropdownClickHandler?: (event: AutoCompleteDropdownClickEvent) => void;
    onKeyUpHandler?: (event: KeyboardEvent) => void;
    onShowHandler?: (event: Event) => void;
    onHideHandler?: (event: Event) => void;
    onLazyLoadHandler?: (event: AutoCompleteLazyLoadEvent) => void;
}

export interface GeneralComponentConfig extends BaseComponentConfig {
    elementType: ElementType.GENERAL;
}

export interface ClickableListConfig extends BaseComponentConfig {
    elementType: ElementType.CLICKABLE_LIST;
    value: string[];
    useRipple?: boolean;
    clickHandler?: GenericFunction<void>;
    orientation?: 'horizontal' | 'vertical';
}

export interface CharMap {
    char: string;
    decimal?: number;
    hex?: string;
    tooltip?: string;
}

export interface CustomKeysConfig extends FormElementConfig {
    elementType: ElementType.CUSTOM_KEYS;
    attachTo?: string;
    options?: PrimeConfigs.PButtonConfig;
    charMap?: CharMap[];
    icon?: string;
    panelStyles?: StyleGroup;
    panelBodyStyles?: StyleGroup;
    panelCharButtonStyles?: StyleGroup;
    panelCharTextStyles?: StyleGroup;
}

export interface CustomCharAction {
    target: string;
    char: string;
}

export interface StepperConfig extends BaseComponentConfig {
    elementType: ElementType.STEPPER;
    options?: PrimeConfigs.PStepperConfig;
    onClickHandler?: GenericFunction<void>;
    activeStepChangeHandler?: GenericFunction<void>;
    children?: ContainerConfig[];
}

export interface DictionaryConfig extends FormElementConfig {
    elementType: ElementType.DICTIONARY;
    value?: WeakObject;
    headerStyles?: StyleGroup;
    bodyStyles?: StyleGroup;
    keyLabel?: string;
    valueLabel?: string;
    keyTooltip?: string;
    valueTooltip?: string;
    usePanel?: boolean;
    options?: PrimeConfigs.PPanelConfig;
    validTypeOptions?: DictionaryType[];
    enableNewKeys?: boolean;
    enableTypeSelection?: boolean;
    initialType?: DictionaryType;
    enableEdit?: boolean;
}

/**
 * Union type of all possible element configs
 */
export type ComponentConfig = 
    AccordionConfig |
    AutoCompleteConfig |
    ButtonConfig |
    ButtonGroupConfig |
    CalendarConfig |
    CheckboxConfig |
    ClickableListConfig |
    ColorPickerConfig |
    ContainerConfig |
    CustomKeysConfig |
    DictionaryConfig |
    DropdownConfig |
    FormElementConfig |
    GeneralComponentConfig |
    HtmlEditorConfig |
    InputNumberConfig |
    InputSwitchConfig |
    InputTextConfig |
    KnobConfig |
    MultiSelectConfig |
    PanelConfig |
    RadioButtonConfig |
    SelectButtonConfig |
    SliderConfig |
    SplitButtonConfig |
    TextAreaConfig |
    TextBlockConfig |
    ToggleButtonConfig |
    TreeSelectConfig |
    WsImageConfig;

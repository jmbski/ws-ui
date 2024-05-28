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
import { ButtonAction, FunctionMap, GenericFunction, WeakObject } from './general';
import * as PrimeConfigs from './prime_configs/_index';
import { StyleGroup } from './style-types';
import { TreeFilterEvent, TreeNodeUnSelectEvent, TreeNodeSelectEvent } from 'primeng/tree';
import { TreeSelectNodeExpandEvent, TreeSelectNodeCollapseEvent } from 'primeng/treeselect';
import { AccordionTabCloseEvent, AccordionTabOpenEvent } from 'primeng/accordion';
import { AutoCompleteCompleteEvent, AutoCompleteSelectEvent, AutoCompleteUnselectEvent, AutoCompleteDropdownClickEvent, AutoCompleteLazyLoadEvent } from 'primeng/autocomplete';

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
     * The options to apply to the element
     */
    options?: WeakObject;

    /**
     * The children of the element
     */
    children?: ComponentConfig[];

    /**
     * Styles and classes to use for the layout of the element
     */
    layoutStyles?: StyleGroup;

    [key: string]: unknown;
}

export interface FormElementConfig extends BaseComponentConfig {
    hasForm: true;
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
    value: unknown[];
    optionValues: SelectItem[];
    options: PrimeConfigs.PMultiSelectConfig;
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


export interface InputTextConfig extends BaseComponentConfig {
    elementType: ElementType.INPUT_TEXT;
    options?: PrimeConfigs.PInputTextConfig;

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


export interface PanelConfig extends BaseComponentConfig {
    elementType: ElementType.PANEL;
    options?: PrimeConfigs.PPanelConfig;

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

export interface IpaKeyboardConfig extends FormElementConfig {
    elementType: ElementType.IPA_KEYBOARD;
    attachTo?: string;
}

export interface IpaAction {
    target: string;
    char: string;
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
    ColorPickerConfig |
    ContainerConfig |
    DropdownConfig |
    FormElementConfig |
    HtmlEditorConfig |
    InputNumberConfig |
    InputSwitchConfig |
    InputTextConfig |
    IpaKeyboardConfig |
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
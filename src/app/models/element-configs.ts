import { SelectItem } from 'primeng/api';
import { ElementType } from './element-types';
import { BaseComponentConfig, ButtonAction, FormElementConfig } from './page-elements';
import { StyleGroup } from './style-types';
import * as PrimeConfigs from './prime_configs/_index';
import { InputNumberInputEvent } from 'primeng/inputnumber';
import { InputSwitchChangeEvent } from 'primeng/inputswitch';
import { MultiSelectChangeEvent, MultiSelectFilterEvent, MultiSelectFocusEvent, MultiSelectBlurEvent, MultiSelectLazyLoadEvent, MultiSelectRemoveEvent, MultiSelectSelectAllChangeEvent } from 'primeng/multiselect';
import { RadioButtonClickEvent } from 'primeng/radiobutton';
import { SelectButtonOptionClickEvent, SelectButtonChangeEvent } from 'primeng/selectbutton';
import { SliderChangeEvent, SliderSlideEndEvent } from 'primeng/slider';
import { ToggleButtonChangeEvent } from 'primeng/togglebutton';
import { ColorPickerChangeEvent } from 'primeng/colorpicker';
import { CalendarMonthChangeEvent, CalendarYearChangeEvent } from 'primeng/calendar';


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

export interface ContainerConfig extends BaseComponentConfig {
    elementType: ElementType.CONTAINER;
    elements?: BaseComponentConfig[];
}

export interface WsImageConfig extends BaseComponentConfig {
    elementType: ElementType.IMAGE;
    src?: string;
}

export interface ButtonConfig {
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
    buttons: ButtonConfig[];
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
/**
 * Union type of all possible element configs
 */
export type ComponentConfig = 
    AutoCompleteConfig |
    ButtonGroupConfig |
    CalendarConfig |
    CheckboxConfig |
    ColorPickerConfig |
    ContainerConfig |
    DropdownConfig |
    HtmlEditorConfig |
    InputNumberConfig |
    InputSwitchConfig |
    InputTextConfig |
    KnobConfig |
    MultiSelectConfig |
    RadioButtonConfig |
    SelectButtonConfig |
    SliderConfig |
    SplitButtonConfig |
    TextAreaConfig |
    TextBlockConfig |
    ToggleButtonConfig |
    WsImageConfig;
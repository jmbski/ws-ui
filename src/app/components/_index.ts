import { AccordionComponent } from './accordion/accordion.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { BlockableUiComponent } from './blockable-ui/blockable-ui.component';
import { ButtonComponent } from './button/button.component';
import { ButtonGroupComponent } from './button-group/button-group.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DynamicComponent } from './dynamic/dynamic.component';
import { ElementRendererComponent } from './element-renderer/element-renderer.component';
import { ElementType } from 'warskald-ui/models';
import { GeneralComponent } from './general/general.component';
import { HtmlEditorComponent } from './html-editor/html-editor.component';
import { ImageComponent } from './image/image.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { InputSwitchComponent } from './input-switch/input-switch.component';
import { InputTextComponent } from './input-text/input-text.component';
import { KnobComponent } from './knob/knob.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { NavLogoComponent } from './nav-logo/nav-logo.component';
import { PageLayoutComponent } from './page-layout/page-layout.component';
import { PanelComponent } from './panel/panel.component';
import { PullToRefreshComponent } from './pull-to-refresh/pull-to-refresh.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { SelectButtonComponent } from './select-button/select-button.component';
import { SliderComponent } from './slider/slider.component';
import { SplitButtonComponent } from './split-button/split-button.component';
import { SvgComponent } from './svg/svg.component';
import { TabbedResponseTableComponent } from './tabbed-response-table/tabbed-response-table.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { TextBlockComponent } from './text-block/text-block.component';
import { ToggleButtonComponent } from './toggle-button/toggle-button.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { TreeSelectComponent } from './tree-select/tree-select.component';
import { Type } from '@angular/core';
import { WsTableComponent } from './ws-table/_index';

export * from './accordion/accordion.component';
export * from './auto-complete/auto-complete.component';
export * from './blockable-ui/blockable-ui.component';
export * from './button-group/button-group.component';
export * from './button/button.component';
export * from './calendar/calendar.component';
export * from './checkbox/checkbox.component';
export * from './color-picker/color-picker.component';
export * from './dropdown/dropdown.component';
export * from './dynamic/dynamic.component';
export * from './element-renderer/element-renderer.component';
export * from './general/general.component';
export * from './html-editor/html-editor.component';
export * from './image/image.component';
export * from './input-number/input-number.component';
export * from './input-switch/input-switch.component';
export * from './input-text/input-text.component';
export * from './knob/knob.component';
export * from './menu-bar/menu-bar.component';
export * from './multi-select/multi-select.component';
export * from './nav-logo/nav-logo.component';
export * from './page-layout/page-layout.component';
export * from './panel/panel.component';
export * from './pull-to-refresh/pull-to-refresh.component';
export * from './radio-button/radio-button.component';
export * from './select-button/select-button.component';
export * from './slider/slider.component';
export * from './split-button/split-button.component';
export * from './svg/svg.component';
export * from './tabbed-response-table/tabbed-response-table.component';
export * from './text-area/text-area.component';
export * from './text-block/text-block.component';
export * from './toggle-button/toggle-button.component';
export * from './top-nav/top-nav.component';
export * from './tree-select/tree-select.component';
export * from './ws-table/_index';
export const WsComponentMap: Record<string, Type<unknown>> = {
    AccordionComponent,
    AutoCompleteComponent,
    BlockableUiComponent,
    ButtonComponent,
    ButtonGroupComponent,
    CalendarComponent,
    CheckboxComponent,
    ColorPickerComponent,
    DropdownComponent,
    DynamicComponent,
    ElementRendererComponent,
    GeneralComponent,
    HtmlEditorComponent,
    ImageComponent,
    InputNumberComponent,
    InputSwitchComponent,
    InputTextComponent,
    KnobComponent,
    MenuBarComponent,
    MultiSelectComponent,
    NavLogoComponent,
    PageLayoutComponent,
    PanelComponent,
    PullToRefreshComponent,
    RadioButtonComponent,
    SelectButtonComponent,
    SliderComponent,
    SplitButtonComponent,
    SvgComponent,
    TabbedResponseTableComponent,
    TextAreaComponent,
    TextBlockComponent,
    ToggleButtonComponent,
    TopNavComponent,
    TreeSelectComponent,
    WsTableComponent,
    [ElementType.ACCORDION]: AccordionComponent,
    [ElementType.AUTO_COMPLETE]: AutoCompleteComponent,
    [ElementType.BUTTON]: ButtonComponent,
    [ElementType.BUTTON_GROUP]: ButtonGroupComponent,
    [ElementType.CALENDAR]: CalendarComponent,
    [ElementType.CHECKBOX]: CheckboxComponent,
    [ElementType.COLOR_PICKER]: ColorPickerComponent,
    [ElementType.COMPONENT]: ElementRendererComponent,
    [ElementType.CONTAINER]: ElementRendererComponent,
    [ElementType.DROPDOWN]: DropdownComponent,
    [ElementType.GENERAL]: GeneralComponent,
    [ElementType.HTML_EDITOR]: HtmlEditorComponent,
    [ElementType.IMAGE]: ImageComponent,
    [ElementType.INPUT_NUMBER]: InputNumberComponent,
    [ElementType.INPUT_SWITCH]: InputSwitchComponent,
    [ElementType.INPUT_TEXT]: InputTextComponent,
    [ElementType.KNOB]: KnobComponent,
    [ElementType.MULTI_SELECT]: MultiSelectComponent,
    [ElementType.PANEL]: PanelComponent,
    [ElementType.RADIO_BUTTON]: RadioButtonComponent,
    [ElementType.SELECT_BUTTON]: SelectButtonComponent,
    [ElementType.SLIDER]: SliderComponent,
    [ElementType.SPLIT_BUTTON]: SplitButtonComponent,
    [ElementType.TEXT_AREA]: TextAreaComponent,
    [ElementType.TEXT_BLOCK]: TextBlockComponent,
    [ElementType.TOGGLE_BUTTON]: ToggleButtonComponent,
    [ElementType.TREE_SELECT]: TreeSelectComponent,
};
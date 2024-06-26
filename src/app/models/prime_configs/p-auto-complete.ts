import { ElementRef, TemplateRef } from '@angular/core';
import { ScrollerOptions, OverlayOptions } from 'primeng/api';

export interface PAutoCompleteConfig {
    minLength?: number;
    delay?: number;
    style?: { [klass: string]: unknown } | null | undefined;
    panelStyle?: { [klass: string]: unknown } | null | undefined;
    styleClass?: string | undefined;
    panelStyleClass?: string | undefined;
    inputStyle?: { [klass: string]: unknown } | null | undefined;
    inputId?: string | undefined;
    inputStyleClass?: string | undefined;
    placeholder?: string | undefined;
    readonly?: boolean | undefined;
    disabled?: boolean | undefined;
    scrollHeight?: string;
    lazy?: boolean;
    virtualScroll?: boolean | undefined;
    virtualScrollItemSize?: number | undefined;
    virtualScrollOptions?: ScrollerOptions | undefined;
    maxlength?: number | undefined;
    name?: string | undefined;
    required?: boolean | undefined;
    size?: number | undefined;
    appendTo?: HTMLElement | ElementRef | TemplateRef<unknown> | string | null | undefined | unknown;
    autoHighlight?: boolean | undefined;
    forceSelection?: boolean | undefined;
    type?: string;
    autoZIndex?: boolean;
    baseZIndex?: number;
    ariaLabel?: string | undefined;
    dropdownAriaLabel?: string | undefined;
    ariaLabelledBy?: string | undefined;
    dropdownIcon?: string | undefined;
    unique?: boolean;
    group?: boolean | undefined;
    completeOnFocus?: boolean;
    showClear?: boolean;
    field?: string | undefined;
    dropdown?: boolean | undefined;
    showEmptyMessage?: boolean | undefined;
    dropdownMode?: string;
    multiple?: boolean | undefined;
    tabindex?: number | undefined;
    dataKey?: string | undefined;
    emptyMessage?: string | undefined;
    showTransitionOptions?: string;
    hideTransitionOptions?: string;
    autofocus?: boolean | undefined;
    autocomplete?: string;
    optionGroupChildren?: string | undefined;
    optionGroupLabel?: string | undefined;
    overlayOptions?: OverlayOptions | undefined;
    optionLabel?: string | ((item: unknown) => string) | undefined;
    optionValue?: string | ((item: unknown) => string) | undefined;
    id?: string | undefined;
    searchMessage?: string | undefined;
    emptySelectionMessage?: string | undefined;
    selectionMessage?: string | undefined;
    autoOptionFocus?: boolean | undefined;
    selectOnFocus?: boolean | undefined;
    searchLocale?: boolean | undefined;
    optionDisabled?: string | undefined;
    focusOnHover?: boolean | undefined;
    variant?: 'filled' | 'outlined';

    [key: string]: unknown;
}

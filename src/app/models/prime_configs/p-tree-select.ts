import { ElementRef, TemplateRef } from '@angular/core';
import { OverlayOptions, ScrollerOptions } from 'primeng/api';

export interface PTreeSelectConfig {
    inputId?: string | undefined;
    scrollHeight?: string;
    disabled?: boolean | undefined;
    metaKeySelection?: boolean;
    variant?: 'filled' | 'outlined';
    display?: 'comma' | 'chip';
    selectionMode?: 'single' | 'multiple' | 'checkbox';
    tabindex?: string | undefined;
    ariaLabel?: string | undefined;
    ariaLabelledBy?: string | undefined;
    placeholder?: string | undefined;
    panelClass?: string | string[] | Set<string> | { [klass: string]: unknown } | undefined;
    panelStyle?: { [klass: string]: unknown } | null | undefined;
    panelStyleClass?: string | undefined;
    containerStyle?: { [klass: string]: unknown } | null | undefined;
    containerStyleClass?: string | undefined;
    labelStyle?: { [klass: string]: unknown } | null | undefined;
    labelStyleClass?: string | undefined;
    overlayOptions?: OverlayOptions | undefined;
    emptyMessage?: string;
    appendTo?: HTMLElement | ElementRef | TemplateRef<unknown> | string | null | undefined | unknown;
    filter?: boolean;
    filterBy?: string;
    filterMode?: string;
    filterPlaceholder?: string | undefined;
    filterLocale?: string | undefined;
    filterInputAutoFocus?: boolean;
    propagateSelectionDown?: boolean;
    propagateSelectionUp?: boolean;
    showClear?: boolean;
    resetFilterOnHide?: boolean;
    virtualScroll?: boolean | undefined;
    virtualScrollItemSize?: number | undefined;
    virtualScrollOptions?: ScrollerOptions | undefined;
    autofocus?: boolean | undefined;

    [key: string]: unknown;
}

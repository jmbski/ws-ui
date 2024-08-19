import { ElementRef, TemplateRef } from '@angular/core';

export interface PColorPickerConfig {
    style?: { [klass: string]: unknown } | null | undefined;
    styleClass?: string | undefined;
    inline?: boolean | undefined;
    format?: 'hex' | 'rgb' | 'hsb';
    appendTo?: HTMLElement | ElementRef | TemplateRef<unknown> | string | null | undefined | unknown;
    disabled?: boolean | undefined;
    tabindex?: string | undefined;
    inputId?: string | undefined;
    autoZIndex?: boolean;
    baseZIndex?: number;
    showTransitionOptions?: string;
    hideTransitionOptions?: string;
    autofocus?: boolean | undefined;

    [key: string]: unknown;
}

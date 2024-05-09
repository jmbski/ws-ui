import { ElementRef, TemplateRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonProps, MenuButtonProps } from 'primeng/splitbutton';

export interface PSplitButtonConfig {
    model?: MenuItem[] | undefined;
    severity?: 'success' | 'info' | 'warning' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast' | null | undefined;
    raised?: boolean;
    rounded?: boolean;
    text?: boolean;
    outlined?: boolean;
    size?: 'small' | 'large' | undefined | null;
    plain?: boolean;
    icon?: string | undefined;
    iconPos?: 'left' | 'right';
    label?: string | undefined;
    style?: { [klass: string]: unknown } | null | undefined;
    styleClass?: string | undefined;
    menuStyle?: { [klass: string]: unknown } | null | undefined;
    menuStyleClass?: string | undefined;
    tabindex?: number | undefined;
    appendTo?: HTMLElement | ElementRef | TemplateRef<unknown> | string | null | undefined | unknown;
    dir?: string | undefined;
    expandAriaLabel?: string | undefined;
    showTransitionOptions?: string;
    hideTransitionOptions?: string;
    buttonProps?: ButtonProps | undefined;
    menuButtonProps?: MenuButtonProps | undefined;
    autofocus?: boolean | undefined;

    [key: string]: unknown;
}

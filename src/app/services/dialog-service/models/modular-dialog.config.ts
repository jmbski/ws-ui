

import { TemplateRef } from '@angular/core';

import { WeakObject, GenericFunction, DialogComponentType , StyleGroup } from 'warskald-ui/models';



/**
 * An interface representing the various properties of the {@link ModularDialogComponent}
 * class that can be passed to it through the primeNG DialogService and assigned to it
 * on instantiation.
 */
export class ModularDialogConfig {
    dialogID: string = '';

    styles?: StyleGroup;

    headerContent?: DialogComponentType;
    headerStyles?: StyleGroup;
    headerData?: WeakObject;

    content?: DialogComponentType;
    contentStyles?: StyleGroup;
    contentData?: WeakObject;

    footer?: DialogComponentType;
    footerStyles?: StyleGroup;
    footerData?: WeakObject;

    navBoundaryElementRef?: TemplateRef<unknown> | HTMLElement | string;

    appendTo?: string | TemplateRef<unknown>;

    closable?: boolean;

    minimizable?: boolean;
    minimized?: boolean;

    maximizable?: boolean;
    maximized?: boolean;

    collapsible?: boolean;
    collapsed?: boolean;

    allowMultiple?: boolean;

    handleOnShow?: GenericFunction<void>;
    handleOnHide?: GenericFunction<void>;
    handleVisibleChange?: GenericFunction<void>;
    handleOnResizeInit?: GenericFunction<void>;
    handleOnResizeEnd?: GenericFunction<void>;
    handleOnDragEnd?: GenericFunction<void>;
    handleOnMaximize?: GenericFunction<void>;

    showSubmitButton?: boolean;
    submitLabel?: string;
    submitIcon?: string;

    showCancelButton?: boolean;
    cancelLabel?: string;
    cancelIcon?: string;

    data?: WeakObject;
    customInjectors?: WeakMap<object, unknown>;

    [key: string]: unknown;
}
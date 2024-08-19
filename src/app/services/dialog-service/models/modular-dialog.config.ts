

import { TemplateRef } from '@angular/core';

import { WeakObject, GenericFunction, DialogComponentType , StyleGroup, HTMLRef } from 'warskald-ui/models';
import { DialogBounds } from './dialog-bounds';



/**
 * An interface representing the various properties of the {@link ModularDialogComponent}
 * class that can be passed to it through the primeNG DialogService and assigned to it
 * on instantiation.
 */
export class ModularDialogConfig {
    dialogID: string = '';

    styles?: StyleGroup;

    title?: string;

    header?: DialogComponentType;
    headerStyles?: StyleGroup;
    headerData?: WeakObject;

    content?: DialogComponentType;
    contentStyles?: StyleGroup;
    contentData?: WeakObject;

    footer?: DialogComponentType;
    footerStyles?: StyleGroup;
    footerData?: WeakObject;

    navBoundaryElementRef?: HTMLRef;

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
    submitAutoFocus?: boolean = true;
    onSubmit?: GenericFunction<void>;

    showCancelButton?: boolean;
    cancelLabel?: string;
    cancelIcon?: string;
    onCancel?: GenericFunction<void>;

    data?: WeakObject;
    customInjectors?: InjectorMapping[];

    submitFunction?: (data?: unknown) => void;
    cancelFunction?: (data?: unknown) => void;

    modal?: boolean;

    [key: string]: unknown;
}

export interface InjectorMapping {
    token: object;
    value: unknown;
}
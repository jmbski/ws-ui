import { FormGroup } from '@angular/forms';
import { ComponentConfig, ContainerConfig, ElementType, FunctionMap, StyleGroup, toCamelCase } from 'warskald-ui/models';
import { ModularDialogConfig, ModularDialogRef } from 'warskald-ui/services';
import { ElementRendererComponent } from './element-renderer.component';

export interface FormDialogConfig {
    elements: ComponentConfig[];
    actionMap?: FunctionMap;

    [key: string]: unknown;
}

export interface FormDialogOptions {
    form: FormGroup;
    options: ModularDialogConfig;

    [key: string]: unknown;
}

export function getFormDialog(
    header: string, 
    elements: ComponentConfig[], 
    actionMap?: FunctionMap, 
    layoutStyles?: StyleGroup,
    dialogOptions?: ModularDialogConfig,
): FormDialogOptions {
    const form: FormGroup = new FormGroup({});

    const options = {
        dialogID: `${toCamelCase(header)}FormDialog`,
        header,
        content: ElementRendererComponent,
        contentData: <ContainerConfig>{
            elementType: ElementType.CONTAINER,
            id: `${toCamelCase(header)}FormDialog-content`,
            hasForm: true,
            form,
            elements,
            actionMap,
            layoutStyles,
        },
        appendTo: 'body',
        allowMultiple: true,
        styles: {
            style: {
                maxWidth: '85vw',
                width: '60vw',
            }
        }
    };

    if(dialogOptions) {
        Object.assign(options, dialogOptions);
    }

    return { form, options };
}
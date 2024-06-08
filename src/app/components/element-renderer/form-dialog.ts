import { FormGroup } from '@angular/forms';
import { ComponentConfig, ContainerConfig, ElementType, FunctionMap, StyleGroup, toCamelCase } from 'warskald-ui/models';
import { DialogManagerService, ModularDialogConfig } from 'warskald-ui/services';
import { ElementRendererComponent } from './element-renderer.component';

/**
 * A form dialog configuration.
 * @todo probably not used, need to look into removing this.
 */
export interface FormDialogConfig {
    elements: ComponentConfig[];
    actionMap?: FunctionMap;

    [key: string]: unknown;
}

/**
 * Response type for {@link getFormDialog}. Returns the created {@link FormGroup} and the {@link ModularDialogConfig}.
 * This is used to then create a dialog using the {@link DialogManagerService}.
 */
export interface FormDialogOptions {
    form: FormGroup;
    options: ModularDialogConfig;

    [key: string]: unknown;
}

/**
 * Creates a config and form for a dialog that uses the {@link ElementRendererComponent} to render a form.
 * These values can then be used to create a dialog using the {@link DialogManagerService}, with the form
 * being used to handle the form data.
 * 
 * @param header The header text for the dialog.
 * @param elements The form elements to display in the dialog.
 * @param actionMap The action map for the dialog.
 * @param layoutStyles The layout styles for the dialog.
 * @param dialogOptions Config object for the dialog if you want to override defaults or add additional options.
 * 
 * @returns The {@link FormDialogOptions} object containing the form and dialog options.
 */
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
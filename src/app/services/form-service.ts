import { FormControl, Validators } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { BehaviorSubject } from 'rxjs';
import { ButtonConfig, CharMap, ClickableListConfig, ComponentConfig, ContainerConfig, CustomKeysConfig, DictionaryConfig, ElementType, FormValidator, FSButtonParms, FSDictParms, FSLabelParms, FSStdConParms, GenericFunction, InputNumberConfig, InputTextConfig, MouseEventHandler, ObjectOf, PanelConfig, WeakObject } from 'warskald-ui/models';
import { exists, isArray, isBoolean, isNumber, isNumericString, isString, isStringArray, isWeakObject } from 'warskald-ui/type-guards';
import { LoggableClass, LogLevels } from './_index';
import { nanoid } from 'nanoid';
import { NgZone } from '@angular/core';


@LoggableClass({
    LOCAL_ID: 'FormService',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
export class FormService {
    // #region public properties
    public control: FormControl = new FormControl('', Validators.required);
    
    // #endregion public properties
    
    
    // #region private properties

    private static _ngZone: NgZone = new NgZone({enableLongStackTrace: true});
    
    private static _validatorsFns: Map<string, FormValidator> = new Map<string, FormValidator>([
        ['email', Validators.email],
        ['min', Validators.min(1)],
        ['required', Validators.required],
        ['requiredTrue', Validators.requiredTrue],
    ]);

    private static _validatorMessages: Map<string, string> = new Map<string, string>([
        ['email', 'Invalid email address'],
        ['min', 'Value must be greater than 0'],
        ['required', 'This field is required'],
        ['requiredTrue', 'This field is required'],
    ]);

    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region constructor and lifecycle hooks
    
    // #endregion constructor and lifecycle hooks

    
    
    
    // #region public methods
    
    public static addValidatorMsg(name: string, message: string) {
        FormService._validatorMessages.set(name, message);
    }

    public static addValidatorsMsgs(validators: Record<string, string>) {
        Object.keys(validators).forEach((name) => {
            FormService.addValidatorMsg(name, validators[name]);
        });
    }

    public static getValidatorMsg(name: string): string {
        return FormService._validatorMessages.get(name) ?? '';
    }

    public static getValidatorMsgs(validators: string[]): string[] {
        return validators.map((validator) => {
            return FormService.getValidatorMsg(validator);
        });
    }

    public static getValidatorMsgTooltip(control: FormControl): string {
        const validators = Object.keys(control.errors ?? {});
        return FormService.getValidatorMsgs(validators).join('<br>');
    }
    
    public static triggerAnimation(element: HTMLElement | string, animation: string = 'glowing', duration: number = 2) {
        FormService._ngZone.runOutsideAngular(() => {
            if(isString(element)) {
                const foundElement = document.getElementById(element);
                if(foundElement) {
                    element = foundElement;
                }
            }
            if(element instanceof HTMLElement) {
    
                element.classList.add(animation);
                
                const computedContent = getComputedStyle(element).content;
                const parsedContent = computedContent.replaceAll('"','');
                const durationContent = isNumericString(parsedContent, false) ? parseFloat(parsedContent) : 0;
    
                const computedDuration = getComputedStyle(element).animationDuration;
                const parsedDuration = isNumericString(computedDuration, false) ? parseFloat(computedDuration) : 0;
    
                duration = (durationContent || parsedDuration || duration) * 1000;
    
                if(duration <= 0) {
                    duration = 2000;
                }
                // Remove the glow class after the animation completes
                const timerId = nanoid();
                console.log('starting timer', timerId, element);
                console.time(timerId);
                setTimeout(() => {
                    (<HTMLElement>element).classList.remove(animation);
                    console.timeEnd(timerId);
                }, duration);
            }
        });
    }

    public static triggerReflective() {
        const element = document.getElementById('reflectiveElement');
        if(element) {
            element.classList.add('reflective');
            
            // Optionally, remove the class after the animation completes
            setTimeout(() => {
                element.classList.remove('reflective');
            }, 1500); // Match this duration with the duration of the animation
        }
    }

    public static getElementType(value: unknown): ElementType | undefined {
        if(exists(value)) {
            if (isString(value)) {
                return ElementType.INPUT_TEXT;
            }
            else if (isNumber(value)) {
                return ElementType.INPUT_NUMBER;
            }
            else if (isBoolean(value)) {
                return ElementType.CHECKBOX;
            }
            else if (isArray(value)) {
                return ElementType.SELECT;
            }
            else if (typeof value === 'object') {
                return ElementType.CONTAINER;
            }
        }
        return undefined;
    }

    public static propToElement(propName: string, propValue: unknown): ComponentConfig[] | undefined {
        const elementType = FormService.getElementType(propValue);
        let element: ComponentConfig | undefined = undefined;
        let labelElement: ComponentConfig | undefined = undefined;
        if(elementType) {
            labelElement = {
                elementType: ElementType.GENERAL,
                id: `${propName}-label`,
                value: propName.toFormat('label'),
                layoutStyles: {
                    baseClass: 'col-3 flex align-items-center'
                }
            };
            element = {
                elementType,
                id: propName,
                hasForm: true,
                baseStyles: {
                    baseClass: 'w-full'
                },
                layoutStyles: {
                    baseClass: 'col-9'
                },
                options: {
                    styleClass: 'w-full'
                }
            };

            if(elementType === ElementType.CONTAINER) {
                element.elements = FormService.objToElements(propValue as WeakObject);
            }
            if(elementType === ElementType.INPUT_NUMBER) {
                /** @todo remove testcode after testing */
                element.value = isNumber(propValue) ? propValue : 0;
                element.options = <ObjectOf<InputNumber>>{
                    showButtons: false
                };
            }
            else {
                element.value = propValue;
            }
        }

        return (labelElement && element) ? [labelElement, element] : undefined;
        
    }

    public static objToElements(obj: WeakObject)  {
        const elements: ComponentConfig[] = [];
        for(const propName in obj) {
            if(Object.hasOwn(obj, propName)) {
                const propValue = obj[propName];
                const subElements = FormService.propToElement(propName, propValue);
                if(subElements) {
                    elements.push(...subElements);
                }
            }
        }

        return elements;
    }

    public static patchValues(formValues: WeakObject, target: WeakObject) {
        for(const propName in formValues) {
            const formProp = formValues[propName];
            const targetProp = target[propName];
            if(isWeakObject(formProp) && isWeakObject(targetProp)) {
                FormService.patchValues(formProp, targetProp);
            }
            else {
                target[propName] = formProp;
            }
        }
    }

    public static getValidators(validators: string[]): FormValidator[] {
        return validators.map((validator) => {
            return FormService._validatorsFns.get(validator) ?? Validators.nullValidator;
        });
    }

    public static getValidator(validator: string): FormValidator {
        return FormService._validatorsFns.get(validator) ?? Validators.nullValidator;
    }

    public static setValidators(validators: string[] | Record<string, FormValidator>, validatorFns?: FormValidator[]) {

        if(isArray(validators)) {
            validatorFns ??= [];
            validators.forEach((name, index) => {
                (index < validators.length && validatorFns) ? 
                    FormService._validatorsFns.set(name, validatorFns[index]) :
                    FormService._validatorsFns.set(name, Validators.nullValidator);
            });
        }
        else {
            Object.keys(validators).forEach((name) => {
                FormService._validatorsFns.set(name, validators[name]);
            });
        }
    }

    public static setValidator(name: string, validator: FormValidator) {
        FormService._validatorsFns.set(name, validator);
    }

    public static getStandardContainer({label, id, elements, options}: FSStdConParms): ContainerConfig {
        const element: ContainerConfig = {
            elementType: ElementType.CONTAINER,
            id,
            label,
            elements,
            hasForm: true,
            layoutStyles: {
                baseClass: 'p-1 w-full flex align-items-center border-2 border-200 border-round flex-column m-1 shadow-4'
            },
            baseStyles: {
                baseClass: 'p-1 flex align-items-center w-full grid grid-nogutter',
                overrideDefault: true
            }
        };

        if(options) {
            Object.assign(element, options);
        }

        return element;
    }

    public static getLabelElement({label, id, layoutStyleClass = 'col-3'}: FSLabelParms): ComponentConfig {
        id ??= `${label.toFormat('label')}-label`;
        return {
            elementType: ElementType.GENERAL,
            id,
            value: label,
            layoutStyles: {
                baseClass: layoutStyleClass
            }
        };
    }

    public static getDictionaryForm({value, label, id, options}: FSDictParms): DictionaryConfig {
        const config: DictionaryConfig = {
            elementType: ElementType.DICTIONARY,
            id: id ?? label ?? nanoid(),
            hasForm: true,
            layoutStyles: {
                baseClass: 'col-12'
            },
            value,
            labelStyles: {
                baseClass: 'p-3 label-centered',
            },
        };

        options ??= {};

        if(label) {
            if(options.usePanel) {
                options.options ??= {};
                options.options.header = label;
            }
            else {
                config.label = label;
            }
        }

        Object.assign(config, options);

        return config;
    }

    public static getGeneralElement(text: string, layoutStyleClass: string = 'col-12', id?: string): ComponentConfig {
        return {
            elementType: ElementType.GENERAL,
            id: id ?? nanoid(),
            value: text,
            layoutStyles: {
                baseClass: layoutStyleClass
            }
        };
    }
    
    public static getTextElement(
        propName: string,
        value: string,
        layoutStyleClass: string = 'col-12', 
        disabled: boolean = false, 
        label?: string,
        listener?: BehaviorSubject<string>
    ): InputTextConfig {

        return {
            elementType: ElementType.INPUT_TEXT,
            id: propName,
            hasForm: true,
            label,
            value,
            layoutStyles: {
                baseClass: layoutStyleClass
            },
            baseStyles: {
                baseClass: 'w-full'
            },
            externalListener$: listener,
            disabled,
        };
    
    }

    public static objToCharMap(obj: WeakObject): CharMap[] {
        return Object.keys(obj).map((char) => <CharMap>{char});
    }

    public static getCustomKeysElement(
        id: string, 
        attachTo: string, 
        charMap?: WeakObject | CharMap[],
        label?: string,
        icon?: string, 
        layoutStyleClass: string = 'col-2'
    ): CustomKeysConfig {
        if(isWeakObject(charMap)) {
            charMap = FormService.objToCharMap(charMap);
        }
        return {
            elementType: ElementType.CUSTOM_KEYS,
            id,
            charMap,
            layoutStyles: {
                baseClass: layoutStyleClass
            },
            attachTo,
            icon,
            label,
            options: {
                styleClass: 'p-button-text',
            },
            hasForm: true
        };
    }

    public static getIconButton(id: string, icon: string, layoutStyleClass: string = 'col-1', onClickHandler?: MouseEventHandler): ButtonConfig {
        return {
            elementType: ElementType.BUTTON,
            id,
            options: {
                icon,
                styleClass: 'p-button-text',
            },
            layoutStyles: {
                baseClass: layoutStyleClass
            },
            onClickHandler,
        };
    }

    public static getButtonElement({
        id,
        label,
        icon,
        styleClass = 'p-button-text',
        layoutClass = 'col-1',
        handler,
        options
    }: FSButtonParms): ButtonConfig {
        const config: ButtonConfig = {
            elementType: ElementType.BUTTON,
            id,
            options: {
                label,
                icon,
                styleClass,
            },
            layoutStyles: {
                baseClass: layoutClass
            },
            onClickHandler: handler ?? (() => {}),
        };

        if(options) {
            Object.assign(config, options);
        }

        return config;
    }

    public static getNumberElement(
        propName: string,
        value: number,
        layoutStyleClass: string = 'col-12', 
        disabled: boolean = false, 
        label?: string,
    ): InputNumberConfig {

        return {
            elementType: ElementType.INPUT_NUMBER,
            id: propName,
            hasForm: true,
            label,
            value,
            layoutStyles: {
                baseClass: layoutStyleClass
            },
            baseStyles: {
                baseClass: 'w-full'
            },
            options: {
                inputStyleClass: 'w-full',
            },
            disabled,
        };
    
    }

    public static getPanelForm(
        header: string, 
        id: string, 
        elements: ComponentConfig[], 
        options?: Partial<PanelConfig>
    ): PanelConfig {
        const config: PanelConfig = {
            elementType: ElementType.PANEL,
            id,
            hasForm: true,
            hasFormGroup: true,
            content: elements,
            layoutStyles: {
                baseClass: 'col-12'
            },
            options: {
                toggleable: true,
                toggler: 'header',
                collapsed: true,
                header,
                
            }
        };

        if(options) {
            Object.assign(config, options);
        }

        return config;
    }

    public static getListElement(label: string, value: string[], options?: Partial<ClickableListConfig>) {
        //const propValue = this[propName];
        const elements: ComponentConfig[] = [];
        if(isStringArray(value)) {
            const clickableList: ClickableListConfig = {
                elementType: ElementType.CLICKABLE_LIST,
                id: label,
                hasForm: true,
                value: value,
                orientation: 'vertical'
            };
            if(options) {
                Object.assign(clickableList, options);
            }
            elements.push(clickableList);
        }
    
        return FormService.getStandardContainer({label: label.toFormat('label'), id: label, elements});
    
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}
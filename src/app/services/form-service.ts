import { InputNumber } from 'primeng/inputnumber';
import { BehaviorSubject } from 'rxjs';
import { BaseComponentConfig, ComponentConfig, ContainerConfig, ElementType, InputNumberConfig, InputTextConfig, ObjectOf, WeakObject } from 'warskald-ui/models';
import { exists, isArray, isBoolean, isNumber, isString, isWeakObject } from 'warskald-ui/type-guards';



export class FormService {
    // #region public properties
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region constructor and lifecycle hooks
    
    // #endregion constructor and lifecycle hooks
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
    
    
    // #region public methods
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

    public static standardContainer(label: string, id: string, elements: ComponentConfig[]): ContainerConfig {
        return {
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
    }

    public static labelElement(label: string, id?: string, layoutStyleClass: string = 'col-3'): ComponentConfig {
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
            disabled,
        };
    
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}
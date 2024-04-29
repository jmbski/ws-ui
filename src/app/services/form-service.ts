import { InputNumber } from 'primeng/inputnumber';
import { BaseComponentConfig, ElementType, ObjectOf, WeakObject } from 'warskald-ui/models';
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
                return ElementType.TEXT_INPUT;
            }
            else if (isNumber(value)) {
                return ElementType.NUMBER_INPUT;
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

    public static propToElement(propName: string, propValue: unknown) {
        const elementType = FormService.getElementType(propValue);
        let element: BaseComponentConfig | undefined = undefined;
        if(elementType) {
            element = {
                elementType,
                id: propName,
                hasForm: true,
            };

            if(elementType === ElementType.CONTAINER) {
                element.elements = FormService.objToElements(propValue as WeakObject);
            }
            if(elementType === ElementType.NUMBER_INPUT) {
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

        return element;
        
    }
    
    
    // #region public methods
    public static objToElements(obj: WeakObject)  {
        const elements: BaseComponentConfig[] = [];
        for(const propName in obj) {
            if(Object.hasOwn(obj, propName)) {
                const propValue = obj[propName];
                const element = FormService.propToElement(propName, propValue);
                if(element) {
                    elements.push(element);
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
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}
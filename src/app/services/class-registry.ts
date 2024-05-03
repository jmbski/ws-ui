import { inject, Inject, Injector, Type } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { isString } from 'lodash';
import { nanoid } from 'nanoid';
import { ComponentConfig, ElementModel, registeredClasses } from 'warskald-ui/models';
import { ElementRendererComponent } from '../components/element-renderer/element-renderer.component';


export function RegisterClassType<T>(...classTypes: string[]) {
    return function(target: Type<T>) {
        for(const classType of classTypes) {
            ClassRegistry.registerClass(classType, target);
        }
        return target;
    };
}

export class ClassRegistry {
    // #region public properties
    
    // #endregion public properties
    
    
    // #region private properties

    private static _classRegistry: Map<string, Type<unknown>> = new Map();
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs
    
    // #endregion standard inputs
    
    
    // #region get/set inputs
    
    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks

    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    public static initialize(...componentMaps: Record<string, Type<unknown>>[]) {
        for(const componentMap of componentMaps) {
            for(const [key, value] of Object.entries(componentMap)) {
                this.registerClass(key, value);
            }
        }
    }

    public static registerClass(name: string, component: Type<unknown>) {
        this._classRegistry.set(name, component);
    }

    public static getComponent(name: string): Type<unknown> | undefined {
        return this._classRegistry.get(name);
    }

    /* public toModels(elements: ComponentConfig[]): ElementModel[] {
        
        const elementModels = elements.map((element: ComponentConfig) => {
            const { elementType } = element;
            if(isString(elementType)) {
                // const classType = ElementComponentsMap[elementType];
                const classType = this.getComponent(elementType);
                //element.actionID = this.actionID;
                const model: ElementModel = {
                    classType,
                    elementId: element.id ?? nanoid(),
                    config: element
                };

                if(element.hasForm && this.form) {
                    if(classType === ElementRendererComponent) {
                        const subGroup = new FormGroup({});
                        this.form.addControl(model.elementId, subGroup);
                        model.config.form = subGroup;
                    }
                    else {
                        const newControl = new FormControl(element.value);
                        this.form.addControl(model.elementId, newControl);
                        model.config.form = newControl;
                    }
                }
                return model;
            }
            return {} as ElementModel;
        });
        
        return elementModels;
    } */
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}
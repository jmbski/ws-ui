import { Injectable, ViewContainerRef } from '@angular/core';
import { ComponentClassBase, IComponentConfig, ElementModel, LocalObject } from '@models';
import { ElementComponentsMap } from '../common/constants';

@Injectable({providedIn: 'root'})
export class ElementRenderService implements LocalObject{
    public readonly LOCAL_ID: string = 'element-render-service';
    
    // #region public properties
    
    // #endregion public properties
    
    
    // #region private properties
    
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
    constructor(
    ) {
        
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    public static RenderElement(elementModel: ElementModel): void {
        const { config, container } = elementModel;
        const { viewContainerRef } = container;
        if(config && viewContainerRef) {
            const componentClass = ElementComponentsMap[config.elementType];
            if(componentClass) {
                const componentRef = viewContainerRef.createComponent(componentClass);
                const instance = componentRef.instance as ComponentClassBase;
                instance.config = config;
            }
        }
    }

    public static RenderElements(elements: ElementModel[]): void {
        elements.forEach((element: ElementModel) => {
            this.RenderElement(element);
        });
        
    } 
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
    
}
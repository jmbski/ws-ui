import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, TemplateRef } from '@angular/core';
import { IsComponentClass, IsTemplateRef } from 'warskald-ui/type-guards';
import { ComponentDef } from 'warskald-ui/models';

@Component({
    selector: 'ws-dynamic',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './dynamic.component.html',
    styleUrl: './dynamic.component.scss'
})
export class DynamicComponent {

    // #region public properties
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters

    get component() {
        return this.componentDef?.component;
    }

    get componentConfig() {
        return this.componentDef?.config;
    } 
    
    // #endregion getters/setters
    
    
    // #region standard inputs

    @Input() componentDef?: ComponentDef<unknown>;
    
    // #endregion standard inputs
    
    
    // #region get/set inputs
    
    
    private _config?: Partial<DynamicComponent>;
    @Input()
    get config() {
        return this._config;
    }
    set config(input: Partial<DynamicComponent> | undefined) {
        delete input?.config;
        this._config = input;
        Object.assign(this, input);
    }

    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
    ) {
        
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    public isTemplateRef = IsTemplateRef;

    public isComponentClass = IsComponentClass;
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

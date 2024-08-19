import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { isComponentClass, isTemplateRef } from 'warskald-ui/type-guards';
import { ComponentDef } from 'warskald-ui/models';
import { LogLevels, LoggableComponent } from 'warskald-ui/services';
import { nanoid } from 'nanoid';

@LoggableComponent({
    LOCAL_ID: 'DynamicComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
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

        this.cd.markForCheck();
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

    public isTemplateRef = isTemplateRef;

    public isComponentClass = isComponentClass;
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

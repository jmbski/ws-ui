import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { LoggableComponent, LogLevels } from 'warskald-ui/services';
import { BaseWidget } from '../base-widget';
import { ContainerConfig, ElementType, GenericFunction, PStepperConfig, StepperConfig } from 'warskald-ui/models';
import { CommonModule } from '@angular/common';
import { ElementRendererComponent } from '../element-renderer/element-renderer.component';
import { StepperModule } from 'primeng/stepper';

@LoggableComponent({
    LOCAL_ID: 'StepperComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-stepper',
    standalone: true,
    imports: [
        CommonModule,
        ElementRendererComponent,
        StepperModule,
    ],
    templateUrl: './stepper.component.html',
    styleUrl: './stepper.component.scss'
})
export class StepperComponent extends BaseWidget<unknown> implements StepperConfig {

    // #region public properties

    public defaultBaseStyleClass: string = 'ws-stepper';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];

    [key: string]: unknown;
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs

    @Input() elementType = ElementType.STEPPER as const;

    @Input() options?: PStepperConfig;

    @Input() override children?: ContainerConfig[] = [];

    @Input() onClickHandler: GenericFunction<void> = () => {};

    @Input() onStepChangeHandler: GenericFunction<void> = () => {};

    
    // #endregion standard inputs
    
    
    // #region get/set inputs
    
    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
    ) {
        super(cd);
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

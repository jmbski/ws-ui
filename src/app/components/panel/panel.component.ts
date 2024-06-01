import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Panel, PanelAfterToggleEvent, PanelBeforeToggleEvent, PanelModule } from 'primeng/panel';
import { ComponentConfig, PanelConfig, ElementType, GenericFunction, StyleGroup, WeakObject, PPanelConfig } from 'warskald-ui/models';
import { initStyleGroups, LoggableComponent, LogLevels } from 'warskald-ui/services';
import { BaseWidget } from '../base-widget';

@LoggableComponent({
    LOCAL_ID: 'PanelComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-panel',
    standalone: true,
    imports: [
        PanelModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PanelComponent),
            multi: true
        }
    ],
    templateUrl: './panel.component.html',
    styleUrl: './panel.component.scss'
})
export class PanelComponent extends BaseWidget<unknown> implements PanelConfig, ControlValueAccessor {

    // #region public properties


    public defaultBaseStyleClass: string = 'app-panel';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];


    [key: string]: unknown;

    // #endregion public properties


    // #region private properties

    // #endregion private properties


    // #region getters/setters

    // #endregion getters/setters


    // #region standard inputs
    @Input() elementType = ElementType.PANEL as const;

    @Input() value: unknown = undefined;
    
    @Input() options: PPanelConfig = {};

    @Input() collapsedChangeHandler(event: boolean): void {}

    @Input() onBeforeToggleHandler(event: PanelBeforeToggleEvent): void {}

    @Input() onAfterToggleHandler(event: PanelAfterToggleEvent): void {}


    // #endregion standard inputs


    // #region get/set inputs

    // #endregion get/set inputs


    // #region outputs, emitters, and event listeners

    // #endregion outputs, emitters, and event listeners


    // #region viewchildren and contentchildren
    
    @ViewChild('panelRef') panelRef?: Panel;

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

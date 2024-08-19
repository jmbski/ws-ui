import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ButtonAction, ButtonGroupConfig, ButtonTemplate, DataSource, ElementType, StyleGroup, WeakObject } from 'warskald-ui/models';
import { DataService, initStyleGroups, LoggableComponent, LogLevels, RegisterClassType } from 'warskald-ui/services';
import { BaseWidget } from '../base-widget';

/**
 * Widget that implements a group of PrimeNG Button components.
 * 
 * Note: this does not implement (currently) an actual primeNG ButtonGroup component.
 * 
 * @todo Implement an option to use a real PrimeNG ButtonGroup component.
 */
@RegisterClassType(ElementType.BUTTON_GROUP)
@LoggableComponent({
    LOCAL_ID: 'ButtonGroupComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-button-group',
    standalone: true,
    imports: [
        ButtonModule,
        CommonModule,
    ],
    templateUrl: './button-group.component.html',
    styleUrl: './button-group.component.scss'
})
export class ButtonGroupComponent extends BaseWidget<unknown> implements ButtonGroupConfig {

    // #region public properties

    /**
     * The default base style class for the component. This gets merged with incoming style classes.
     * This provides a style that wraps the buttons and aligns them to the right by default. Can be overridden
     * by the {@link StyleGroup} overrideDefault property
     */
    public defaultBaseStyleClass: string = 'flex w-full justify-content-end mt-4';

    /**
     * The default button style class for the component. This gets merged with incoming style classes.
     * This provides a style that applies the standard Warskald button styles. Can be overridden
     * by the {@link StyleGroup} overrideDefault property
     */
    public defaultButtonStyleClass: string = 'btn btn-primary';

    /**
     * The combined base style classes for the component. Assigned to a div that wraps the buttons.
     */
    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];

    /**
     * The combined button style classes for the component. Assigned to all buttons in the group.
     */
    public buttonStyleClasses: string[] = [this.defaultButtonStyleClass];

    /**
     * The element ID of the {@link ElementRendererComponent} that will receive the action data.
     */
    public actionTarget?: string;

    /**
     * The data source to use for the action. Used to send data to the action target.
     */
    public actionDataSource?: DataSource;

    
    [key: string]: unknown;
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs

    /**
     * The type of element to render. This property is used to identify the {@link ComponentConfig} type.
     */
    @Input() elementType = ElementType.BUTTON_GROUP as const;
    
    /**
     * Value input to keep ngComponentOutlet happy.
     */
    @Input() value?: unknown = '';

    /**
     * The configuration options for the button group. Currently unused for this component.
     */
    @Input() options?: WeakObject = {};

    /**
     * The style group to use for the styles to be applied to each button
     */
    @Input() buttonStyles?: StyleGroup = {};

    /**
     * The buttons to render in the group. 
     * @see {@link ButtonTemplate}
     */
    @Input() buttons: ButtonTemplate[] = [];

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

    /**
     * Handles the button click event. If an action target and data source are provided, the action data will be sent
     * to the target.
     * 
     * @param button - The button that was clicked.
     * @see {@link ButtonTemplate}
     */
    public handleButtonClick(button: ButtonTemplate) {
        if(this.actionDataSource && this.actionTarget && button.action) {
            this.actionDataSource.setValue({
                senderID: this.id,
                targetID: this.actionTarget,
                value: {
                    name: button.action?.name,
                    data: button.action.data
                },
                emit: true,
            });
        }

        /** Testing a new way to relay the data */
        this.eventRelay$?.next({
            senderID: this.id,
            targetID: button.id,
            value: button.value,
            emit: true,
        });
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

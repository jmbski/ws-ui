import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ButtonAction, ButtonGroupConfig, ButtonTemplate, DataSource, ElementType, StyleGroup, WeakObject } from 'warskald-ui/models';
import { DataService, initStyleGroups, LoggableComponent, LogLevels, RegisterClassType } from 'warskald-ui/services';

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
export class ButtonGroupComponent implements ButtonGroupConfig {

    // #region public properties

    public defaultBaseStyleClass: string = 'flex w-full justify-content-end mt-4';

    public defaultButtonStyleClass: string = 'btn btn-primary';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];

    public buttonStyleClasses: string[] = [this.defaultButtonStyleClass];

    public actionTarget?: string;

    public actionDataSource?: DataSource;

    
    [key: string]: unknown;
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs

    @Input() label?: string | undefined;
    @Input() elementType = ElementType.BUTTON_GROUP as const;
    @Input() id: string = '';
    @Input() value?: unknown = '';
    @Input() baseStyles?: StyleGroup = {};
    @Input() options?: WeakObject = {};
    @Input() layoutStyles?: StyleGroup = {};

    @Input() buttonStyles?: StyleGroup = {};

    @Input() buttons: ButtonTemplate[] = [];

    @Input() actionID?: string;
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
    } 

    ngOnInit() {
        initStyleGroups.bind(this)();
        if(this.actionID) {
            const endIndex = this.actionID.indexOf('_Actions');
            if(endIndex > 0) {
                const rootID = this.actionID.substring(0, endIndex);
                this.actionTarget = `ElementRendererComponent_${rootID}`;
            }
            this.actionDataSource = DataService.getDataSource(this.actionID);
        }
        console.log('\nACTIONS:\n', this.actionID); 
    }

    ngAfterViewInit() {      
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

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
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

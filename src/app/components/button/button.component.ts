import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Button, ButtonModule } from 'primeng/button';
import { ComponentConfig, ButtonConfig, ElementType, GenericFunction, StyleGroup, WeakObject, PButtonConfig, ButtonTemplate, DataSource, ButtonAction } from 'warskald-ui/models';
import { DataService, initStyleGroups, LoggableComponent, LogLevels } from 'warskald-ui/services';

/* @LoggableComponent({
    LOCAL_ID: 'ButtonComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
}) */
@Component({
    selector: 'ws-button',
    standalone: true,
    imports: [
        ButtonModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss'
})
export class ButtonComponent implements ButtonConfig {

    // #region public properties


    public defaultBaseStyleClass: string = 'app-button';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];

    public actionTarget?: string;

    public actionDataSource?: DataSource;


    [key: string]: unknown;

    // #endregion public properties


    // #region private properties

    // #endregion private properties


    // #region getters/setters

    // #endregion getters/setters


    // #region standard inputs
    @Input() elementType = ElementType.BUTTON as const;

    @Input() value: unknown = undefined;

    @Input() hasForm = true as const;

    @Input() form?: FormControl | FormGroup;

    @Input() label?: string;

    @Input() actionID?: string;

    @Input() id: string = '';

    @Input() baseStyles?: StyleGroup = {};
    
    @Input() options: PButtonConfig = {};

    @Input() children?: ComponentConfig[];

    @Input() layoutStyles?: StyleGroup = {};

    @Input() action?: ButtonAction;

    @Input() onChanged: GenericFunction<void> = () => {};

    @Input() onTouched: GenericFunction<void> = () => {};

    @Input() onClickHandler?: (event: MouseEvent) => void = () => {};

    @Input() onFocusHandler?: (event: FocusEvent) => void = () => {};

    @Input() onBlurHandler?: (event: FocusEvent) => void = () => {};


    // #endregion standard inputs


    // #region get/set inputs

    // #endregion get/set inputs


    // #region outputs, emitters, and event listeners

    // #endregion outputs, emitters, and event listeners


    // #region viewchildren and contentchildren
    
    @ViewChild('buttonRef') buttonRef?: Button;

    // #endregion viewchildren and contentchildren


    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
    ) {
    
    }

    ngOnInit() {
        initStyleGroups.bind(this)();
        this.cd.detectChanges();

        this.innerControl = new FormControl(this.value);
        if(this.actionID) {
            const endIndex = this.actionID.indexOf('_Actions');
            if(endIndex > 0) {
                const rootID = this.actionID.substring(0, endIndex);
                this.actionTarget = `ElementRendererComponent_${rootID}`;
            }
            this.actionDataSource = DataService.getDataSource(this.actionID);
        }
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

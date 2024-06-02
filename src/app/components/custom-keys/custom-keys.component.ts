import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CharMap, ComponentConfig, DataSource, ElementType, FormElementConfig, GenericFunction, PButtonConfig, StyleGroup, WeakObject } from 'warskald-ui/models';
import { DataService, initStyleGroups, LoggableComponent, LogLevels, parseCssString } from 'warskald-ui/services';
import { IpaMapping } from './ipa-map';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { RippleModule } from 'primeng/ripple';
import { BaseWidget } from '../base-widget';
import { isString, isWeakObject } from 'warskald-ui/type-guards';

@LoggableComponent({
    LOCAL_ID: 'CustomKeysComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Debug
})
@Component({
    selector: 'ws-custom-keys',
    standalone: true,
    imports: [
        ButtonModule,
        DialogModule,
        CommonModule,
        ReactiveFormsModule,
        RippleModule,
        OverlayPanelModule,
        TooltipModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomKeysComponent),
            multi: true
        }
    ],
    templateUrl: './custom-keys.component.html',
    styleUrl: './custom-keys.component.scss'
})
export class CustomKeysComponent extends BaseWidget<string> implements FormElementConfig {

    // #region public properties

    public defaultBaseStyleClass: string = 'app-custom-keys';

    public defaultPanelStyleClass: string = 'app-custom-keys-panel';

    public defaultPanelBodyStyleClass: string = 'app-custom-keys-panel-body';

    public defaultPanelCharButtonStyleClass: string = 'app-custom-keys-panel-char-button';

    public defaultPanelCharTextStyleClass: string = 'app-custom-keys-panel-char-button-text';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];
    
    public panelStyleClasses: string[] = [this.defaultPanelStyleClass];

    public panelBodyStyleClasses: string[] = [this.defaultPanelBodyStyleClass];

    public panelCharButtonStyleClasses: string[] = [this.defaultPanelCharButtonStyleClass];

    public panelCharTextStyleClasses: string[] = [this.defaultPanelCharTextStyleClass];


    public panelStyleClass: string = this.defaultPanelStyleClass;

    public defaultPanelStyle: WeakObject = {
        width: '25rem',
    };

    public panelStyle: WeakObject = {};

    public visible: boolean = true;

    public actionDataSource?: DataSource;

    public actionTarget?: string;


    [key: string]: unknown;
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters

    // #endregion getters/setters
    
    
    // #region standard inputs
    
    @Input() elementType = ElementType.CUSTOM_KEYS as const;

    @Input() value: string = '';
    
    @Input() options: PButtonConfig = {};

    @Input() panelOptions?: Partial<OverlayPanel>;

    @Input() attachTo?: string;

    @Input() charMap!: CharMap[];

    @Input() icon: string = 'pi pi-language';

    @Input() panelStyles?: StyleGroup = {};

    @Input() panelBodyStyles?: StyleGroup = {};

    @Input() panelCharButtonStyles?: StyleGroup = {};

    @Input() panelCharTextStyles?: StyleGroup = {};
    

    
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

    ngOnInit() {
        this.charMap ??= IpaMapping;
        this.label ??= 'IPA';
    }

    ngAfterViewInit() {
        this.panelStyleClass = this.panelStyleClasses.join(' ');

        const { style } = this.panelStyles ?? {};
        let panelStyle: WeakObject = {};

        if(isString(style)) {
            panelStyle = parseCssString(style);
        }
        else if(isWeakObject(style)) {
            panelStyle = style;
        }

        this.panelStyle = {
            ...this.defaultPanelStyle,
            ...panelStyle,
        };
    }

    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    public showDialog(): void {
        this.visible = true;
    }



    public onCharClick(char: string) {
        
        if(this.attachTo) {
            this.actionDataSource?.setValue({
                senderID: this.id,
                targetID: this.actionTarget,
                emit: true,
                value: {
                    name: 'addChar',
                    data: {
                        target: this.attachTo,
                        char
                    },
                }
            });
        }
        else {
            const clipboard: Clipboard = navigator.clipboard;
            clipboard.writeText(char);
            console.log('Copied to clipboard:', char);
        }
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

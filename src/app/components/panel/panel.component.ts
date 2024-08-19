import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Panel, PanelAfterToggleEvent, PanelBeforeToggleEvent, PanelModule } from 'primeng/panel';
import { ComponentConfig, PanelConfig, ElementType, GenericFunction, StyleGroup, WeakObject, PPanelConfig } from 'warskald-ui/models';
import { initActions, initStyleGroups, LoggableComponent, LogLevels } from 'warskald-ui/services';
import { BaseWidget } from '../base-widget';
import { ElementRendererComponent } from '../element-renderer/element-renderer.component';
import { BehaviorSubject } from 'rxjs';
import { isEqual } from 'lodash';

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
        CommonModule,
        ElementRendererComponent,
        PanelModule,
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

    public defaultHeaderStyleClass: string = 'app-panel-header';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];

    public headerStyleClasses: string[] = [this.defaultHeaderStyleClass];

    public headerForm: FormGroup = new FormGroup({});

    public contentForm: FormGroup = new FormGroup({});

    public footerForm: FormGroup = new FormGroup({});


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

    @Input() headerContent?: ComponentConfig[];

    @Input() header?: string;

    @Input() content?: ComponentConfig[];

    @Input() footerContent?: ComponentConfig[];

    @Input() headerType: string = 'string';

    @Input() contentType: string = 'components';

    @Input() footerType: string = 'string';

    @Input() headerStyles: StyleGroup = {};

    

    @Input() collapsedChangeHandler(event: boolean): void {}

    @Input() onBeforeToggleHandler(event: PanelBeforeToggleEvent): void {}

    @Input() onAfterToggleHandler(event: PanelAfterToggleEvent): void {}


    // #endregion standard inputs


    // #region get/set inputs
    private _contentChanges$: BehaviorSubject<ComponentConfig[]> = new BehaviorSubject<ComponentConfig[]>(this.content ?? []);
    @Input()
    get contentChanges$(): BehaviorSubject<ComponentConfig[]> {
        return this._contentChanges$;
    }
    set contentChanges$(value: BehaviorSubject<ComponentConfig[]>) {
        this._contentChanges$?.unsubscribe();
        this._contentChanges$ = value;
        this._contentChanges$.subscribe((value) => {
            this.content = value;
            this._cd.detectChanges();
        });
    }

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

    ngOnInit() {
        if(this.form instanceof FormGroup) {
            this.form.addControl('headerForm', this.headerForm);
            this.form.addControl('contentForm', this.contentForm);
            this.form.addControl('footerForm', this.footerForm);
        }
    }

    override ngAfterContentInit() {
        initStyleGroups.bind(this)();
        initActions.bind(this)();
        this._cd.detectChanges();

        this.setDisabledState(this.disabled);
    }

    // #endregion constructor and lifecycle hooks


    // #region public methods

    // #endregion public methods


    // #region protected methods

    // #endregion protected methods


    // #region private methods

    // #endregion private methods


}

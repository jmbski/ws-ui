import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { NavLogoComponent } from 'warskald-ui/components/nav-logo';
import { MenubarModule } from 'primeng/menubar';
import { MenuBarComponent } from 'warskald-ui/components/menu-bar';
import { ComponentDef, StyleGroup } from 'warskald-ui/models';
import { DynamicComponent } from 'warskald-ui/components/dynamic';
import { nanoid } from 'nanoid';
import { LogLevels, LoggableComponent, initStyleGroups } from 'warskald-ui/services';

@LoggableComponent({
    LOCAL_ID: 'TopNavComponent_' + nanoid(),
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-top-nav',
    standalone: true,
    imports: [
        MenuBarComponent,
        MenubarModule,
        NavLogoComponent,
        DynamicComponent,
        CommonModule,
    ],
    templateUrl: './top-nav.component.html',
    styleUrl: './top-nav.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopNavComponent {
    
    // #region public properties
    
    public defaultNavMenuWrapperClass: string = 'app-top-nav-menu-wrapper';

    public defaultTopNavStyleClass: string = 'app-top-nav';

    public defaultTopNavShadowStyleClass: string = 'app-top-nav-shadow';

    public defaultTopNavWrapperStyleClass: string = 'app-top-nav-wrapper';

    public defaultHeaderTextStyleClass: string = 'app-top-nav-header-text';

    public defaultHeaderStyleClass: string = 'app-top-nav-header';

    public navMenuWrapperClasses: string[] = [this.defaultNavMenuWrapperClass];

    public topNavStyleClasses: string[] = [this.defaultTopNavStyleClass];

    public topNavShadowStyleClasses: string[] = [this.defaultTopNavShadowStyleClass];

    public topNavWrapperStyleClasses: string[] = [this.defaultTopNavWrapperStyleClass];

    public headerTextStyleClasses: string[] = [this.defaultHeaderTextStyleClass];

    public headerStyleClasses: string[] = [this.defaultHeaderStyleClass];

    [key: string]: unknown;
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs
    @Input() topNavDef?: ComponentDef<unknown>;

    @Input() navMenuDef?: ComponentDef<unknown>;

    @Input() navMenuWrapperStyles?: StyleGroup;

    @Input() logoDef?: ComponentDef<unknown>;

    @Input() topNavStyles?: StyleGroup;

    @Input() topNavShadowStyles?: StyleGroup;

    @Input() topNavWrapperStyles?: StyleGroup;

    @Input() headerText?: string;

    @Input() headerTextStyles?: StyleGroup;

    @Input() headerStyles?: StyleGroup;

    
    
    // #endregion standard inputs
    
    
    // #region get/set inputs

    private _config?: Partial<TopNavComponent>;
    @Input()
    get config() {
        return this._config;
    }
    set config(input: Partial<TopNavComponent> | undefined) {

        delete input?.config;
        this._config = input;
        Object.assign(this, input);

        initStyleGroups.bind(this)();
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

    public setMenuItems() {
        
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

export type TopNavConfig = Partial<TopNavComponent>;
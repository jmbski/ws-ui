import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, TemplateRef } from '@angular/core';
import { TopNavComponent, TopNavConfig } from 'warskald-ui/components/top-nav';
import { DynamicComponent } from 'warskald-ui/components/dynamic';
import { CommonModule } from '@angular/common';
import { LogLevels, LoggableComponent, initStyleGroups } from 'warskald-ui/services';
import { nanoid } from 'nanoid';
import { ComponentDef, StyleGroup } from 'warskald-ui/models';
import { isComponentDef, objIsType, OptionalBooleanProp, OptionalNumberProp, OptionalStyleGroupProp, OptionalStyleProp, OptionalWeakObjectProp, TypeMapping } from 'warskald-ui/type-guards';


export interface PageLayoutConfig {
    LOCAL_ID?: string;
    localLogLevel?: number;
    canLog?: boolean;
    pageLayoutStyles?: StyleGroup;
    pageContentStyles?: StyleGroup;
    customTopNavDef?: ComponentDef<unknown>;
    wsTopNavConfig?: TopNavConfig;
}

const pageLayoutConfigTypeMap: TypeMapping<PageLayoutConfig> = {
    LOCAL_ID: OptionalStyleProp,
    localLogLevel: OptionalNumberProp,
    canLog: OptionalBooleanProp,
    pageLayoutStyles: OptionalStyleGroupProp,
    pageContentStyles: OptionalStyleGroupProp,
    customTopNavDef: { predicate: isComponentDef, optional: true },
    wsTopNavConfig: OptionalWeakObjectProp,
};

export function isPageLayoutConfig(value: unknown): value is PageLayoutConfig {
    return objIsType(value, pageLayoutConfigTypeMap);
}

@LoggableComponent({
    LOCAL_ID: 'PageLayoutComponent_' + nanoid(),
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Debug
})
@Component({
    selector: 'ws-page-layout',
    standalone: true,
    imports: [
        TopNavComponent,
        DynamicComponent,
        CommonModule,
    ],
    templateUrl: './page-layout.component.html',
    styleUrl: './page-layout.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageLayoutComponent {

    [key: string]: unknown;

    // #region public properties

    public defaultPageLayoutStyleClass: string = 'app-page-layout';

    public defaultPageContentStyleClass: string = 'app-page-content';

    public pageLayoutStyleClasses: string[] = [this.defaultPageLayoutStyleClass];

    public pageContentStyleClasses: string[] = [this.defaultPageContentStyleClass];
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs

    @Input() topNavTemplate: TemplateRef<unknown> | null = null;

    /* @Input() pageLayoutStyles?: StyleGroup;

    @Input() pageContentStyles?: StyleGroup; */

    @Input() customTopNavDef?: ComponentDef<unknown>;

    @Input() wsTopNavConfig?: TopNavConfig;

    @Input() pageLayoutStyles?: StyleGroup;
    
    @Input() pageContentStyles?: StyleGroup;
    
    // #endregion standard inputs
    
    
    // #region get/set inputs
    
    private _config?: PageLayoutConfig;
    @Input()
    get config() {
        return this._config;
    }
    set config(input: PageLayoutConfig | undefined) {

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

    ngAfterViewInit() {

        initStyleGroups.bind(this)();
    }
    
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}
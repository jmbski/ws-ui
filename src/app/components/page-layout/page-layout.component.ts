import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, TemplateRef } from '@angular/core';
import { TopNavComponent, TopNavConfig } from 'warskald-ui/components/top-nav';
import { ComponentDef, LocalObject, StyleGroup } from 'warskald-ui/models';
import { DynamicComponent } from 'warskald-ui/components/dynamic';
import { CommonModule } from '@angular/common';
import { LoggableObject, LogLevel, LogService } from 'warskald-ui/services';
import { nanoid } from 'nanoid';



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
export class PageLayoutComponent implements LoggableObject {
    LOCAL_ID: string = 'PageLayoutComponent_' + nanoid();
    canLog?: boolean = true;
    localLogLevel?: LogLevel = LogLevel.Debug;

    // #region public properties
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs

    @Input() topNavTemplate: TemplateRef<unknown> | null = null;

    @Input() pageLayoutStyle?: StyleGroup;

    @Input() pageContentStyle?: StyleGroup;

    @Input() customTopNavDef?: ComponentDef<unknown>;

    @Input() wsTopNavConfig?: TopNavConfig;
    
    // #endregion standard inputs
    
    
    // #region get/set inputs

    
    private _config?: PageLayoutConfig;
    @Input()
    get config() {
        return this._config;
    }
    set config(input: PageLayoutConfig | undefined) {
        const { localLogLevel, canLog } = input ?? {};
        this.localLogLevel = localLogLevel ?? this.localLogLevel;
        this.canLog = canLog ?? this.canLog;
        
        LogService.debug(this, 'entering', input);

        this._config = input;
        Object.assign(this, input);

        LogService.debug(this, 'exiting', this._config);
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
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

export type PageLayoutConfig = Partial<PageLayoutComponent>;
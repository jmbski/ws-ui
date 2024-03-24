import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { 
    BlockableUiComponent, 
    DynamicComponent, 
    ElementRendererComponent,
    ImageComponent,
    MenuBarComponent,
    NavLogoComponent,
    NavLogoConfig,
    PageLayoutComponent,
    PageLayoutConfig,
    PullToRefreshComponent,
    SvgComponent,
    TabbedResponseTableComponent,
    TextBlockComponent,
    TopNavComponent,
    TopNavConfig,
    WsTableComponent
} from 'warskald-ui/components';
import { LoggableObject, LogLevel } from 'warskald-ui/services';

@Component({
    selector: 'ws-showcase',
    standalone: true,
    imports: [
        BlockableUiComponent,
        CommonModule,
        DynamicComponent,
        ElementRendererComponent,
        ImageComponent,
        MenuBarComponent,
        NavLogoComponent,
        PageLayoutComponent,
        PullToRefreshComponent,
        RouterOutlet,
        SvgComponent,
        TabbedResponseTableComponent,
        TextBlockComponent,
        ToastModule,
        TopNavComponent,
        WsTableComponent,
    ],
    templateUrl: './showcase.component.html',
    styleUrl: './showcase.component.scss'
})
export class ShowcaseComponent implements LoggableObject {
    readonly LOCAL_ID: string = 'ShowcaseComponent';
    canLog?: boolean = true;
    localLogLevel?: LogLevel = LogLevel.Debug;

    // #region public properties

    public pageLayoutConfig: PageLayoutConfig = {
        LOCAL_ID: 'ShowcasePageLayout',
        wsTopNavConfig: <TopNavConfig>{
            headerText: 'Iron Lions United',
            logoDef: {
                component: NavLogoComponent,
                config: <NavLogoConfig>{
                    isLink: true,
                    linkUrl: '/',
                    logoImage: '/app/assets/images/lions-east.webp',
                    logoAltText: 'Iron Lions United',
                }
            }
        },
    };
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs
    
    // #endregion standard inputs
    
    
    // #region get/set inputs
    
    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren

    @ViewChild('pageLayout') pageLayout?: PageLayoutComponent;
    
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

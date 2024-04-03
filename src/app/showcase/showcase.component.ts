import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { AppDeviceInfo, LayoutChangeObserver$ } from 'warskald-ui/common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { 
    BlockableUiComponent, 
    DynamicComponent, 
    ElementRendererComponent,
    ImageComponent,
    MenuBarComponent,
    MenuBarConfig,
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
import { WSMenuItem, LoggableObject, LogLevel } from 'warskald-ui/models';
import { PrimeNGConfig } from 'primeng/api';

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
    localLogLevel?: LogLevel = LogLevel.Error;

    // #region public properties

    public pageLayoutConfig?: PageLayoutConfig;

    public resizeObserver?: ResizeObserver;
    
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
        private primengConfig: PrimeNGConfig,
        private deviceDetector: DeviceDetectorService,
    ) {

        AppDeviceInfo.isMobile = this.deviceDetector.isMobile();
        AppDeviceInfo.isTablet = this.deviceDetector.isTablet();
        this.initPageLayout();
    }

    ngOnInit() {

        this.primengConfig.ripple = true;


        this.primengConfig.zIndex = {
            modal: 11100,    // dialog, sidebar
            overlay: 10000,  // dropdown, overlaypanel
            menu: 11000,     // overlay menus
            tooltip: 11050  // tooltip
        };
    }

    ngAfterViewInit() {


        this.resizeObserver = new ResizeObserver((data: ResizeObserverEntry[]) => {
            const width: number = data[0].contentRect.width;
            const height: number = data[0].contentRect.height;
            
            if (width <= 761 || height <= 600) {
                AppDeviceInfo.isMobile = true;
            }
            else {
                AppDeviceInfo.isMobile = false;
            }
            
            LayoutChangeObserver$.next();
                
            const appTopNav: HTMLElement = <HTMLElement>document.querySelector('.app-top-nav');
            if(appTopNav) {
                const appTopNavShadow: HTMLElement = <HTMLElement>document.querySelector('.app-top-nav-shadow');
                if(appTopNavShadow) {
                    appTopNavShadow.style.height = `${appTopNav.offsetHeight}px`;
                }
            }
            this.cd.detectChanges();
        });
        /*  */
        this.resizeObserver.observe(document.body);
    }
    
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    public initPageLayout(): void {
        const menuItems: WSMenuItem[] = [
            {
                label: 'About Us',
                items: [
                    {
                        label: 'The Iron Lions',
                    },
                    {
                        label: 'Clubs',
                    },
                    {
                        label: 'Partners & Sponsors',
                    },
                ]
            },
            {
                label: 'Events',
                items: [
                    {
                        label: 'Grapes of Wrath',
                    },
                    {
                        label: 'Event Calendar',
                    },
                    {
                        label: 'Upcoming Events',
                    },
                    {
                        label: 'Past Events',
                    },
                ]
            },
            {
                label: 'Contact Us',
                items: [
                    {
                        label: 'Contact Information',
                    },
                    {
                        label: 'Books Us For An Event',
                    },
                    {
                        label: 'Join Our Mailing List',
                    },
                    {
                        label: 'Donate',
                    },
                    {
                        label: 'Harness the Roar of the Lion',
                    },
                    {
                        label: 'Harness the Roar of the Lion',
                    },
                    {
                        label: 'Harness the Roar of the Lion',
                    },
                    {
                        label: 'Harness the Roar of the Lion',
                    },
                    {
                        label: 'Harness the Roar of the Lion',
                    },
                    {
                        label: 'Harness the Roar of the Lion',
                    },
                    {
                        label: 'Harness the Roar of the Lion',
                    },
                    {
                        label: 'Harness the Roar of the Lion',
                    },
                    {
                        label: 'Harness the Roar of the Lion',
                    },
                    {
                        label: 'Harness the Roar of the Lion',
                    },
                    {
                        label: 'Harness the Roar of the Lion',
                    }
                ]

            },
        ];

        

        this.pageLayoutConfig = {
            LOCAL_ID: 'ShowcasePageLayout',
            wsTopNavConfig: <TopNavConfig>{
                headerText: 'Iron Lions United',
                logoDef: {
                    component: NavLogoComponent,
                    config: <NavLogoConfig>{
                        config: {
                            isLink: true,
                            linkUrl: '/',
                            logoImage: '/app/assets/images/lions-east.webp',
                            logoAltText: 'Iron Lions United',
                            imgStyle: {
                                optionalClass: 'p-2'
                            }
                        }
                    }
                },
                navMenuDef: {
                    component: MenuBarComponent,
                    config: <MenuBarConfig>{
                        model: [
                            {
                                label: 'Menu',
                                items: menuItems
                            }
                        ],
                    },
                },
            },
        };
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

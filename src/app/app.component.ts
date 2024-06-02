import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AppDeviceInfo, LayoutChangeObserver$ } from 'warskald-ui/common';
import { BlockableUiComponent, MenuBarComponent, MenuBarConfig, NavLogoComponent, NavLogoConfig, PullToRefreshComponent } from 'warskald-ui/components';
import { PageLayoutConfig, TopNavConfig } from 'warskald-ui/models';
import { LayoutService, LoggableComponent, LogLevels, NavigationService, WSMenuItem } from 'warskald-ui/services';
import { AppSettings } from './app.config';

@LoggableComponent({
    LOCAL_ID: 'AppComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error

})
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        BlockableUiComponent,
        CommonModule,
        PullToRefreshComponent,
        RouterOutlet,
        ToastModule,
    ],
    providers: [MessageService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

    // #region public properties

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
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
        public router: Router,
        private primengConfig: PrimeNGConfig,
        private deviceDetector: DeviceDetectorService,
    ) {
        NavigationService.initialize(router);


        AppDeviceInfo.isMobile = this.deviceDetector.isMobile();
        AppDeviceInfo.isTablet = this.deviceDetector.isTablet();

        AppSettings.settings.test1?.subscribe((value: unknown) => {
            console.log('test1', value);
        });
        AppSettings.setValue('test2', 5);
        AppSettings.setValue('test1', 'test2');
        AppSettings.updateValue('test1');
        console.log('AppSettings', AppSettings.getValue('test1'));
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
                
            LayoutService.updateAppTopNavShadow();
            
            this.cd.detectChanges();
        });
        /*  */
        this.resizeObserver.observe(document.body);
    }

    ngOnInit() {

        this.primengConfig.ripple = true;
        
        this.primengConfig.zIndex = {
            modal: 11100,    // dialog, sidebar
            overlay: 10000,  // dropdown, overlaypanel
            menu: 11000,     // overlay menus
            tooltip: 11050  // tooltip
        };
        const menuItems: WSMenuItem[] = [
            {
                label: 'About Us',
                items: [
                    {
                        label: 'The Iron Lions',
                        navAction: {
                            route: '/'
                        }
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
                label: 'Test',
                navAction: {
                    route: 'test'
                }
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
                ]

            },
        ];

        const pageLayoutConfig: PageLayoutConfig = {
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
                            imgStyles: {
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

        LayoutService.setLayout('showcase', pageLayoutConfig);
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

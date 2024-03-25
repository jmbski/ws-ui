import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, TemplateRef } from '@angular/core';
import { NavLogoComponent } from 'warskald-ui/components/nav-logo';
import { MenubarModule } from 'primeng/menubar';
import { MenuBarComponent } from 'warskald-ui/components/menu-bar';
import { BaseComponentClass, capitalizeFirst, ComponentDef, CssStyleObject, NgStyleValues, StyleGroup, WSMenuItem } from 'warskald-ui/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { DynamicComponent } from 'warskald-ui/components/dynamic';
import { nanoid } from 'nanoid';
import { initStyleGroups, LoggableObject, LogLevel, LogService, Utils } from 'warskald-ui/services';
import { isString, property } from 'lodash';
import { isStyleGroup } from 'warskald-ui/type-guards';

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
export class TopNavComponent implements LoggableObject {

    readonly LOCAL_ID: string = 'TopNavComponent_' + nanoid();
    canLog?: boolean = true;
    localLogLevel?: LogLevel = LogLevel.Error;
    
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
        LogService.debug(this, 'entering', 'input:', input);

        delete input?.config;
        this._config = input;
        Object.assign(this, input);

        this.initStyleGroups();

        LogService.debug(this, 'exiting');
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
        /* const menuItems: WSMenuItem[] = [
            {
                label: 'About',
                isExpanded: false,
                items: [
                    {
                        label: 'Our Story',
                    },
                    {
                        label: 'Mission & Values',
                    },
                    {
                        label: 'Meet The Members',
                    }
                ]
            },
            {
                label: 'Historical Insights',
                isExpanded: false,
                items: [
                    {
                        label: 'Life in the Hundred Years\' War',
                    },
                    {
                        label: 'Weapons & Warfare',
                    },
                    {
                        label: 'Fashion & Culture',
                    }
                ]
            },
            {
                label: 'Events',
                isExpanded: false,
                items: [
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
                label: 'Resources',
                isExpanded: false,
                items: [
                    {
                        label: 'Research Library',
                    },
                    {
                        label: 'Educational Materials',
                    },
                    {
                        label: 'Historical Recipes',
                    },
                    {
                        label: 'Historical Games',
                    },
                    {
                        label: 'External Links',
                    },
                    {
                        label: 'Tutorials'
                    },
                ]
            },
            {
                label: 'Contact Us',
                isExpanded: false,
                items: [
                    {
                        label: 'Contact Information',
                    },
                    {
                        label: 'Books Us For An Event',
                    },
                    {
                        label: 'Volunteer Opportunities',
                    },
                    {
                        label: 'Join Our Mailing List',
                    },
                    {
                        label: 'Donate',
                    },
                    {
                        label: 'Heed The Clarion Call (Join)'
                    }
                ]
            }
        ];

        this.model = [
            {
                label: 'Menu',
                items: menuItems,
                isExpanded: false,
            }
        ];

        LogService.debug(this, 'this.model:', this.model); */
    }

    ngAfterViewInit() {
        const appTopNav: HTMLElement = <HTMLElement>document.querySelector('.app-top-nav');
        LogService.debug(this, 'appTopNav:', appTopNav);

        if(appTopNav) {
            const appTopNavShadow: HTMLElement = <HTMLElement>document.querySelector('.app-top-nav-shadow');
            LogService.debug(this, 'appTopNavShadow:', appTopNavShadow);
            
            if(appTopNavShadow) {
                appTopNavShadow.style.height = `${appTopNav.offsetHeight}px`;
            }
        }
    }
    
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    public setMenuItems() {
        
    }

    public initStyleGroups() {
        initStyleGroups.bind(this)();
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

export type TopNavConfig = Partial<TopNavComponent>;
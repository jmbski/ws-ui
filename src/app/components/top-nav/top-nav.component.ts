import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, TemplateRef } from '@angular/core';
import { NavLogoComponent } from 'warskald-ui/components/nav-logo';
import { MenubarModule } from 'primeng/menubar';
import { MenuBarComponent } from 'warskald-ui/components/menu-bar';
import { ComponentDef, CssStyleObject, NgStyleValues, StyleGroup, WSMenuItem } from 'warskald-ui/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { DynamicComponent } from 'warskald-ui/components/dynamic';
import { nanoid } from 'nanoid';
import { LoggableObject, LogLevel, LogService } from 'warskald-ui/services';

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
    public model$: BehaviorSubject<WSMenuItem[]> = new BehaviorSubject<WSMenuItem[]>([]);
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs
    @Input() topNavDef?: ComponentDef<unknown>;

    @Input() navMenuDef?: ComponentDef<unknown>;

    @Input() navMenuWrapper?: StyleGroup;

    @Input() logoDef?: ComponentDef<unknown>;

    private _model: WSMenuItem[] = [];
    @Input() 
    set model(value: WSMenuItem[]) {
        LogService.debug(this, 'value:', value);

        this._model = value.slice();
        this.model$.next(value);
    }
    get model(): WSMenuItem[] {
        return this._model;
    }

    @Input() topNavStyle?: StyleGroup;

    @Input() topNavShadowStyle?: StyleGroup;

    @Input() topNavWrapperStyle?: StyleGroup;

    @Input() headerText?: string;

    @Input() headerTextStyle?: StyleGroup;

    @Input() headerStyle?: StyleGroup;

    
    
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
        const menuItems: WSMenuItem[] = [
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

        LogService.debug(this, 'this.model:', this.model);
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
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

export type TopNavConfig = Partial<TopNavComponent>;
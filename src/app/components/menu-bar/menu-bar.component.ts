import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, TemplateRef } from '@angular/core';
import { LayoutChangeObserver$, UseMobile } from 'warskald-ui/common';
import { ElementSelector, LoggableObject, LogLevel, StyleGroup, WSMenuItem } from 'warskald-ui/models'; 
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BehaviorSubject } from 'rxjs';
import { NgStyleValues } from 'warskald-ui/models';
import { SvgComponent } from 'warskald-ui/components/svg';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ConsoleFuncts, initStyleGroups, LogService, Loggable, Loggable2 } from 'warskald-ui/services';
import { nanoid } from 'nanoid';



/* export interface MenuBarConfig {
    model: WSMenuItem[];

    menuBarClass?: string;
    menuBarStyle?: NgStyleValues;

    menuItemClass?: string;
    menuItemStyle?: NgStyleValues;

    [key: string]: unknown;

} */

@Component({
    selector: 'ws-menu-bar',
    standalone: true,
    imports: [
        CollapseModule,
        SvgComponent,
        MenubarModule,
        CommonModule,
    ],
    templateUrl: './menu-bar.component.html',
    styleUrl: './menu-bar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuBarComponent implements LoggableObject {

    readonly LOCAL_ID: string = 'MenuBarComponent_' + nanoid();
    canLog?: boolean = true;
    localLogLevel?: LogLevel = LogLevel.Debug;

    // #region public properties
    public model$: BehaviorSubject<WSMenuItem[]> = new BehaviorSubject<WSMenuItem[]>([]);
    
    public activeMenuElement: HTMLElement | null = null;

    public modelElementMap: Map<HTMLElement, WSMenuItem> = new Map<HTMLElement, WSMenuItem>();

    public useMobile: boolean = UseMobile();

    public showMenu: boolean = false;

    public mobileCollapsed: boolean = true;

    public mobileMenuItems: WSMenuItem[] = [];

    public stdMenuItems: WSMenuItem[] = [];


    public defaultMenuBarStyleClass: string = 'ws-menubar';

    public defaultMenuItemStyleClass: string = 'ws-menubar-item';

    public defaultCoverStyleClass: string = 'ws-menubar-cover';

    public defaultSubMenuStyleClass: string = 'ws-menubar-submenu';

    public defaultMenuBarButtonStyleClass: string = 'ws-button-scroll';

    public defaultSubMenuItemStyleClass: string = 'ws-menubar-submenu-item';

    public defaultMobileItemStyleClass: string = 'mobile-item';


    public menuBarStyleClasses: string[] = [this.defaultMenuBarStyleClass];

    public menuItemStyleClasses: string[] = [this.defaultMenuItemStyleClass];

    public coverStyleClasses: string[] = [this.defaultCoverStyleClass];

    public subMenuStyleClasses: string[] = [this.defaultSubMenuStyleClass];

    public menuBarButtonStyleClasses: string[] = [this.defaultMenuBarButtonStyleClass];

    public subMenuItemStyleClasses: string[] = [this.defaultSubMenuItemStyleClass];

    public mobileItemStyleClasses: string[] = [this.defaultMobileItemStyleClass];

    [key: string]: unknown;

    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    get barModel() {
        return <MenuItem[]>this.model$.getValue();
    }
    // #endregion getters/setters
    
    
    // #region standard inputs
    
    @Input() containerElement?: ElementSelector = '.app-top-nav-menu-wrapper';

    @Input() menuBarStyles?: StyleGroup;

    @Input() menuItemStyles?: StyleGroup;

    @Input() coverStyles?: StyleGroup;

    @Input() subMenuStyles?: StyleGroup;

    @Input() menuBarButtonStyles?: StyleGroup;

    @Input() subMenuItemStyles?: StyleGroup;

    @Input() mobileItemStyles?: StyleGroup;

    /** @todo Eventually replace with a configurable object */
    @Input() useSpacer?: boolean = true;

    /** @todo Eventually replace with a configurable object */
    @Input() usePennant?: boolean = true;

    // #endregion standard inputs
    
    // #region get/set inputs
    @Input()
    @Loggable()
    get model() {
        return this.useMobile ? this.mobileMenuItems : this.stdMenuItems;
    }
    set model(input: WSMenuItem[]) {
        LogService.debug(this, 'entering', 'input', input);

        this.mobileMenuItems = input;
        this.stdMenuItems = input[0]?.items || [];
        /* if(UseMobile()) {
            this._model = input;
        }
        else {
            this._model = input[0]?.items || [];
        } */
        this.model$.next(this.model);
    }
    
    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
        public el: ElementRef,
    ) {
        this.useMobile = UseMobile();
    }

    ngOnInit() {
        initStyleGroups.bind(this)();
    }

    ngAfterViewInit() {

        this.showMenu = true;
        this.cd.detectChanges();
        this.configureMenuLayout();
        LayoutChangeObserver$.subscribe(() => {
            
            this.useMobile = UseMobile();
                
            this.model$.next(this.model);
            this.cd.detectChanges();
            this.configureMenuLayout();
            
        });
    }
    
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    @Loggable()
    public getContainerElement() {

        let containerElement: HTMLElement | null = null;
        LogService.debug(this, 'this.containerElement:', this.containerElement);

        if(this.containerElement) {

            if(this.containerElement instanceof TemplateRef) {
                const { nativeElement } = this.containerElement.elementRef;
                LogService.debug(this, 'containerElement is TemplateRef, nativeElement:', nativeElement);

                if(nativeElement instanceof HTMLElement) {
                    containerElement = nativeElement;
                }
            }

            else if(this.containerElement instanceof HTMLElement) {
                containerElement = this.containerElement;
                LogService.debug(this, 'containerElement is HTMLElement, containerElement:', containerElement);
            }

            else {
                containerElement = document.querySelector(this.containerElement);
                LogService.debug(this, 'containerElement is querySelector, containerElement:', containerElement);
            }
        }

        return containerElement;
    }

    @Loggable()
    public updateMenuScrolling() {

        const element: HTMLElement = this.el.nativeElement;
        const containerElement = this.getContainerElement();
        //const maxPossible = this.calculateMaxPossibleHeightOfMenuItems(containerElement);
        //const applyMaxHeight = maxPossible > window.innerHeight;

        if(containerElement) {
            const menubarItems: HTMLElement[] = Array.from(element.querySelectorAll('.ws-menubar-submenu-wrapper'));

            LogService.debug(this, 'menubarItems:', menubarItems, 'containerElement:', containerElement);
            if(menubarItems.length > 0) {
                const { bottom } = containerElement.getBoundingClientRect();
                const pageHeight: number = window.innerHeight;
                const maxHeight: number = pageHeight - bottom;

                LogService.debug(this, 'bottom:', bottom, 'pageHeight:', pageHeight, 'maxHeight:', maxHeight);
                menubarItems.forEach((submenu: HTMLElement) => {
                    submenu.style.maxHeight = `${maxHeight}px`;
                    submenu.style.overflowY = 'auto';
                });
            }
        }

    }

    @Loggable()
    public configureMenuLayout() {

        const element: HTMLElement = this.el.nativeElement;

        const models = this.model;
        
        const cd = this.cd;

        this.updateMenuScrolling();

        if(!this.useMobile) {
            LogService.debug(this, 'not mobile, configuring menu layout');

            const wsMenuItems: HTMLElement[] = Array.from(element.querySelectorAll('.ws-menubar-item'));
            LogService.debug(this, 'wsMenuItems:', wsMenuItems);

            wsMenuItems.forEach((wsMenuItem: HTMLElement, index: number) => {
                this.modelElementMap.set(wsMenuItem, models[index]);
            });

            wsMenuItems.forEach((wsMenuItem: HTMLElement, index: number) => {
                const model = models[index];
                const subMenuItems: HTMLElement[] = <HTMLElement[]>Array.from(wsMenuItem.getElementsByClassName('ws-menubar-submenu'));
                LogService.debug(this, 'subMenuItems:', subMenuItems, 'model:', model);

                subMenuItems.forEach((subMenuItem: HTMLElement) => {
                    subMenuItem.style.maxWidth = `${wsMenuItem.offsetWidth}px`;
                });
                wsMenuItem.addEventListener('mouseenter', () => {
                    model.isExpanded = true;
                    cd.detectChanges();
                });
    
                wsMenuItem.addEventListener('mouseleave', () => {
                    model.isExpanded = false;
                    cd.detectChanges();
                });
            });
        }

        this.showMenu = true;
        this.cd.detectChanges();
    }

    @Loggable(ConsoleFuncts.Dir, {test: 'test'})
    public handleItemClick(model: WSMenuItem) {

        if(model) {
            model.isExpanded = !model.isExpanded;
            if(model.isExpanded || model.label === 'Menu') {
                this.model[0]?.items?.forEach((menuItem) => {
                    if(menuItem !== model) {
                        menuItem.isExpanded = false;
                    }
                });
            
            }
            this.cd.detectChanges();
        }
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

export type MenuBarConfig = Partial<MenuBarComponent>;
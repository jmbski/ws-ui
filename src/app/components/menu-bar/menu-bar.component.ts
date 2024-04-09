import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, TemplateRef } from '@angular/core';
import { LayoutChangeObserver$, UseMobile } from 'warskald-ui/common';
import { ElementSelector, StyleGroup, WeakObject } from 'warskald-ui/models'; 
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BehaviorSubject } from 'rxjs';
import { SvgComponent } from '../svg/_index';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { NgLogService, LogLevels, WSMenuItem, NavigationService, LayoutService, LoggableComponent, initStyleGroups, WSMenuItemEvent } from 'warskald-ui/services';
import { nanoid } from 'nanoid';


@LoggableComponent({
    localLogLevel: LogLevels.Debug,
    LOCAL_ID: 'MenudBarComponent_' + nanoid(),
    canLog: true,
    autoAddLogs: true,
})
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
export class MenuBarComponent implements WeakObject {

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

    public defaultSubMenuMobileWrapperClass: string = 'ws-menubar-submenu-wrapper';

    public defaultMobileItemStyleClass: string = 'ws-menubar-submenu-item nested-item';


    public menuBarStyleClasses: string[] = [this.defaultMenuBarStyleClass];

    public menuItemStyleClasses: string[] = [this.defaultMenuItemStyleClass];

    public coverStyleClasses: string[] = [this.defaultCoverStyleClass];

    public subMenuStyleClasses: string[] = [this.defaultSubMenuStyleClass];

    public menuBarButtonStyleClasses: string[] = [this.defaultMenuBarButtonStyleClass];

    public subMenuItemStyleClasses: string[] = [this.defaultSubMenuItemStyleClass];

    public subMenuMobileWrapperStyleClasses: string[] = [this.defaultSubMenuMobileWrapperClass];

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

    @Input() menuBarStyles?: StyleGroup = {};

    @Input() menuItemStyles?: StyleGroup = {};

    @Input() coverStyles?: StyleGroup = {};

    @Input() subMenuStyles?: StyleGroup = {};

    @Input() menuBarButtonStyles?: StyleGroup = {};

    @Input() subMenuItemStyles?: StyleGroup = {};

    @Input() subMenuMobileWrapperStyles?: StyleGroup = {};

    @Input() mobileItemStyles?: StyleGroup = {};

    /** @todo Eventually replace with a configurable object */
    @Input() useSpacer?: boolean = true;

    /** @todo Eventually replace with a configurable object */
    @Input() usePennant?: boolean = true;

    // #endregion standard inputs
    
    // #region get/set inputs
    @Input()
    get model() {
        return this.useMobile ? this.mobileMenuItems : this.stdMenuItems;
    }
    set model(input: WSMenuItem[]) {

        this.mobileMenuItems = input;
        this.stdMenuItems = input[0]?.items || [];
        
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

        setTimeout(() => {
            this.updateTopNavShadow();
        });
        LayoutChangeObserver$.subscribe(() => {
            
            this.useMobile = UseMobile();
                
            this.model$.next(this.model);
            this.cd.detectChanges();
            this.configureMenuLayout();
        });

        
    }
    
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    

    public getContainerElement() {

        let containerElement: HTMLElement | null = null;
        NgLogService.debug(this, 'this.containerElement:', this.containerElement);

        if(this.containerElement) {

            if(this.containerElement instanceof TemplateRef) {
                const { nativeElement } = this.containerElement.elementRef;
                NgLogService.debug(this, 'containerElement is TemplateRef, nativeElement:', nativeElement);

                if(nativeElement instanceof HTMLElement) {
                    containerElement = nativeElement;
                }
            }

            else if(this.containerElement instanceof HTMLElement) {
                containerElement = this.containerElement;
                NgLogService.debug(this, 'containerElement is HTMLElement, containerElement:', containerElement);
            }

            else {
                containerElement = document.querySelector(this.containerElement);
                NgLogService.debug(this, 'containerElement is querySelector, containerElement:', containerElement);
            }
        }

        return containerElement;
    }

    public updateTopNavShadow(): void {
        //if(!LayoutService.checkTopNavShaddow()) {
        LayoutService.updateAppTopNavShadow();
        //}
        this.cd.detectChanges();
    }

    public updateMenuScrolling() {

        const element: HTMLElement = this.el.nativeElement;
        const containerElement = this.getContainerElement();
        //const maxPossible = this.calculateMaxPossibleHeightOfMenuItems(containerElement);
        //const applyMaxHeight = maxPossible > window.innerHeight;

        if(containerElement) {
            const menubarItems: HTMLElement[] = Array.from(element.querySelectorAll('.ws-menubar-submenu-wrapper'));

            NgLogService.debug(this, 'menubarItems:', menubarItems, 'containerElement:', containerElement);
            if(menubarItems.length > 0) {
                const { bottom } = containerElement.getBoundingClientRect();
                const pageHeight: number = window.innerHeight;
                const maxHeight: number = pageHeight - bottom;

                NgLogService.debug(this, 'bottom:', bottom, 'pageHeight:', pageHeight, 'maxHeight:', maxHeight);
                menubarItems.forEach((submenu: HTMLElement) => {
                    submenu.style.maxHeight = `${maxHeight}px`;
                    submenu.style.overflowY = 'auto';
                });
            }
        }

        this.updateTopNavShadow();

    }

    public configureMenuLayout() {

        const element: HTMLElement = this.el.nativeElement;

        const models = this.model;
        
        const cd = this.cd;

        this.updateMenuScrolling();

        if(!this.useMobile) {
            NgLogService.debug(this, 'not mobile, configuring menu layout');

            const wsMenuItems: HTMLElement[] = Array.from(element.querySelectorAll('.ws-menubar-item'));
            NgLogService.debug(this, 'wsMenuItems:', wsMenuItems);

            wsMenuItems.forEach((wsMenuItem: HTMLElement, index: number) => {
                this.modelElementMap.set(wsMenuItem, models[index]);
            });

            wsMenuItems.forEach((wsMenuItem: HTMLElement, index: number) => {
                const model = models[index];
                const subMenuItems: HTMLElement[] = <HTMLElement[]>Array.from(wsMenuItem.getElementsByClassName('ws-menubar-submenu'));
                NgLogService.debug(this, 'configureMenuLayout::wsMenuItems.forEach','subMenuItems:', subMenuItems, 'model:', model);

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

    public collapseAll(models: WSMenuItem[] = this.useMobile ? this.mobileMenuItems : this.stdMenuItems) {
        models.forEach((model) => {
            model.isExpanded = false;
            if(model.items?.length) {
                this.collapseAll(model.items);
            }
        });
        this.cd.detectChanges();
    }

    public handleItemClick(event: WSMenuItemEvent, model: WSMenuItem) {
        if(model.items?.length) {
            model.isExpanded = !model.isExpanded;
            if(model.isExpanded || model.label === 'Menu') {
                this.model[0]?.items?.forEach((menuItem) => {
                    if(menuItem !== model) {
                        menuItem.isExpanded = false;
                    }
                });
                
            }
        }
        if(model.command) {
            model.command(event);
        }
        if(model.navAction) {
            this.collapseAll();
            NavigationService.navigate(model.navAction);
        }
        this.cd.detectChanges();
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

export type MenuBarConfig = Partial<MenuBarComponent>;
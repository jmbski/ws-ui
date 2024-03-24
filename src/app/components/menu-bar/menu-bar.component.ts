import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, TemplateRef } from '@angular/core';
import { LayoutChangeObserver$, UseMobile } from 'warskald-ui/common';
import { ElementSelector, WSMenuItem } from 'warskald-ui/models'; 
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BehaviorSubject } from 'rxjs';
import { NgStyleValues } from 'warskald-ui/models';
import { SvgComponent } from 'warskald-ui/components/svg';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { LoggableObject, LogLevel, LogService } from 'warskald-ui/services';
import { nanoid } from 'nanoid';


export interface MenuBarConfig {
    model: WSMenuItem[];

    menuBarClass?: string;
    menuBarStyle?: NgStyleValues;

    menuItemClass?: string;
    menuItemStyle?: NgStyleValues;

    [key: string]: unknown;

}

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
    localLogLevel?: LogLevel = LogLevel.Error;

    // #region public properties
    public model$: BehaviorSubject<WSMenuItem[]> = new BehaviorSubject<WSMenuItem[]>([]);
    
    public activeMenuElement: HTMLElement | null = null;

    public modelElementMap: Map<HTMLElement, WSMenuItem> = new Map<HTMLElement, WSMenuItem>();

    public useMobile: boolean = UseMobile();

    public showMenu: boolean = false;

    public mobileCollapsed: boolean = true;

    public mobileMenuItems: WSMenuItem[] = [];
    public stdMenuItems: WSMenuItem[] = [];

    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    get barModel() {
        return <MenuItem[]>this.model$.getValue();
    }
    // #endregion getters/setters
    
    
    // #region standard inputs
    
    @Input() containerElement?: ElementSelector;

    // #endregion standard inputs
    
    // #region get/set inputs
    @Input()
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

    /* public handleItemClick(itemElement: HTMLElement) {
        const model = this.modelElementMap.get(itemElement);
        
        if(model) {
            if(this.useMobile) {
                model.isExpanded = !model.isExpanded;
            }
            this.cd.detectChanges();
        }
    } */
    

    public calculateMaxPossibleHeightOfMenuItems(containerElement?: HTMLElement | null) {
        LogService.debug(this, 'entering', 'containerElement', containerElement);

        const buttonHeight: number = 40; // 2 rem min height, + 0.5rem padding
        containerElement ??= this.getContainerElement();
        const containerBottom = containerElement?.getBoundingClientRect().bottom ?? 0;
        const largestItems = this.stdMenuItems.reduce((acc, item) => {
            return (acc.items?.length ?? 0) > (item.items?.length ?? 0) ? acc : item;
        });
        const maxMenuItems = (largestItems.items?.length ?? 0) + this.stdMenuItems.length;
        const maxHeight = maxMenuItems * buttonHeight + containerBottom;

        LogService.debug(this, 'exiting', 'maxHeight', maxHeight);
        return maxHeight;
    }

    public getContainerElement() {
        LogService.debug(this, 'entering');

        let containerElement: HTMLElement | null = null;
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

        LogService.debug(this, 'exiting', 'containerElement:', containerElement);
        return containerElement;
    }

    public updateMenuScrolling() {
        LogService.debug(this, 'entering');

        const element: HTMLElement = this.el.nativeElement;
        const containerElement = this.getContainerElement();
        //const maxPossible = this.calculateMaxPossibleHeightOfMenuItems(containerElement);
        //const applyMaxHeight = maxPossible > window.innerHeight;

        if(containerElement) {
            LogService.debug(this, 'containerElement:', containerElement);
            const menubarItems: HTMLElement[] = Array.from(element.querySelectorAll('.ws-menubar-submenu-wrapper'));

            if(menubarItems.length > 0) {
                const { bottom } = containerElement.getBoundingClientRect();
                // svg element height is half the width, the svg shape itself is half the height of the svg element
                const svgHeight = window.innerWidth / 4; 
                const spacerHeight = 32; // 2rem
                const pageHeight = window.innerHeight;
                const maxHeight = pageHeight - bottom + svgHeight + spacerHeight;

                LogService.debug(this, 'svgHeight:', svgHeight, 'spacerHeight:', spacerHeight, 'pageHeight:', pageHeight, 'maxHeight:', maxHeight);
                menubarItems.forEach((submenu: HTMLElement) => {
                    submenu.style.maxHeight = `${maxHeight}px`;
                    submenu.style.overflowY = 'auto';
                });
            }
        }

    }

    public configureMenuLayout() {
        LogService.debug(this, 'entering');

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

    public handleItemClick(model: WSMenuItem) {
        LogService.debug(this, 'entering', 'model:', model);

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
        LogService.debug(this, 'exiting');
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

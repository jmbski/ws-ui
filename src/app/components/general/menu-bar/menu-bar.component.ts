import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, TemplateRef } from '@angular/core';
import { ANGULAR_COMMON, LayoutChangeObserver$, UseMobile } from '@common';
import { CssStyleObject, ElementSelector, WSMenuItem } from '@models'; 
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BehaviorSubject } from 'rxjs';
import { NgStyleValues } from 'src/app/models/styles';
import { SvgComponent } from '../svg/svg.component';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';


export interface MenuBarConfig {
    model: WSMenuItem[];

    menuBarClass?: string;
    menuBarStyle?: NgStyleValues;

    menuItemClass?: string;
    menuItemStyle?: NgStyleValues;

    [key: string]: unknown;

}

@Component({
    selector: 'gdo-menu-bar',
    standalone: true,
    imports: [
        CollapseModule,
        SvgComponent,
        MenubarModule,
        ...ANGULAR_COMMON
    ],
    templateUrl: './menu-bar.component.html',
    styleUrl: './menu-bar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuBarComponent {

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
        const buttonHeight: number = 40; // 2 rem min height, + 0.5rem padding
        containerElement ??= this.getContainerElement();
        const containerBottom = containerElement?.getBoundingClientRect().bottom ?? 0;
        const largestItems = this.stdMenuItems.reduce((acc, item) => {
            return (acc.items?.length ?? 0) > (item.items?.length ?? 0) ? acc : item;
        });
        const maxMenuItems = (largestItems.items?.length ?? 0) + this.stdMenuItems.length;
        const maxHeight = maxMenuItems * buttonHeight + containerBottom;

        return maxHeight;
    }

    public getContainerElement() {
        let containerElement: HTMLElement | null = null;
        if(this.containerElement) {

            if(this.containerElement instanceof TemplateRef) {
                const { nativeElement } = this.containerElement.elementRef;
                if(nativeElement instanceof HTMLElement) {
                    containerElement = nativeElement;
                }
            }

            else if(this.containerElement instanceof HTMLElement) {
                containerElement = this.containerElement;
            }

            else {
                containerElement = document.querySelector(this.containerElement);
            }
        }

        return containerElement;
    }

    public updateMenuScrolling() {
        const element: HTMLElement = this.el.nativeElement;
        const containerElement = this.getContainerElement();
        //const maxPossible = this.calculateMaxPossibleHeightOfMenuItems(containerElement);
        //const applyMaxHeight = maxPossible > window.innerHeight;

        if(containerElement) {
            const menubarItems: HTMLElement[] = Array.from(element.querySelectorAll('.gdo-menubar-submenu-wrapper'));

            if(menubarItems.length > 0) {
                const { bottom } = containerElement.getBoundingClientRect();
                // svg element height is half the width, the svg shape itself is half the height of the svg element
                const svgHeight = window.innerWidth / 4; 
                const spacerHeight = 32; // 2rem
                const pageHeight = window.innerHeight;
                const maxHeight = pageHeight - bottom + svgHeight + spacerHeight;
                menubarItems.forEach((submenu: HTMLElement) => {
                    submenu.style.maxHeight = `${maxHeight}px`;
                    submenu.style.overflowY = 'auto';
                });
            }
        }

    }

    public configureMenuLayout() {
        const element: HTMLElement = this.el.nativeElement;

        const models = this.model;
        
        const cd = this.cd;

        this.updateMenuScrolling();

        if(!this.useMobile) {
            const gdoMenuItems: HTMLElement[] = Array.from(element.querySelectorAll('.gdo-menubar-item'));
            
            gdoMenuItems.forEach((gdoMenuItem: HTMLElement, index: number) => {
                this.modelElementMap.set(gdoMenuItem, models[index]);
            });

            gdoMenuItems.forEach((gdoMenuItem: HTMLElement, index: number) => {
                const model = models[index];
                const subMenuItems: HTMLElement[] = <HTMLElement[]>Array.from(gdoMenuItem.getElementsByClassName('gdo-menubar-submenu'));
                subMenuItems.forEach((subMenuItem: HTMLElement) => {
                    subMenuItem.style.maxWidth = `${gdoMenuItem.offsetWidth}px`;
                });
                gdoMenuItem.addEventListener('mouseenter', () => {
                    model.isExpanded = true;
                    cd.detectChanges();
                });
    
                gdoMenuItem.addEventListener('mouseleave', () => {
                    model.isExpanded = false;
                    cd.detectChanges();
                });
            });
        }

        this.showMenu = true;
        this.cd.detectChanges();
    }

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

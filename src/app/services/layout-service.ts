import { Injectable } from '@angular/core';
import { LoggableClass, LogLevels } from './log-service/_index';
import { DataService } from './data-service/_index';
import { MenuService } from './menu-service/menu-service';
import { isWSMenuItemArray } from './menu-service/menu-service-typeguards';
import { PageLayoutConfig } from 'warskald-ui/models';

@LoggableClass({
    LOCAL_ID: 'LayoutService',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Injectable({
    providedIn: 'root'
})
export class LayoutService {

    // #region public properties
    
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
        
    ) {
        
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    public static formatID(id: string): string {
        return id.startsWith('layout-') ? id : `layout-${id}`;
    }

    public static setLayout(id: string, layout: PageLayoutConfig): void {
        if(isWSMenuItemArray(layout.wsTopNavConfig?.navMenuDef?.config)) {
            MenuService.setMenu(id, layout.wsTopNavConfig.navMenuDef.config);
        }
        DataService.registerDataSource({
            id: LayoutService.formatID(id),
            emitFirstValue: true,
            value: layout,
        });
    }

    public static getLayout(id: string): PageLayoutConfig | undefined {
        const layout = DataService.getDataSourceValue(`layout-${id}`);
        return layout as PageLayoutConfig;
    }

    public static updateAppTopNavShadow(): void {
        const appTopNav: HTMLElement = <HTMLElement>document.querySelector('.app-top-nav');
        if(appTopNav) {
            const appTopNavShadow: HTMLElement = <HTMLElement>document.querySelector('.app-top-nav-shadow');

            if(appTopNavShadow && appTopNav.offsetHeight > 0) {
                appTopNavShadow.style.height = `${appTopNav.offsetHeight}px`;
            }
        }
    }

    public static checkTopNavShaddow(): boolean {
        const appTopNavShadow: HTMLElement = <HTMLElement>document.querySelector('.app-top-nav-shadow');
        return appTopNavShadow.clientHeight > 0;
    }

    public static getStackingContextElements(root: HTMLElement = document.body): HTMLElement[] {
        const stackingContexts: HTMLElement[] = [];
        const traversedElements: HTMLElement[] = [];
    
        function createsStackingContext(element: HTMLElement): boolean {
            const style = getComputedStyle(element);
    
            return (
                style.zIndex !== 'auto' && ['relative', 'absolute', 'fixed'].includes(style.position) ||
                parseFloat(style.opacity) < 1 ||
                style.transform !== 'none' ||
                style.filter !== 'none' ||
                style.perspective !== 'none' ||
                style.clip !== 'auto' ||
                style.mask !== 'none' ||
                (style.maskImage && style.maskImage !== 'none') ||
                style.willChange === 'transform' ||
                style.willChange === 'opacity' ||
                style.contain === 'layout' ||
                style.contain === 'paint'
            );
        }
    
        function traverse(node: Element): void {
            if (node instanceof HTMLElement) {
                if (createsStackingContext(node)) {
                    stackingContexts.push(node);
                }
    
                traversedElements.push(node);
    
                for (const child of Array.from(node.children)) {
                    traverse(child);
                }
            }
        }
    
        traverse(root);
        return stackingContexts;
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}
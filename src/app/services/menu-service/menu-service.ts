import { Injectable } from '@angular/core';
import { LoggableClass, LogLevels } from '../log-service/_index';
import { DataService } from '../data-service/data-service';
import { WSMenuItem } from './menu-service-types';
import { isWSMenuItemArray } from './menu-service-typeguards';

@LoggableClass({
    LOCAL_ID: 'MenuService',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Injectable({
    providedIn: 'root'
})
export class MenuService {

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
    
    public static setMenu(id: string, menuModel: WSMenuItem[]): void {
        DataService.registerDataSource({
            id: `menu-${id}`,
            emitFirstValue: true,
            value: menuModel,

        });
    }

    public static getMenu(id: string): WSMenuItem[] {
        const menu = DataService.getDataSourceValue(`menu-${id}`);

        return isWSMenuItemArray(menu) ? menu : [];
        
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    

    // #region private methods

    // #endregion private methods
}
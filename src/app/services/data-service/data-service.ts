import { Injectable, InjectionToken } from '@angular/core';
import {
    DataSource, 
    DataSourceMessage, 
    GenericFunction, 
    LocalObject, 
    RegisterDataSourceParams 
} from 'warskald-ui/models';
import { Subscription } from 'rxjs';
import { LogLevels, NgLogService, LoggableClass } from '../log-service/_index';
import { ComponentLogLevels } from 'warskald-ui/common';
import { objIsType } from 'warskald-ui/type-guards';

/**
 * A token for the default data sources to be registered with the data service.
 */
export const DEFAULT_SRC_NAMES = new InjectionToken<string[]>('DEFAULT_SRC_NAMES');

/**
 * A service for managing data sources.
 */
/* @LoggableClass({
    LOCAL_ID: 'DataService',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
}) */
//@Injectable({providedIn: 'root'})
@LoggableClass({
    LOCAL_ID: 'DataService',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: ComponentLogLevels['DataService'] ?? LogLevels.Error
})
export class DataService {
    
    // #region public properties

    /**
     * A map of all data sources registered with the data service.
     */
    public static dataSources: Map<string, DataSource> = new Map<string, DataSource>();
    
    public name: string = 'The Data Service';

    [key: string]: unknown;
    static [key: string]: unknown;
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
    /* constructor(
        @Inject(DEFAULT_SRC_NAMES) private defaultSrcNames?: string[],
    ) {
        EzLogService.debug(this, 'entering', `defaultSrcNames: ${this.defaultSrcNames}`);

        if(this.defaultSrcNames) {
            Object.values(this.defaultSrcNames).forEach((dataSource) => {
                this.registerDataSource({id: dataSource});
            });
        }

        document.addEventListener('keyup', (event: KeyboardEvent) => {
            if(event.key === '~') {
                this.debugSources();
            }
        });

        EzLogService.debug(this, 'exiting');
    } */
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    public static initialize(defaultSrcNames: string[] = [], key: string = '|') {

        defaultSrcNames.forEach(sourceName => {
            DataService.registerDataSource({id: sourceName});
        });
        
        NgLogService.customKeyListeners[key] = () => {
            DataService.debugSources();
        };
    }
    
    /**
     * Registers a data source with the data service.
     * 
     * @param params - The parameters for registerg a data source.
     * @returns - The data source that was registered.
     */
    public static registerDataSource(params: RegisterDataSourceParams): Promise<DataSource> {

        const {
            id, message, value, emitFirstValue, emitIfUndefined 
        } = params;

        const dsMessage: DataSourceMessage = message ?? new DataSourceMessage(value);

        const dataSource: DataSource = DataService.dataSources.get(id) ?? new DataSource(id, dsMessage, emitFirstValue, emitIfUndefined);        

        if(DataService.dataSources.has(id)) {
            dataSource.setValue(dsMessage);
        }
        else {
            DataService.dataSources.set(id, dataSource);
        }

        NgLogService.debug(this, 'exiting', dataSource);
        return new Promise<DataSource>(resolve => {
            resolve(dataSource);
        
        });
    }

    /**
     * Retrieves a data source from the data service.
     * 
     * @param id - string identifying the data source to retrieve
     * @returns - the data source identified by the id
     */
    public static getDataSource(id: string): DataSource | undefined {
        return DataService.dataSources.get(id);
    }

    /**
     * Removes a data source from the data service.
     * 
     * @param id - string identifying the data source to remove
     */
    public static removeDataSource(id: string): void {
        DataService.dataSources.delete(id);
    }

    /**
     * Clears all data sources from the data service.
     */
    public static clearDataSources(): void {
        DataService.dataSources.clear();
    }

    /**
     * Subscribes a subscriber to a data source.
     * 
     * @param id - string identifying the data source to subscribe to
     * @param subscriber - the subscriber to the data source
     * @param callback - the callback function to execute when the data source emits a new value
     * @returns - a subscription to the data source
     */
    public static subscribeToDataSource(id: string,  subscriber: unknown, callback: GenericFunction<unknown>): Subscription | undefined {

        const dataSource: DataSource | undefined = DataService.getDataSource(id);
        
        if(objIsType<LocalObject>(subscriber, ['LOCAL_ID'])) {
            if(!dataSource) {
                
                DataService.registerDataSource({id})
                    .then(newDataSource => {
                        DataService.subscribeToDataSource(newDataSource.id, subscriber, callback);
                    });
                
            }
            
            else {
    
                return dataSource.value$.subscribe(message => {
                    message.readValue(subscriber, callback);
                });
            }
        }

        return undefined;
    }

    /**
     * Retrieves the value of a data source.
     * 
     * @param id - string identifying the data source to retrieve the value from
     * @returns - the value of the data source
     */
    public static getDataSourceValue(id: string): unknown {

        const dataSource: DataSource | undefined = DataService.getDataSource(id);
        if(dataSource) {
            NgLogService.debug(this, 'exiting', dataSource.getValue());
            return dataSource.getValue();
        }

        return undefined;
    }

    /**
     * Updates the value of a data source.
     * 
     * @param id - string identifying the data source to update
     * @param content - the new value to set the data source to
     */
    public static updateDataSource(id: string, content: DataSourceMessage | unknown): void {

        const dataSource: DataSource | undefined = DataService.getDataSource(id);
        const dsMessage: DataSourceMessage = content instanceof DataSourceMessage ? content : new DataSourceMessage(content);
        if(dataSource) {
            dataSource.setValue(dsMessage);
        }
        else {
            DataService.registerDataSource({id, message: dsMessage});
        }
    }

    /**
     * Logs the values of all data sources.
     */
    public static debugSources(): void {
        console.log('DataSources output:');
        for(const [key, value] of DataService.dataSources) {
            console.log(key, value.getValue());
        }
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}
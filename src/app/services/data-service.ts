import { Inject, Injectable, InjectionToken } from '@angular/core';
import {
    DataSource, 
    DataSourceMessage, 
    GeneralFunction, 
    LocalObject, 
    RegisterDataSourceParams 
} from 'warskald-ui/models';
import { Subscription } from 'rxjs';
import { LogService } from './log-service/log-service';
import { LoggableObject, LogLevel } from './log-service/log-service.types';

export const DEFAULT_SRC_NAMES = new InjectionToken<string[]>('DEFAULT_SRC_NAMES');

@Injectable({providedIn: 'root'})
export class DataService implements LoggableObject {
    public readonly LOCAL_ID: string = 'data-service';
    public localLogLevel?: LogLevel = LogLevel.Error;
    // #region public properties

    public dataSources: Map<string, DataSource> = new Map<string, DataSource>();
    
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
        @Inject(DEFAULT_SRC_NAMES) private defaultSrcNames?: string[],
    ) {
        LogService.debug(this, 'entering', `defaultSrcNames: ${this.defaultSrcNames}`);

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

        LogService.debug(this, 'exiting');
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    public registerDataSource(params: RegisterDataSourceParams): Promise<DataSource> {
        LogService.debug(this, 'entering', `params: ${params}`);

        const {
            id, message, value, emitFirstValue, emitIfUndefined 
        } = params;

        const dsMessage: DataSourceMessage = message ?? new DataSourceMessage(value);

        const dataSource: DataSource = this.dataSources.get(id) ?? new DataSource(id, dsMessage, emitFirstValue, emitIfUndefined);        

        if(this.dataSources.has(id)) {
            dataSource.setValue(dsMessage);
        }
        else {
            this.dataSources.set(id, dataSource);
        }

        LogService.debug(this, 'exiting', dataSource);
        return new Promise<DataSource>(resolve => {
            resolve(dataSource);
        
        });
    }

    public getDataSource(id: string): DataSource | undefined {
        LogService.debug(this, 'entering', `id: ${id}`);
        return this.dataSources.get(id);
    }

    public removeDataSource(id: string): void {
        LogService.debug(this, 'entering', `id: ${id}`);
        this.dataSources.delete(id);
    }

    public clearDataSources(): void {
        LogService.debug(this, 'entering');
        this.dataSources.clear();
    }

    public subscribeToDataSource(id: string,  subscriber: LocalObject, callback: GeneralFunction<unknown>): Subscription | undefined {
        LogService.debug(this, 'entering', `id: ${id}, subscriber: ${subscriber}, callback: ${callback}`);

        const dataSource: DataSource | undefined = this.getDataSource(id);
        
        if(!dataSource) {
            
            this.registerDataSource({id})
                .then(newDataSource => {
                    this.subscribeToDataSource(newDataSource.id, subscriber, callback);
                });
            
        }
        
        else {
            LogService.debug(this, 'exiting', dataSource.value$);

            return dataSource.value$.subscribe(message => {
                message.readValue(subscriber, callback);
            });
        }

        LogService.debug(this, 'exiting undefined');
        return undefined;
    }

    public getDataSourceValue(id: string): unknown {
        LogService.debug(this, 'entering', `id: ${id}`);

        const dataSource: DataSource | undefined = this.getDataSource(id);
        if(dataSource) {
            LogService.debug(this, 'exiting', dataSource.getValue());
            return dataSource.getValue();
        }

        LogService.debug(this, 'exiting undefined');
        return undefined;
    }

    public updateDataSource(id: string, content: DataSourceMessage | unknown): void {
        LogService.debug(this, 'entering', `id: ${id}, content: ${content}`);

        const dataSource: DataSource | undefined = this.getDataSource(id);
        const dsMessage: DataSourceMessage = content instanceof DataSourceMessage ? content : new DataSourceMessage(content);
        if(dataSource) {
            dataSource.setValue(dsMessage);
        }
        else {
            this.registerDataSource({id, message: dsMessage});
        }

        LogService.debug(this, 'exiting');
    }

    public debugSources(): void {
        console.log('DataSources output:');
        for(const [key, value] of this.dataSources) {
            console.log(key, value.getValue());
        }
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}
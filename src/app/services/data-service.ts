import { Inject, Injectable, InjectionToken } from '@angular/core';
import {
    DataSource, 
    DataSourceMessage, 
    GeneralFunction, 
    LocalObject, 
    RegisterDataSourceParams 
} from 'warskald-ui/models';
import { Subscription } from 'rxjs';
import { Loggable, LoggableObject, LogLevels, EzLogService } from './log-service/_index';

export const DEFAULT_SRC_NAMES = new InjectionToken<string[]>('DEFAULT_SRC_NAMES');

@Injectable({providedIn: 'root'})
export class DataService implements LoggableObject {
    public readonly LOCAL_ID: string = 'data-service';
    public localLogLevel?: number = LogLevels.Error;
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
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    @Loggable()
    public registerDataSource(params: RegisterDataSourceParams): Promise<DataSource> {

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

        EzLogService.debug(this, 'exiting', dataSource);
        return new Promise<DataSource>(resolve => {
            resolve(dataSource);
        
        });
    }

    @Loggable()
    public getDataSource(id: string): DataSource | undefined {
        return this.dataSources.get(id);
    }

    @Loggable()
    public removeDataSource(id: string): void {
        this.dataSources.delete(id);
    }

    @Loggable()
    public clearDataSources(): void {
        this.dataSources.clear();
    }

    @Loggable()
    public subscribeToDataSource(id: string,  subscriber: LocalObject, callback: GeneralFunction<unknown>): Subscription | undefined {

        const dataSource: DataSource | undefined = this.getDataSource(id);
        
        if(!dataSource) {
            
            this.registerDataSource({id})
                .then(newDataSource => {
                    this.subscribeToDataSource(newDataSource.id, subscriber, callback);
                });
            
        }
        
        else {

            return dataSource.value$.subscribe(message => {
                message.readValue(subscriber, callback);
            });
        }

        return undefined;
    }

    @Loggable()
    public getDataSourceValue(id: string): unknown {

        const dataSource: DataSource | undefined = this.getDataSource(id);
        if(dataSource) {
            EzLogService.debug(this, 'exiting', dataSource.getValue());
            return dataSource.getValue();
        }

        return undefined;
    }

    @Loggable()
    public updateDataSource(id: string, content: DataSourceMessage | unknown): void {

        const dataSource: DataSource | undefined = this.getDataSource(id);
        const dsMessage: DataSourceMessage = content instanceof DataSourceMessage ? content : new DataSourceMessage(content);
        if(dataSource) {
            dataSource.setValue(dsMessage);
        }
        else {
            this.registerDataSource({id, message: dsMessage});
        }
    }

    @Loggable()
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
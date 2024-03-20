import { Injectable } from '@angular/core';
import {
    DataSource, DataSourceCallback, DataSourceMessage, GeneralFunction, LocalObject, RegisterDataSourceParams 
} from 'src/app/models/_index';
import { Subscription } from 'rxjs';
import { Utils } from './utils';

export enum StdSrcNames {
    LINE_ITEMS = 'line-items',
    CATEGORY_TEMPLATES = 'category-templates',
    ACTIVE_TEMPLATE = 'active-template',
}

@Injectable({providedIn: 'root'})
export class DataService implements LocalObject {
    public readonly LOCAL_ID: string = 'data-service';
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
    ) {
        Object.values(StdSrcNames).forEach((dataSource) => {
            this.registerDataSource({id: dataSource});
        });

        document.addEventListener('keyup', (event: KeyboardEvent) => {
            console.log('key pressed:', event.key, event.code);
            if(event.key === '~') {
                this.debugSources();
            }
        });
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
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

        return new Promise<DataSource>(resolve => {
            resolve(dataSource);
        
        });
    }

    public getDataSource(id: string): DataSource | undefined {
        return this.dataSources.get(id);
    }

    public removeDataSource(id: string): void {
        this.dataSources.delete(id);
    }

    public clearDataSources(): void {
        this.dataSources.clear();
    }

    public subscribeToDataSource(id: string,  subscriber: LocalObject, callback: GeneralFunction<unknown>): Subscription | undefined{
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

    public getDataSourceValue(id: string): unknown {
        const dataSource: DataSource | undefined = this.getDataSource(id);
        if(dataSource) {
            return dataSource.getValue();
        }
        return undefined;
    }

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
import { BehaviorSubject } from 'rxjs';
import { cloneDeep } from 'lodash';
import { KeyOf } from 'warskald-ui/models';
import { TypeGuard, isCast, isWeakObject } from 'warskald-ui/type-guards';
import { LoggableClass, LogLevels } from './log-service/_index';

export type PropertySubjects<T> = Record<KeyOf<T>, BehaviorSubject<T[KeyOf<T>]>>;

export interface PropertyChange<T> {
    key: KeyOf<T>;
    value: T[KeyOf<T>];
}

export function buildPropertySubjects<T>(data: T): PropertySubjects<T> {
    const settings = {} as PropertySubjects<T>;
    for (const key in data) {
        settings[key] = new BehaviorSubject(data[key]);
    }
    return settings;
}

@LoggableClass({
    LOCAL_ID: 'PropTracker',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
export class PropTracker<T> {
    
    // #region public properties
    
    public settings: PropertySubjects<T> = {} as PropertySubjects<T>;

    public ignoredKeys: string[] = [];

    public changes: BehaviorSubject<PropertyChange<T>> = new BehaviorSubject<PropertyChange<T>>({key: '', value: ''} as PropertyChange<T>);
    // #endregion public properties
    
    
    // #region private properties
    
    private _data!: Record<KeyOf<T>, T[KeyOf<T>]>;

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
        private data: T, 
        private typeGuard?: TypeGuard<T>,
        private useLocal: boolean = true,
        private localStorageKey: string = 'app-data'
    ) {
        
        this.loadData();
    }
    
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    
    public getValues(): T {
        return this._data as T;
    }

    public setValues(data: T): void {
        this._data = data;

        for (const key in data) {
            this.settings[key].next(data[key]);
        }

        this.saveLocal();
    }

    public getValue(key: KeyOf<T>): T[KeyOf<T>] {
        return this._data[key];

    }

    public setValue(key: KeyOf<T>, value: T[KeyOf<T>]): void {
        this._data[key] = value;
        if(key in this.settings) {
            this.settings[key].next(value);
        }
        else {
            this.settings[key] = new BehaviorSubject(value);
            this.settings[key].subscribe(value => {
                this.changes.next({key, value} as PropertyChange<T>);
            });
        }
        this.saveLocal();
    }

    public saveLocal(): void {
        if(this.useLocal) {
            const data = cloneDeep(this._data);
            Object.keys(data).forEach(key => {
                if(this.ignoredKeys.includes(key) && isCast<KeyOf<T>>(key)) {
                    delete data[key];
                }
            });
            localStorage.setItem(this.localStorageKey, JSON.stringify(this._data));
        }
    }

    public loadData(): void {

        this.settings = {} as PropertySubjects<T>;

        if(this.useLocal) {
            const dataStr = localStorage.getItem(this.localStorageKey);
            if(dataStr) {
                const data = JSON.parse(dataStr);
                const typeGuard = this.typeGuard ?? this.defaultTypeGuard; 
                if(typeGuard(data) && isWeakObject(this.data)) {
                    Object.assign(this.data, data);
                }
            }
        }

        this._data = cloneDeep(this.data);

        this.settings = {} as PropertySubjects<T>;

        for (const key in this.data) {
            this.settings[key] = new BehaviorSubject(this._data[key]);
            this.settings[key].subscribe(value => {
                this.changes.next({key, value} as PropertyChange<T>);
            });
        }

        this.saveLocal();
    }

    public setIgnoredKeys(keys: string[]): void {
        this.ignoredKeys = keys;
    }

    public addIgnoredKey(key: string): void {
        this.ignoredKeys.push(key);
    }

    public removeIgnoredKey(key: string): void {
        this.ignoredKeys = this.ignoredKeys.filter(k => k !== key);
    }

    public defaultTypeGuard(data: unknown): data is T {
        return isWeakObject(data);
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}



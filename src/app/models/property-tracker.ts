import { BehaviorSubject } from 'rxjs';
import { KeyOf } from './general';



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

export class PropTracker<T> {
    
    // #region public properties
    
    public settings: PropertySubjects<T> = {} as PropertySubjects<T>;

    public changes: BehaviorSubject<PropertyChange<T>> = new BehaviorSubject<PropertyChange<T>>({key: '', value: ''} as PropertyChange<T>);
    // #endregion public properties
    
    
    // #region private properties
    
    private _data: Record<KeyOf<T>, T[KeyOf<T>]>;

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
    constructor(private data: T) {
        
        this._data = this.data;

        this.settings = {} as PropertySubjects<T>;
        for (const key in data) {
            this.settings[key] = new BehaviorSubject(data[key]);
            this.settings[key].subscribe(value => {
                this.changes.next({key, value} as PropertyChange<T>);
            });
        }
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
        return this.settings[key].value;
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
        localStorage.setItem('app-data', JSON.stringify(this._data));
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}



import { Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import { GeneralFunction, LocalObject } from './general';


export class RegisterDataSourceParams {
    id: string = '';
    message?: DataSourceMessage;
    value?: unknown;
    emitFirstValue?: boolean;
    emitIfUndefined?: boolean;

    constructor(
        id?: string,
        message?: DataSourceMessage,
        value?: unknown,
        emitFirstValue: boolean = true,
        emitIfUndefined: boolean = false,
    ) {
        this.id = id ?? nanoid();
        this.message = message instanceof DataSourceMessage ? message : new DataSourceMessage(value);
        this.value = value;
        this.emitFirstValue = emitFirstValue;
        this.emitIfUndefined = emitIfUndefined;
    }
}

export class DataSourceMessage {
    senderID: string = 'root';
    targetID: string = 'all';
    value: unknown;
    emit?: boolean = true;

    constructor(value?: unknown, senderID?: string, targetID?: string) {
        this.value = value;
        this.senderID = senderID ?? 'root';
        this.targetID = targetID ?? 'all';
    }

    public readValue(reader: LocalObject, callback: GeneralFunction<unknown>): void {
        if(reader.LOCAL_ID !== this.senderID && ['all', reader.LOCAL_ID].includes(this.targetID)) {
            callback(this.value);
        }
    }

    [key: string]: unknown;
}

export class DataSource {
    // #region public properties

    public value$: Subject<DataSourceMessage> = new Subject<DataSourceMessage>();

    public valueObservable = this.value$.asObservable();

    public id: string = '';

    // #endregion public properties
    
    
    // #region private properties

    private _value?: unknown;
    
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
        id?: string,
        message?: DataSourceMessage,
        emitFirstValue: boolean = true,
        emitIfUndefined: boolean = false,
        
    ) {
        const { value } = message ?? {};
        this._value = value;

        if(emitIfUndefined || (emitFirstValue && value != undefined)) {
            this.value$.next(message ?? new DataSourceMessage(value));
        }

        if(id) {
            this.id = id;
        }
        else {
            this.id = nanoid();
        }
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    public getValue(): unknown {
        return this._value;
    }

    public setValue(message: DataSourceMessage) {

        const {
            value, senderID, targetID, emit 
        } = message;
        
        this._value = value;
        
        if(emit) {
            this.value$.next(new DataSourceMessage(value, senderID, targetID));
        }
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

export type DataSourceCallback = (message: DataSourceMessage) => void;
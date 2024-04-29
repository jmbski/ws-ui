import { Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import { GenericFunction, LocalObject } from './general';

/**
 * Parameters for registering a data source with the data service.
 */
export class RegisterDataSourceParams {
    /**
     * The unique identifier for the data source.
     */
    id: string = '';

    /**
     * The message for the data source.
     */
    message?: DataSourceMessage;

    /**
     * The initial value for the data source.
     */
    value?: unknown;

    /**
     * Whether to emit the first value.
     */
    emitFirstValue?: boolean;

    /**
     * Whether to emit if the value is undefined.
     */
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

/**
 * A message for a data source.
 */
export class DataSourceMessage {
    /**
     * The unique identifier for the sender. Defaults to 'root'.
     */
    senderID: string = 'root';

    /**
     * The unique identifier for the target. Defaults to 'all'.
     */
    targetID: string = 'all';

    /**
     * The value of the message.
     */
    value: unknown;

    /**
     * Whether to emit the message. Defaults to true.
     */
    emit?: boolean = true;

    constructor(value?: unknown, senderID?: string, targetID?: string) {
        this.value = value;
        this.senderID = senderID ?? 'root';
        this.targetID = targetID ?? 'all';
    }

    /**
     * Checks if the reader can read the value, and if so, calls the callback with the value.
     * 
     * @param reader - The object reading the value.
     * @param callback - The callback to call with the value.
     */
    public readValue(reader: LocalObject, callback: GenericFunction<unknown>): void {
        if(reader.LOCAL_ID !== this.senderID && ['all', reader.LOCAL_ID].includes(this.targetID)) {
            callback(this.value);
        }
    }

    [key: string]: unknown;
}

/**
 * A data source.
 */
export class DataSource {
    // #region public properties

    /**
     * The subject for the data source.
     */
    public value$: Subject<DataSourceMessage> = new Subject<DataSourceMessage>();

    /**
     * The observable for the value.
     */
    public valueObservable = this.value$.asObservable();

    /**
     * The unique identifier for the data source.
     */
    public id: string = '';

    // #endregion public properties
    
    
    // #region private properties

    /**
     * The stored value of the data source.
     */
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

    /**
     * @returns The value of the data source.
     */
    public getValue(): unknown {
        return this._value;
    }

    /**
     * Sets the value of the data source.
     * 
     * @param message - The message to set the value.
     */
    public setValue(message: Partial<DataSourceMessage>) {

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
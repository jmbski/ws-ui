import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { LogLevels, LoggableClass } from './log-service/_index';

/**
 * A service for displaying toast messages.
 */
@LoggableClass({
    LOCAL_ID: 'ToastService',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Debug
})
@Injectable({providedIn: 'root'})
export class ToastService {

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
        private messageService: MessageService,
    ) {
        
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    public showToast(message: Message) {
        this.messageService.add(message);
    }

    public showSuccess(detail: string, summary?: string, ): void {

        this.messageService.add({
            severity: 'success',
            summary: summary ?? 'Success',
            detail,
        });
    }

    public showInfo(detail: string, summary?: string, ): void {

        this.messageService.add({
            severity: 'info',
            summary: summary ?? 'Info',
            detail,
        });
    }

    public showWarn(detail: string, summary?: string, ): void {

        this.messageService.add({
            severity: 'warn',
            summary: summary ?? 'Warning',
            detail,
        });
    }

    public showError(detail: string, summary?: string, ): void {
        
        this.messageService.add({
            severity: 'error',
            summary: summary ?? 'Error',
            detail,
        });
    }


    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}
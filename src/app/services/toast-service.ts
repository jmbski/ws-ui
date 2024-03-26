import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { LogService } from './log-service/log-service';
import { LogLevel, LoggableObject } from 'warskald-ui/models';
import { nanoid } from 'nanoid';

@Injectable({providedIn: 'root'})
export class ToastService implements LoggableObject {
    LOCAL_ID: string = 'ToastService_' + nanoid();
    canLog?: boolean = true;
    localLogLevel?: LogLevel = LogLevel.Error;

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
        LogService.debug(this, 'message:', message);
        this.messageService.add(message);
    }

    public showSuccess(detail: string, summary?: string, ): void {
        LogService.debug(this, 'detail:', detail, 'summary:', summary);

        this.messageService.add({
            severity: 'success',
            summary: summary ?? 'Success',
            detail,
        });
    }

    public showInfo(detail: string, summary?: string, ): void {
        LogService.debug(this, 'detail:', detail, 'summary:', summary);

        this.messageService.add({
            severity: 'info',
            summary: summary ?? 'Info',
            detail,
        });
    }

    public showWarn(detail: string, summary?: string, ): void {
        LogService.debug(this, 'detail:', detail, 'summary:', summary);

        this.messageService.add({
            severity: 'warn',
            summary: summary ?? 'Warning',
            detail,
        });
    }

    public showError(detail: string, summary?: string, ): void {
        LogService.debug(this, 'detail:', detail, 'summary:', summary);
        
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
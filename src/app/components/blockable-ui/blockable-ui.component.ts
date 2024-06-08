import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { nanoid } from 'nanoid';
import { BlockableUI } from 'primeng/api';
import { LogLevels, NgLogService, LoggableComponent, RegisterClassType } from 'warskald-ui/services';

/**
 * Component that implements a blockable UI component.
 */
@RegisterClassType('BlockableUiComponent')
@LoggableComponent({
    LOCAL_ID: 'BlockableUiComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-blockable-ui',
    standalone: true,
    imports: [],
    templateUrl: './blockable-ui.component.html',
    styleUrl: './blockable-ui.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockableUiComponent implements BlockableUI  {

    constructor(private el: ElementRef) {
        NgLogService.debug(this, 'constructed', el);
    }

    /**
     * Inherited from BlockableUI.
     * 
     * @returns the first child element of the component.
     */
    getBlockableElement(): HTMLElement {
        const element = this.el?.nativeElement.children[0];
        
        return element;
    }
}

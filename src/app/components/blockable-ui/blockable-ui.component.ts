import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { nanoid } from 'nanoid';
import { BlockableUI } from 'primeng/api';
import { Loggable, LogService } from 'warskald-ui/services';
import { LoggableObject, LogLevel } from 'warskald-ui/models';

@Component({
    selector: 'ws-blockable-ui',
    standalone: true,
    imports: [],
    templateUrl: './blockable-ui.component.html',
    styleUrl: './blockable-ui.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockableUiComponent implements BlockableUI, LoggableObject  {
    readonly LOCAL_ID: string = 'BlockableUiComponent_' + nanoid();
    canLog?: boolean = true;
    localLogLevel?: LogLevel = LogLevel.Error;

    constructor(private el: ElementRef) {
        LogService.debug(this, 'constructed');
    }

    @Loggable()
    getBlockableElement(): HTMLElement {
        const element = this.el?.nativeElement.children[0];
        
        return element;
    }
}

import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { BlockableUI } from 'primeng/api';

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
    }

    getBlockableElement(): HTMLElement { 
        return this.el?.nativeElement.children[0];
    }
}
import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { nanoid } from 'nanoid';
import { LogLevels, EzLogService, LoggableComponent } from 'warskald-ui/services';

@LoggableComponent({
    LOCAL_ID: 'PullToRefreshComponent_' + nanoid(),
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'pull-to-refresh',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './pull-to-refresh.component.html',
    styleUrl: './pull-to-refresh.component.scss',
})
export class PullToRefreshComponent {
    
    @ViewChild('pullToRefresh') pullToRefresh?: ElementRef;

    refreshTranslate: number = -100;
    get refreshTranslatePx() {
        return '0 ' + this.refreshTranslate + 'px';
    }

    public pullHeightStart: number = 0;

    public resizeObserver!: ResizeObserver;

    constructor() {
    }

    ngAfterViewInit() {

        this.resizeObserver = new ResizeObserver((data: ResizeObserverEntry[]) => {
            EzLogService.debug(this, 'entering resizeObserver', 'data:', data);

            this.pullHeightStart = data[0].contentRect.height * 0.15;

            EzLogService.debug(this, 'exiting resizeObserver', 'this.pullHeightStart:', this.pullHeightStart);
        });

        this.updateTranslateStyle();

        const element: HTMLElement = this.pullToRefresh?.nativeElement as HTMLElement;
        if(element) {
            element.classList.replace('refresh-bar-loading','refresh-bar');
        }
        
        // originally inside second afterNextRender
        this.resizeObserver.observe(document.body);
        const pullToRefresh = document.querySelector('.pull-to-refresh');
        if (this.resizeObserver && pullToRefresh) {
            let touchstartY = 0;

            let validStart: boolean = false;

            document.addEventListener('touchstart', (e) => {
                touchstartY = e.touches[0].clientY;
                validStart = touchstartY <= this.pullHeightStart;
            });

            document.addEventListener('touchmove', (e) => {
                const touchY = e.touches[0].clientY;
                const touchDiff = touchY - touchstartY;
                if (touchDiff > 100 && window.scrollY === 0 && validStart) {
                    this.refreshTranslate = -200 + touchDiff / 2;
                    
                    if (this.refreshTranslate > 0) {
                        this.refreshTranslate = 0;
                    }
                    
                    this.updateTranslateStyle();

                }
            });

            document.addEventListener('touchend', () => {
                EzLogService.debug(this, 'touchend', 'this.refreshTranslate:', this.refreshTranslate);

                if (this.refreshTranslate >= 0) {
                    location.reload();
                }
                pullToRefresh.classList.add('refresh-bar-closing');
                setTimeout(() => {
                    pullToRefresh.classList.remove('refresh-bar-closing');
                }, 300);
                this.refreshTranslate = -100;
                this.updateTranslateStyle();

                EzLogService.debug(this, 'exiting touchend');
            });
        }

    }

    public updateTranslateStyle() {
        const element: HTMLElement = this.pullToRefresh?.nativeElement as HTMLElement;

        if(element) {
            EzLogService.debug(this, 'element:', element);
            element.style.translate = this.refreshTranslatePx;
        }
    }
}

import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { nanoid } from 'nanoid';
import { Loggable, LoggableObject, LogLevel, LogService } from 'warskald-ui/services';

@Component({
    selector: 'pull-to-refresh',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './pull-to-refresh.component.html',
    styleUrl: './pull-to-refresh.component.scss',
})
export class PullToRefreshComponent implements LoggableObject {

    readonly LOCAL_ID: string = 'PullToRefreshComponent_' + nanoid();
    canLog?: boolean = true;
    localLogLevel?: LogLevel = LogLevel.Debug;
    
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
        LogService.debug(this, 'ngAfterViewInit');

        this.resizeObserver = new ResizeObserver((data: ResizeObserverEntry[]) => {
            LogService.debug(this, 'entering resizeObserver', 'data:', data);

            this.pullHeightStart = data[0].contentRect.height * 0.15;

            LogService.debug(this, 'exiting resizeObserver', 'this.pullHeightStart:', this.pullHeightStart);
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
                LogService.debug(this, 'touchend', 'this.refreshTranslate:', this.refreshTranslate);

                if (this.refreshTranslate >= 0) {
                    location.reload();
                }
                pullToRefresh.classList.add('refresh-bar-closing');
                setTimeout(() => {
                    pullToRefresh.classList.remove('refresh-bar-closing');
                }, 300);
                this.refreshTranslate = -100;
                this.updateTranslateStyle();

                LogService.debug(this, 'exiting touchend');
            });
        }

    }

    @Loggable()
    public updateTranslateStyle() {
        // LogService.debug(this, 'this.refreshTranslate:', this.refreshTranslate);
        const element: HTMLElement = this.pullToRefresh?.nativeElement as HTMLElement;

        if(element) {
            LogService.debug(this, 'element:', element);
            element.style.translate = this.refreshTranslatePx;
        }
    }
}

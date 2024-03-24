import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BlockableUiComponent, PullToRefreshComponent } from 'warskald-ui/components';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        BlockableUiComponent,
        CommonModule,
        PullToRefreshComponent,
        RouterOutlet,
        ToastModule,
    ],
    providers: [MessageService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'ws-ui';
}

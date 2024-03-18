import { GdoTableComponent } from './ws-table/ws-table.component';
import { ImageComponent } from './image/image.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { PullToRefreshComponent } from './pull-to-refresh/pull-to-refresh.component';
import { SvgComponent } from './svg/svg.component';
import { TextBlockComponent } from './text-block/text-block.component';

export * from './ws-table/ws-table.component';
export * from './ws-table/table-types';
export * from './image/image.component';
export * from './menu-bar/menu-bar.component';
export * from './pull-to-refresh/pull-to-refresh.component';
export * from './svg/svg.component';
export * from './tabbed-response-table/tabbed-response-table.component';
export * from './text-block/text-block.component';

export const GENERAL_COMPONENTS = [
    GdoTableComponent,
    ImageComponent,
    MenuBarComponent,
    PullToRefreshComponent,
    SvgComponent,
    TextBlockComponent,
];
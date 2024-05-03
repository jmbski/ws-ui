
import { Type } from '@angular/core';
import { BlockableUiComponent } from './blockable-ui/blockable-ui.component';
import { ButtonGroupComponent } from './button-group/button-group.component';
import { DynamicComponent } from './dynamic/dynamic.component';
import { ElementRendererComponent } from './element-renderer/element-renderer.component';
import { GeneralComponent } from './general/general.component';
import { ImageComponent } from './image/image.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { NavLogoComponent } from './nav-logo/nav-logo.component';
import { NumberInputComponent } from './number-input/number-input.component';
import { PageLayoutComponent } from './page-layout/page-layout.component';
import { PullToRefreshComponent } from './pull-to-refresh/pull-to-refresh.component';
import { SvgComponent } from './svg/svg.component';
import { TabbedResponseTableComponent } from './tabbed-response-table/tabbed-response-table.component';
import { TextBlockComponent } from './text-block/text-block.component';
import { TextInputComponent } from './text-input/text-input.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { WsTableComponent } from './ws-table/_index';
import { ElementType } from 'warskald-ui/models';


export * from './blockable-ui/blockable-ui.component';
export * from './button-group/button-group.component';
export * from './dynamic/dynamic.component';
export * from './element-renderer/element-renderer.component';
export * from './general/general.component';
export * from './image/image.component';
export * from './menu-bar/menu-bar.component';
export * from './nav-logo/nav-logo.component';
export * from './number-input/number-input.component';
export * from './page-layout/page-layout.component';
export * from './pull-to-refresh/pull-to-refresh.component';
export * from './svg/svg.component';
export * from './tabbed-response-table/tabbed-response-table.component';
export * from './text-block/text-block.component';
export * from './text-input/text-input.component';
export * from './top-nav/top-nav.component';
export * from './ws-table/_index';

export const WsComponentMap: Record<string, Type<unknown>> = {
    BlockableUiComponent,
    [ElementType.BUTTON_GROUP]: ButtonGroupComponent,
    ButtonGroupComponent,
    DynamicComponent,
    [ElementType.COMPONENT]: ElementRendererComponent,
    ElementRendererComponent,
    [ElementType.CONTAINER]: ElementRendererComponent,
    [ElementType.GENERAL]: GeneralComponent,
    GeneralComponent,
    [ElementType.IMAGE]: ImageComponent,
    ImageComponent,
    MenuBarComponent,
    NavLogoComponent,
    [ElementType.NUMBER_INPUT]: NumberInputComponent,
    NumberInputComponent,
    PageLayoutComponent,
    PullToRefreshComponent,
    SvgComponent,
    TabbedResponseTableComponent,
    [ElementType.TEXT_BLOCK]: TextBlockComponent,
    TextBlockComponent,
    [ElementType.TEXT_INPUT]: TextInputComponent,
    TextInputComponent,
    TopNavComponent,
    WsTableComponent,
};
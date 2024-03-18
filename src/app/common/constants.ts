import { CommonModule } from '@angular/common';
import { Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { BehaviorSubject, Subject } from 'rxjs';
import { ElementType } from '../models/page-elements';
import { ElementRendererComponent } from '../components/page-structure/element-renderer/element-renderer.component';
import { ImageComponent } from '../components/general/image/image.component';
import { TextBlockComponent } from '../components/general/text-block/text-block.component';


export interface AppDeviceSettings {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

export const AppDeviceInfo: AppDeviceSettings = {
    isMobile: true,
    isTablet: true,
    isDesktop: false,
};

export function UseMobile(): boolean {
    return AppDeviceInfo.isMobile || AppDeviceInfo.isTablet;
}

export const COMMON_ANGULAR_MODULES = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

];

export const COMMON_PRIME_MODULES = [
    ButtonModule,
    CardModule,
    CheckboxModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    ListboxModule,
    MultiSelectModule,
    PanelModule,
    RadioButtonModule,
    SelectButtonModule,
    ToolbarModule,
    TooltipModule,
];

export const GlobalResizeObserver: BehaviorSubject<ResizeObserver | undefined> = new BehaviorSubject<ResizeObserver | undefined>(undefined);

export type ElementComponentMap = Record<string, Type<unknown>>;

const { COMPONENT, CONTAINER, IMAGE, TEXT_BLOCK } = ElementType;
export const ElementComponentsMap: ElementComponentMap = {
    [COMPONENT]: ElementRendererComponent,
    [CONTAINER]: ElementRendererComponent,
    [IMAGE]: ImageComponent,
    [TEXT_BLOCK]: TextBlockComponent,
};

export const LayoutChangeObserver$: Subject<void> = new Subject<void>();
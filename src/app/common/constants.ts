import { CommonModule } from '@angular/common';
import { InjectionToken } from '@angular/core';
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
import { ComponentClassBase, IComponentConfig } from '../models/page-elements';


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

export const LayoutChangeObserver$: Subject<void> = new Subject<void>();

export const CONFIG_PARSER = new InjectionToken<string[]>('CONFIG_PARSER');
export function DefaultConfigParser(this: ComponentClassBase, config: IComponentConfig): void {
    Object.keys(config).forEach((key) => {
        try {
            this[key] = config[key];
        }
        catch (error: unknown) {
            if (!(error instanceof TypeError)) {
                console.error(error);
            }
        }
    });
}

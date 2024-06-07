import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectItem } from 'primeng/api';
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

export const GlobalResizeObserver: BehaviorSubject<ResizeObserver | undefined> = new BehaviorSubject<ResizeObserver | undefined>(undefined);

export const LayoutChangeObserver$: Subject<void> = new Subject<void>();

export const ComponentLogLevels: Record<string, number> = {};

export const BooleanOptions: SelectItem[] = [
    { label: 'True', value: true },
    { label: 'False', value: false },
];


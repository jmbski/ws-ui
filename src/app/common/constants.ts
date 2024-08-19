import { SelectItem } from 'primeng/api';
import { BehaviorSubject, Subject } from 'rxjs';

/**
 * Represents the device display settings.
 */
export interface AppDeviceSettings {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

/**
 * Represents the device display settings.
 */
export const AppDeviceInfo: AppDeviceSettings = {
    isMobile: true,
    isTablet: true,
    isDesktop: false,
};


/**
 * Determines if the device is a mobile device.
 * 
 * @returns boolean - true if the device is a mobile device, false otherwise.
 */
export function UseMobile(): boolean {
    return AppDeviceInfo.isMobile || AppDeviceInfo.isTablet;
}

/**
 * Shared resize observer for the application.
 */
export const GlobalResizeObserver: BehaviorSubject<ResizeObserver | undefined> = new BehaviorSubject<ResizeObserver | undefined>(undefined);

/**
 * Shared layout change observer for the application.
 */
export const LayoutChangeObserver$: Subject<void> = new Subject<void>();

/**
 * Shared object with the log levels for each component.
 * 
 * @todo See if this is actually usable
 */
export const ComponentLogLevels: Record<string, number> = {};

/**
 * Convenience object for boolean options to be passed to dropdown components etc..
 */
export const BooleanOptions: SelectItem[] = [
    { label: 'True', value: true },
    { label: 'False', value: false },
];


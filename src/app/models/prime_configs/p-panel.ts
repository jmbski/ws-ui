export interface PPanelConfig {
    toggleable?: boolean | undefined;
    header?: string | undefined;
    collapsed?: boolean | undefined;
    style?: { [klass: string]: unknown } | null | undefined;
    styleClass?: string | undefined;
    iconPos?: 'start' | 'end' | 'center';
    expandIcon?: string | undefined;
    collapseIcon?: string | undefined;
    showHeader?: boolean;
    toggler?: 'icon' | 'header';
    transitionOptions?: string;

    [key: string]: unknown;
}

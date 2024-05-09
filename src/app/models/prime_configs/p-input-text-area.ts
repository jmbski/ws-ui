export interface PInputTextAreaConfig {
    autoResize?: boolean | undefined;
    variant?: 'filled' | 'outlined';
    cols?: number;
    rows?: number;

    [key: string]: unknown;
}

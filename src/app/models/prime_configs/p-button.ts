import { ButtonIconPosition } from '../general';

export interface PButtonConfig {
    type?: string;
    iconPos?: ButtonIconPosition;
    icon?: string | undefined;
    badge?: string | undefined;
    label?: string | undefined;
    disabled?: boolean | undefined;
    loading?: boolean;
    loadingIcon?: string | undefined;
    raised?: boolean;
    rounded?: boolean;
    text?: boolean;
    plain?: boolean;
    severity?: 'info' | 'success' | 'warning' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast' | null | undefined;//'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger' | 'contrast' | string | undefined;
    outlined?: boolean;
    link?: boolean;
    tabindex?: number | undefined;
    size?: 'small' | 'large' | undefined;
    style?: { [klass: string]: unknown } | null | undefined;
    styleClass?: string | undefined;
    badgeClass?: string | undefined;
    ariaLabel?: string | undefined;
    autofocus?: boolean | undefined;

    [key: string]: unknown;
}

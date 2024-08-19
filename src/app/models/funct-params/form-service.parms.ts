import { ButtonConfig, ComponentConfig, ContainerConfig, DictionaryConfig } from '../element-configs';
import { MouseEventHandler, WeakObject } from '../general';

export interface FSStdConParms {
    label: string;
    id: string;
    elements: ComponentConfig[];
    options?: Partial<ContainerConfig>;
}

export interface FSLabelParms {
    label: string;
    id?: string;
    layoutStyleClass?: string;
}

export interface FSDictParms {
    value: WeakObject; 
    label?: string;
    id?: string; 
    options?: Partial<DictionaryConfig>
}

export interface FSButtonParms {
    id: string, 
    label: string;
    icon?: string;
    styleClass?: string;
    layoutClass: string;
    handler?: MouseEventHandler;
    options?: Partial<ButtonConfig>;
}
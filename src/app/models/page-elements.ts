import { FormControl, FormGroup } from '@angular/forms';
import { StyleGroup } from './style-types';
import { Type } from '@angular/core';
import { ElementType } from './element-types';
import { ComponentConfig } from './element-configs';


// export type PMultiSelectConfig = Partial<Omit<MultiSelect, 'options' | '_options'>>;




export type ElementComponentMap = Record<string, Type<unknown>>;


export interface ElementModel {
    classType: Type<unknown>;
    config: ComponentConfig;
    elementId: string;
    actionID?: string;
}



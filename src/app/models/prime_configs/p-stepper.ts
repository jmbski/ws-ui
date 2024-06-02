import { TemplateRef } from '@angular/core';

export interface PStepperConfig {
    activeStep?: number;
    orientation?: 'vertical' | 'horizontal';
    linear?: boolean;
    transitionOptions?: string;
    headerTemplate?: TemplateRef<unknown>;
    startTemplate?: TemplateRef<unknown>;
    separatorTemplate?: TemplateRef<unknown>;
    endTemplate?: TemplateRef<unknown>;

    [key: string]: unknown;
}
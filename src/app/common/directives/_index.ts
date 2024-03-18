import { BaseDirective } from './base-directive/base.directive';
import { ViewContainerRefDirective } from './view-container-ref.directive';

export * from './base-directive/base.directive';
export * from './view-container-ref.directive';

export const DIRECTIVES = [
    BaseDirective,
    ViewContainerRefDirective,
];
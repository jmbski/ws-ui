import { NgModule } from '@angular/core';
import { COMPONENTS } from '@components';

@NgModule({
    imports: [
        ...COMPONENTS
    ],
    exports: [
        ...COMPONENTS
    ],
})
export class WarskaldUIModule {}

export * from './src/app/components/_index';
export * from '@services';
export * from '@models';
export * from '@common';
//export * from './src/app/components/page-structure/page-layout/page-layout.component';
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
export * from './src/app/services/_index';
export * from './src/app/models/_index';
export * from './src/app/common/_index';
//export * from './src/app/components/page-structure/page-layout/page-layout.component';
import { Directive, Input, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[viewContainer]',
    standalone: true
})
export class ViewContainerRefDirective {

    @Input('viewContainer') public id?: string;
     
    constructor(public viewContainerRef: ViewContainerRef) {
        
    }

}

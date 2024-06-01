import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Accordion, AccordionModule, AccordionTabCloseEvent, AccordionTabOpenEvent } from 'primeng/accordion';
import { ComponentConfig, AccordionConfig, ElementType, GenericFunction, StyleGroup, WeakObject, PAccordionConfig } from 'warskald-ui/models';
import { initStyleGroups, LoggableComponent, LogLevels } from 'warskald-ui/services';
import { BaseWidget } from '../base-widget';

@LoggableComponent({
    LOCAL_ID: 'AccordionComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-accordion',
    standalone: true,
    imports: [
        AccordionModule,
        CommonModule,
    ],
    templateUrl: './accordion.component.html',
    styleUrl: './accordion.component.scss'
})
export class AccordionComponent extends BaseWidget<unknown> implements AccordionConfig {

    // #region public properties


    public defaultBaseStyleClass: string = 'app-accordion';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];
    

    [key: string]: unknown;

    // #endregion public properties


    // #region private properties

    // #endregion private properties


    // #region getters/setters

    // #endregion getters/setters


    // #region standard inputs
    @Input() elementType = ElementType.ACCORDION as const;

    @Input() value: unknown = undefined;
    
    @Input() options: PAccordionConfig = {};

    @Input() onCloseHandler(event: AccordionTabCloseEvent): void {}

    @Input() onOpenHandler(event: AccordionTabOpenEvent): void {}


    // #endregion standard inputs


    // #region get/set inputs

    // #endregion get/set inputs


    // #region outputs, emitters, and event listeners

    // #endregion outputs, emitters, and event listeners


    // #region viewchildren and contentchildren
    
    @ViewChild('accordionRef') accordionRef?: Accordion;

    // #endregion viewchildren and contentchildren


    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
    ) {
        super(cd);
    }

    // #endregion constructor and lifecycle hooks


    // #region public methods

    // #endregion public methods


    // #region protected methods

    // #endregion protected methods


    // #region private methods

    // #endregion private methods


}

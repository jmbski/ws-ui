import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Accordion, AccordionModule, AccordionTabCloseEvent, AccordionTabOpenEvent } from 'primeng/accordion';
import { ComponentConfig, AccordionConfig, ElementType, GenericFunction, StyleGroup, WeakObject, PAccordionConfig } from 'warskald-ui/models';
import { initStyleGroups, LoggableComponent, LogLevels } from 'warskald-ui/services';
import { BaseWidget } from '../base-widget';

/**
 * Widget that implements a PrimeNG Accordion component.
 */
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

    /**
     * The default base style class for the component. This gets merged with incoming style classes.
     */
    public defaultBaseStyleClass: string = 'app-accordion';

    /**
     * The combined base style classes for the component.
     */
    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];
    

    [key: string]: unknown;

    // #endregion public properties


    // #region private properties

    // #endregion private properties


    // #region getters/setters

    // #endregion getters/setters


    // #region standard inputs

    /**
     * The type of element to render.
     */
    @Input() elementType = ElementType.ACCORDION as const;

    /**
     * Value input to keep ngComponentOutlet happy
     */
    @Input() value: unknown = undefined;
    
    /**
     * The configuration object for the component.
     */
    @Input() options: PAccordionConfig = {};

    /**
     * Provided function to handle when a tab closes.
     * 
     * @param event - The event object for the close event. 
     * @see {@link AccordionTabCloseEvent}
     */
    @Input() onCloseHandler(event: AccordionTabCloseEvent): void {}

    /**
     * Provided function to handle when a tab opens.
     * 
     * @param event - The event object for the open event. 
     * @see {@link AccordionTabOpenEvent}
     */
    @Input() onOpenHandler(event: AccordionTabOpenEvent): void {}


    // #endregion standard inputs


    // #region get/set inputs

    // #endregion get/set inputs


    // #region outputs, emitters, and event listeners

    // #endregion outputs, emitters, and event listeners


    // #region viewchildren and contentchildren
    
    /**
     * Reference to the accordion component.
     */
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

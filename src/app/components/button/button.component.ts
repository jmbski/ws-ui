import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Button, ButtonModule } from 'primeng/button';
import { ComponentConfig, ButtonConfig, ElementType, GenericFunction, StyleGroup, WeakObject, PButtonConfig } from 'warskald-ui/models';
import { initStyleGroups, LoggableComponent, LogLevels } from 'warskald-ui/services';
import { BaseWidget } from '../base-widget';

/**
 * Widget that implements a PrimeNG Button component.
 */
@LoggableComponent({
    LOCAL_ID: 'ButtonComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-button',
    standalone: true,
    imports: [
        ButtonModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss'
})
export class ButtonComponent extends BaseWidget<unknown> implements ButtonConfig {

    // #region public properties

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
    @Input() elementType = ElementType.BUTTON as const;

    /**
     * Value input to keep ngComponentOutlet happy.
     */
    @Input() value: unknown = undefined;
    
    /**
     * Config options for the primeNG button.
     */
    @Input() options: PButtonConfig = {};

    /**
     * Provided function to handle the click event.
     * 
     * @param event - The event object for the click event.
     * @see {@link MouseEvent}
     */
    @Input() onClickHandler(event: MouseEvent): void {}

    /**
     * Provided function to handle the focus event. 
     * 
     * @param event - The event object for the focus event.
     * @see {@link FocusEvent}
     */
    @Input() onFocusHandler(event: FocusEvent): void {}

    /**
     * Provided function to handle the blur event.
     * 
     * @param event - The event object for the blur event.
     * @see {@link FocusEvent}
     */
    @Input() onBlurHandler(event: FocusEvent): void {}


    // #endregion standard inputs


    // #region get/set inputs

    // #endregion get/set inputs


    // #region outputs, emitters, and event listeners

    // #endregion outputs, emitters, and event listeners


    // #region viewchildren and contentchildren
    
    @ViewChild('buttonRef') buttonRef?: Button;

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

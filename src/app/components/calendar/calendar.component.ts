import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Calendar, CalendarModule, CalendarMonthChangeEvent, CalendarYearChangeEvent } from 'primeng/calendar';
import { ComponentConfig, CalendarConfig, ElementType, GenericFunction, StyleGroup, WeakObject, PCalendarConfig } from 'warskald-ui/models';
import { initStyleGroups, LoggableComponent, LogLevels } from 'warskald-ui/services';
import { BaseWidget } from '../base-widget';

/**
 * Widget that implements a PrimeNG Calendar component.
 */
@LoggableComponent({
    LOCAL_ID: 'CalendarComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-calendar',
    standalone: true,
    imports: [
        CalendarModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CalendarComponent),
            multi: true
        }
    ],
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss'
})
export class CalendarComponent extends BaseWidget<unknown> implements CalendarConfig, ControlValueAccessor {

    // #region public properties

    [key: string]: unknown;

    // #endregion public properties


    // #region private properties

    // #endregion private properties


    // #region getters/setters

    // #endregion getters/setters


    // #region standard inputs
    
    /**
     * The type of element to render. This property is used to identify the {@link ComponentConfig} type.
     */
    @Input() elementType = ElementType.CALENDAR as const;

    /**
     * Date/time value of the calendar.
     */
    @Input() value: unknown = undefined;
    
    /**
     * Config options for the primeNG calendar.
     */
    @Input() options: PCalendarConfig = {};

    
    /**
     * Provided function to handle an onFocus event.
     * 
     * @param event - The event object for the onFocus event. 
     * @see {@link Event}
     */
    @Input() onFocusHandler(event: Event): void {}

    /**
     * Provided function to handle an onBlur event.
     * 
     * @param event - The event object for the onBlur event. 
     * @see {@link Event}
     */
    @Input() onBlurHandler(event: Event): void {}

    /**
     * Provided function to handle an onClose event.
     * 
     * @param event - The event object for the onClose event. 
     */
    @Input() onCloseHandler(event: unknown): void {}
    
    /**
     * Provided function to handle an onSelect event
     * 
     * @param event - The date object for the event. 
     * @see {@link Date}
     */
    @Input() onSelectHandler(event: Date): void {}
    
    /**
     * Provided function to handle an onClear.
     * 
     * @param event - The event object for the onClear. 
     */
    @Input() onClearHandler(event: unknown): void {}

    /**
     * Provided function to handle an onInput event.
     * 
     * @param event - The event object for the onInput event. 
     */
    @Input() onInputHandler(event: unknown): void {}

    /**
     * Provided function to handle an onTodayClick event.
     * 
     * @param event - The date object for the event. 
     * @see {@link Date}
     */
    @Input() onTodayClickHandler(event: Date): void {}
    
    /**
     * Provided function to handle an onClearClick event.
     * 
     * @param event - The event object for the onClearClick event.
     */
    @Input() onClearClickHandler(event: unknown): void {}

    /**
     * Provided function to handle an onMonthChange event.
     * 
     * @param event - The event object for the onMonthChange event.
     * @see {@link CalendarMonthChangeEvent}
     */
    @Input() onMonthChangeHandler(event: CalendarMonthChangeEvent): void {}

    /**
     * Provided function to handle an onYearChange event.
     * 
     * @param event - The event object for the onYearChange event.
     * @see {@link CalendarYearChangeEvent}
     */
    @Input() onYearChangeHandler(event: CalendarYearChangeEvent): void {}
    
    /**
     * Provided function to handle an onClickOutisde event.
     * 
     * @param event - The event object for the onClickOutisde event. 
     */
    @Input() onClickOutsideHandler(event: unknown): void {}

    /**
     * Provided function to handle an onShow event.
     * 
     * @param event - The event object for the onShow event. 
     */
    @Input() onShowHandler(event: unknown): void {}


    // #endregion standard inputs


    // #region get/set inputs

    // #endregion get/set inputs


    // #region outputs, emitters, and event listeners

    // #endregion outputs, emitters, and event listeners


    // #region viewchildren and contentchildren
    
    /**
     * Reference to the calendar component.
     */
    @ViewChild('calendarRef') calendarRef?: Calendar;

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

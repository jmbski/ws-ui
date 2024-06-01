import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Calendar, CalendarModule, CalendarMonthChangeEvent, CalendarYearChangeEvent } from 'primeng/calendar';
import { ComponentConfig, CalendarConfig, ElementType, GenericFunction, StyleGroup, WeakObject, PCalendarConfig } from 'warskald-ui/models';
import { initStyleGroups, LoggableComponent, LogLevels } from 'warskald-ui/services';
import { BaseWidget } from '../base-widget';

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


    public defaultBaseStyleClass: string = 'app-calendar';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];


    [key: string]: unknown;

    // #endregion public properties


    // #region private properties

    // #endregion private properties


    // #region getters/setters

    // #endregion getters/setters


    // #region standard inputs
    @Input() elementType = ElementType.CALENDAR as const;

    @Input() value: unknown = undefined;
    
    @Input() options: PCalendarConfig = {};

    @Input() onFocusHandler(event: Event): void {}

    @Input() onBlurHandler(event: Event): void {}

    @Input() onCloseHandler(event: unknown): void {}

    @Input() onSelectHandler(event: Date): void {}

    @Input() onClearHandler(event: unknown): void {}

    @Input() onInputHandler(event: unknown): void {}

    @Input() onTodayClickHandler(event: Date): void {}

    @Input() onClearClickHandler(event: unknown): void {}

    @Input() onMonthChangeHandler(event: CalendarMonthChangeEvent): void {}

    @Input() onYearChangeHandler(event: CalendarYearChangeEvent): void {}

    @Input() onClickOutsideHandler(event: unknown): void {}

    @Input() onShowHandler(event: unknown): void {}


    // #endregion standard inputs


    // #region get/set inputs

    // #endregion get/set inputs


    // #region outputs, emitters, and event listeners

    // #endregion outputs, emitters, and event listeners


    // #region viewchildren and contentchildren
    
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

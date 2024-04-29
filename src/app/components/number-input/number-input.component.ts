import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ComponentRef, Input, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { nanoid } from 'nanoid';
import { InputNumber, InputNumberInputEvent, InputNumberModule } from 'primeng/inputnumber';
import { ViewContainerRefDirective } from 'warskald-ui/directives';
import { BaseComponentConfig, ElementType, FormElementConfig, ObjectOf, StyleGroup } from 'warskald-ui/models';
import { LoggableComponent, LogLevels } from 'warskald-ui/services';


@LoggableComponent({
    LOCAL_ID: 'NumberInputComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-number-input',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputNumberModule,
        ViewContainerRefDirective,
    ],
    templateUrl: './number-input.component.html',
    styleUrl: './number-input.component.scss'
})
export class NumberInputComponent implements FormElementConfig {

    // #region public properties

    public innerControl!: FormControl;

    public componentRef?: ComponentRef<InputNumber>;

    public refCd?: ChangeDetectorRef;

    [key: string]: unknown;
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs

    
    @Input() hasForm = true as const;
    
    @Input() value: number = 0;
    
    @Input() form?: FormControl<unknown>;
    
    @Input() elementType: ElementType = ElementType.NUMBER_INPUT;
    
    @Input() id: string = nanoid();
    
    @Input() content?: unknown;
    
    @Input() baseStyles?: StyleGroup;
    
    @Input() options?: ObjectOf<InputNumber>;
    
    @Input() children?: BaseComponentConfig[];
    
    @Input() layoutStyles?: StyleGroup;

    @Input() actionID?: string;
    
    // #endregion standard inputs
    
    
    // #region get/set inputs
    
    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren
    @ViewChild('inputNumber') inputNumber?: InputNumber;
    @ViewChild(ViewContainerRefDirective) viewContainerRef?: ViewContainerRefDirective;
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
    ) {
    }

    ngOnInit() {
        this.innerControl = new FormControl(this.value);
    }

    ngAfterViewInit() {
        if(this.options) {
            this.options.showButtons = true;
            this.options.step = 10;
            this.options.buttonLayout = 'horizontal';
            this.cd.detectChanges();
        }
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    public onInputHandler(event: InputNumberInputEvent) {
        this.innerControl.setValue(event.value);
    }

    public onBlurHandler(event: Event) {
        /** @todo add functionality */
    }

    public onFocusHandler(event: Event) {
        /** @todo add functionality */
    }

    public onKeyDownHandler(event: KeyboardEvent) {
        /** @todo add functionality */
    }

    public onClearHandler() {
        this.innerControl.setValue(0);
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

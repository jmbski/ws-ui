import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { ClickableListConfig, ComponentConfig, ElementType, GenericFunction, PButtonConfig, StyleGroup } from 'warskald-ui/models';
import { initStyleGroups, LoggableComponent, LogLevels } from 'warskald-ui/services';
import { BaseWidget } from '../base-widget';

@LoggableComponent({
    LOCAL_ID: 'ClickableListComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-clickable-list',
    standalone: true,
    imports: [
        CommonModule,
        RippleModule,
    ],
    templateUrl: './clickable-list.component.html',
    styleUrl: './clickable-list.component.scss'
})
export class ClickableListComponent extends BaseWidget<unknown> implements ClickableListConfig {

    // #region public properties


    public defaultBaseStyleClass: string = 'ws-clickable';

    public defaultListStyleClass: string = 'ws-clickable-list';

    public defaultItemStyleClass: string = 'ws-clickable-list-item';

    public defaultItemSpanStyleClass: string = 'ws-clickable-list-item-span';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];

    public listStyleClasses: string[] = [this.defaultListStyleClass];

    public itemStyleClasses: string[] = [this.defaultItemStyleClass];

    public itemSpanStyleClasses: string[] = [this.defaultItemSpanStyleClass];


    [key: string]: unknown;
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs

    @Input() elementType = ElementType.CLICKABLE_LIST as const;

    @Input() value: string[] = [];
    
    @Input() options: PButtonConfig = {};

    @Input() orientation?: 'horizontal' | 'vertical' = 'vertical';

    @Input() useRipple?: boolean = true;

    @Input() clickHandler?: GenericFunction<void>;

    @Input() listStyles?: StyleGroup = {};

    @Input() itemStyles?: StyleGroup = {};

    @Input() itemSpanStyles?: StyleGroup = {};


    
    // #endregion standard inputs
    
    
    // #region get/set inputs
    
    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
        public el: ElementRef,
    ) {
        super(cd);
    }

    ngOnInit() {
        console.log(this.el.nativeElement);
    }
    
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

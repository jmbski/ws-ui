import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { nanoid } from 'nanoid';
import { ViewContainerRefDirective } from 'warskald-ui/directives';
import { ElementType, StyleGroup } from 'warskald-ui/models';
import { initStyleGroups, LoggableComponent, LogLevels, NgLogService, RegisterClassType } from 'warskald-ui/services';
import { isString } from 'warskald-ui/type-guards';

@RegisterClassType(ElementType.GENERAL)
@LoggableComponent({
    LOCAL_ID: 'GeneralComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-general',
    standalone: true,
    imports: [
        ViewContainerRefDirective,
    ],
    templateUrl: './general.component.html',
    styleUrl: './general.component.scss'
})
export class GeneralComponent {
    // #region public properties

    public defaultBaseStyleClass = '';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];

    [key: string]: unknown;
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs
    
    @Input() elementType = ElementType.GENERAL as const;

    @Input() id: string = nanoid();
    
    @Input() src?: string;

    @Input() baseStyles?: StyleGroup = {};

    @Input() layoutStyles?: StyleGroup;

    @Input() actionID?: string;

    @Input() content?: string;

    @Input() label?: string;
    
    // #endregion standard inputs
    
    
    // #region get/set inputs
    
    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren

    @ViewChild(ViewContainerRefDirective) viewContainerRef!: ViewContainerRefDirective;
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
        public el: ElementRef,
    ) {
        
    }

    ngOnInit() {
        initStyleGroups.bind(this)();
        const element: HTMLElement = this.el.nativeElement;
        if(element) {
            const newElement: HTMLElement = document.createElement('div');
            newElement.id = this.id + nanoid();
            newElement.innerHTML = this.content || '';
            element.appendChild(newElement);
        }
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

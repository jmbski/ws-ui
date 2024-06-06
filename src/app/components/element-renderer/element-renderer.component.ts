import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, ElementRef, Input, QueryList, Type, ViewChildren } from '@angular/core';
import { ViewContainerRefDirective } from 'warskald-ui/directives';
import { BaseComponentConfig, ElementModel, ElementType, WeakObject, StyleGroup, FormElementConfig, ComponentConfig, FunctionMap, LocalObject, ContainerConfig, NgComponentOutletRef } from 'warskald-ui/models';
import { BehaviorSubject } from 'rxjs';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { IsButtonAction, isCast, isString } from 'warskald-ui/type-guards';
import { LogLevels, NgLogService, LoggableComponent, initStyleGroups, DataService, MinifiedClassMap } from 'warskald-ui/services';
import { nanoid } from 'nanoid';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClassRegistry, RegisterClassType } from 'warskald-ui/services';
import { GeneralComponent } from '../general/general.component';

@RegisterClassType(ElementType.COMPONENT, ElementType.CONTAINER)
@LoggableComponent({
    LOCAL_ID: 'ElementRendererComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-element-renderer',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ViewContainerRefDirective,
    ],
    templateUrl: './element-renderer.component.html',
    styleUrl: './element-renderer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElementRendererComponent implements ContainerConfig {

    // #region public properties


    /** @todo convert to using ComponentDef so templates can be passed in */
    public model$: BehaviorSubject<ElementModel[]> = new BehaviorSubject<ElementModel[]>([]);

    public defaultBaseStyleClass = 'grid grid-nogutter';

    public defaultLayoutClass = 'col';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];

    public layoutClasses: string[] = [this.defaultLayoutClass];

    [key: string]: unknown;
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs
    @Input() value: unknown;

    @Input() hasForm = true as const;

    @Input() hasFormGroup: boolean = false;

    @Input() form?: FormGroup | FormControl;

    @Input() elementType = ElementType.COMPONENT as const;

    @Input() id: string = nanoid();
    
    @Input() baseStyles?: StyleGroup = {};
    
    @Input() styleClass?: string | undefined;
    
    @Input() options?: WeakObject | undefined;
    
    @Input() children?: ComponentConfig[] | undefined;
    
    @Input() layoutStyles?: StyleGroup = {};

    @Input() label?: string = '';

    @Input() actionMap?: FunctionMap;

    @Input() actionID?: string;

    @Input() elementMap: Map<string, unknown> = new Map();
    
    
    // #endregion standard inputs
    
    
    // #region get/set inputs


    /* private _elements: ComponentConfig[] = [];
    @Input()
    get elements(): ComponentConfig[] {
        return this._elements;
    }
    set elements(value: ComponentConfig[]) {
        this._elements = value;
        this.model$.next(this.toModels(value));
        this.cd.detectChanges();
    } */
    @Input() elements: ComponentConfig[] = [];

    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren

    @ViewChildren(NgComponentOutlet) componentRefs?: QueryList<NgComponentOutletRef>;
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
        public el: ElementRef
    ) {
        
    }

    ngOnInit() {
        if(this.actionMap) {
            NgLogService.updateLocalLogSettings(this, {LOCAL_ID: `ElementRendererComponent_${this.id}`});

            this.actionID = `${this.id}_Actions`;
            DataService.registerDataSource({
                id: this.actionID,
                emitFirstValue: false,
                value: '',
            });

            if(isCast<LocalObject>(this)) {
                DataService.subscribeToDataSource(this.actionID, this, (message: unknown) => {
                    if(IsButtonAction(message)) {
                        NgLogService.debug(this, 'fn:ngOnInit', `action: ${message.name}`);
                        const funct = this.actionMap?.[message.name];
                        if(funct) {
                            funct(message.data);
                        }
                    }
                });
            }
        }
    }

    ngAfterViewInit() {
        initStyleGroups.bind(this)();
        this.model$.next(this.toModels(this.elements));
        this.cd.detectChanges();

        console.log('minmap', MinifiedClassMap);
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    public isGroupClass(classType: Type<unknown>): boolean {
        const groupClasses = [
            ElementType.CONTAINER,
            ElementType.PANEL,
        ];

        return groupClasses.some((groupClass) => ClassRegistry.getComponent(groupClass) === classType);
    }
    

    public toModels(elements: ComponentConfig[]): ElementModel[] {
        
        const elementModels = elements.map((element: ComponentConfig) => {

            const { elementType } = element;

            if(isString(elementType)) {
                NgLogService.debug(this, 'fn:toModels', `type: ${elementType}`);
                
                const classType = ClassRegistry.getComponent(elementType) ?? GeneralComponent;
                element.actionID = this.actionID;

                const model: ElementModel = {
                    classType, 
                    elementId: element.id ?? nanoid(),
                    config: element
                };
                
                if(element.hasForm && this.form instanceof FormGroup) {
                    if(classType === ElementRendererComponent || element.hasFormGroup) {
                        const subGroup = new FormGroup({});
                        this.form.addControl(model.elementId, subGroup);
                        model.config.form = subGroup;
                        model.config.actionMap = this.actionMap;
                    }
                    else {
                        const newControl = new FormControl(element.value);
                        this.form.addControl(model.elementId, newControl);
                        model.config.form = newControl;
                    }
                }
                return model;
            }
            return {} as ElementModel;
        });
        
        return elementModels;
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}
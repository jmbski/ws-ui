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


    /**
     * {@link BehaviorSubject} that emits the current model of the component. BehaviorSubject
     * is used to trigger change detection with OnPush change detection strategy. 
     * 
     * @todo convert to using ComponentDef so templates can be passed in 
     * Maybe? Not sure anymore. The current configuration of using ComponentConfig works
     * very well. It's a bit more verbose, but it's very clear what's going on.
    */
    public model$: BehaviorSubject<ElementModel[]> = new BehaviorSubject<ElementModel[]>([]);
    
    /**
     * The default base style class for the component. This gets merged with incoming style classes.
     * This provides a style that wraps the renderer component. Can be overridden
     * by the {@link StyleGroup} overrideDefault property
     */
    public defaultBaseStyleClass = 'grid';

    /**
     * The default layout style class for the component. This gets merged with incoming style classes.
     * This provides a style that wraps the renderer component. Can be overridden
     * by the {@link StyleGroup} overrideDefault property
     */
    public defaultLayoutClass = 'col';

    /**
     * The combined base style classes for the component. Assigned to the renderer component.
     */
    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];

    /**
     * The combined layout style classes for the component. Assigned to the renderer component.
     */
    public layoutClasses: string[] = [this.defaultLayoutClass];

    [key: string]: unknown;
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs
    
    /**
     * Value input to keep ngComponentOutlet happy.
     */
    @Input() value: unknown;

    /**
     * Const value that informs the renderer to add a {@link FormGroup}/{@link FormControl} to the element.
     */
    @Input() hasForm = true as const;

    /**
     * Flag to inform the renderer that the form for the element is a {@link FormGroup}.
     */
    @Input() hasFormGroup: boolean = true;

    /**
     * The form to add the elements to. This can be a {@link FormGroup} or {@link FormControl}.
     */
    @Input() form?: FormGroup | FormControl;

    /**
     * The type of element to render. This property is used to identify the {@link ComponentConfig} type.
     */
    @Input() elementType = ElementType.COMPONENT as const;

    /**
     * The unique ID of the element.
     */
    @Input() id: string = nanoid();
    
    /**
     * The base styles for the component. These are the styles that are applied to the renderer component.
     */
    @Input() baseStyles?: StyleGroup = {};
    
    /**
     * The configuration options for the component. Not used by the renderer, just here to keep ngComponentOutlet happy.
     */
    @Input() options?: WeakObject | undefined;
    
    /**
     * The layout styles for the component. These are the styles that are applied to the renderer component.
     */
    @Input() layoutStyles?: StyleGroup = {};

    /**
     * The label for the element.
     */
    @Input() label?: string = '';

    /**
     * Action map for the element. This is a map of functions that are called when an action is triggered.
     * The key is the action name and the value is the function to call.
     */
    @Input() actionMap?: FunctionMap;

    /**
     * The element ID of the {@link ElementRendererComponent} that will receive the action data.
     * This is only generated in the root element renderer component.
     */
    @Input() actionID?: string;
    
    
    // #endregion standard inputs
    
    
    // #region get/set inputs
    
    /**
     * The elements to render in the component.
     * @see {@link ComponentConfig}
     */
    @Input() elements: ComponentConfig[] = [];

    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
        public el: ElementRef
    ) {
        
    }

    ngOnInit() {
        if(this.actionMap) {
            // Add a unique logging ID for the component
            NgLogService.updateLocalLogSettings(this, {LOCAL_ID: `ElementRendererComponent_${this.id}`});

            // Register the action data source for the component
            this.actionID = `${this.id}_Actions`;
            DataService.registerDataSource({
                id: this.actionID,
                emitFirstValue: false,
                value: '',
            });

            // Subscribe to the data source to handle events
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
        // Initialize the style groups
        initStyleGroups.bind(this)();

        // Convert the elements to models
        this.model$.next(this.toModels(this.elements));
        this.cd.detectChanges();
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    /**
     * Converts the {@link ComponentConfig} elements to {@link ElementModel} models.
     * 
     * @param elements - The elements to convert to models.
     * @returns The converted models.
     */
    public toModels(elements: ComponentConfig[]): ElementModel[] {
        
        const elementModels = elements.map((element: ComponentConfig) => {

            const { elementType } = element;

            if(isString(elementType)) {
                NgLogService.debug(this, 'fn:toModels', `type: ${elementType}`);
                
                // Get the class type for the element using the {@link ClassRegistry}
                const classType = ClassRegistry.getComponent(elementType) ?? GeneralComponent;

                element.actionID = this.actionID;

                const model: ElementModel = {
                    classType, 
                    elementId: element.id ?? nanoid(),
                    config: element
                };
                
                /**
                 * If the element has a form, add the form control to the form group.
                 * If the element is a {@link ElementRendererComponent} or has a form group, add a form group.
                 * The idea here is that if the element is a container, it should have a form group. And
                 * the initial form group should be provided as an input, so that the form group can be
                 * passed down to the children as well as referenced externally in the component that
                 * uses the renderer.
                 */
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
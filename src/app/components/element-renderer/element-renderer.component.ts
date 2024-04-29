import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, Input, ViewChildren } from '@angular/core';
import { ViewContainerRefDirective } from 'warskald-ui/directives';
import { BaseComponentConfig, ElementModel, ElementType, WeakObject, StyleGroup, ElementComponentMap, FormElementConfig, ComponentConfig, FunctionMap, LocalObject } from 'warskald-ui/models';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { isCast, isString } from 'warskald-ui/type-guards';
import { LogLevels, NgLogService, LoggableComponent, initStyleGroups, DataService } from 'warskald-ui/services';
import { nanoid } from 'nanoid';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ImageComponent } from '../image/image.component';
import { TextBlockComponent } from '../text-block/text-block.component';
import { TextInputComponent } from '../text-input/text-input.component';
import { NumberInputComponent } from '../number-input/number-input.component';
import { ButtonGroupComponent } from '../button-group/button-group.component';

const { 
    BUTTON_GROUP,
    CHECKBOX,
    COMPONENT, 
    CONTAINER, 
    IMAGE, 
    NUMBER_INPUT,
    SELECT,
    TEXT_BLOCK, 
    TEXT_INPUT 
} = ElementType;


@LoggableComponent({
    LOCAL_ID: 'ElementRendererComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Debug
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
export class ElementRendererComponent implements BaseComponentConfig, FormElementConfig {

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

    @Input() form?: FormGroup;

    @Input() elementType: ElementType = COMPONENT;

    @Input() id: string = nanoid();

    @Input() content?: unknown;
    
    @Input() baseStyles?: StyleGroup = {};
    
    @Input() styleClass?: string | undefined;
    
    @Input() options?: WeakObject | undefined;
    
    @Input() children?: ComponentConfig[] | undefined;
    
    @Input() layoutStyles?: StyleGroup = {};

    @Input() label?: string = '';

    @Input() actionMap?: FunctionMap;

    @Input() actionID?: string;

    
    
    // #endregion standard inputs
    
    
    // #region get/set inputs

    private _elements: ComponentConfig[] = [];
    @Input()
    get elements() {
        return this._elements;
    }
    set elements(input: ComponentConfig[]) {

        this._elements = input;
        //this.model$.next(this.toModels(input));

    //        LogService.debug(this, 'exiting', `model$: ${this.model$.value}`);
    }
    

    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren

    @ViewChildren(ViewContainerRefDirective) public viewContainerRefs?: ViewContainerRefDirective[];
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef
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
                    const action = message as string;
                    if(this.actionMap?.[action]) {
                        this.actionMap[action]();
                    }
                });
            }
        }
    }

    ngAfterViewInit() {
        initStyleGroups.bind(this)();
        this.model$.next(this.toModels(this.elements));
        this.cd.detectChanges();
        
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    public toModels(elements: ComponentConfig[]): ElementModel[] {
        
        const elementModels = elements.map((element: ComponentConfig) => {
            const { elementType } = element;
            if(isString(elementType)) {
                NgLogService.debug(this, 'fn:toModels', `type: ${elementType}`);
                const classType = ElementComponentsMap[elementType];
                element.actionID = this.actionID;
                const model: ElementModel = {
                    classType,
                    elementId: element.id ?? nanoid(),
                    config: element
                };

                if(element.hasForm && this.form) {
                    if(classType === ElementRendererComponent) {
                        const subGroup = new FormGroup({});
                        this.form.addControl(model.elementId, subGroup);
                        model.config.form = subGroup;
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


export const ElementComponentsMap: ElementComponentMap = {
    [BUTTON_GROUP]: ButtonGroupComponent,
    [COMPONENT]: ElementRendererComponent,
    [CONTAINER]: ElementRendererComponent,
    [IMAGE]: ImageComponent,
    [NUMBER_INPUT]: NumberInputComponent,
    [TEXT_BLOCK]: TextBlockComponent,
    [TEXT_INPUT]: TextInputComponent,
};

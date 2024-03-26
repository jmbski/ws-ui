import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Type, ViewChildren } from '@angular/core';
import { ViewContainerRefDirective } from 'warskald-ui/directives';
import { ComponentClassBase, IComponentConfig, ElementModel, ElementType, ElementComponentMap } from 'warskald-ui/models';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ImageComponent } from 'warskald-ui/components/image';
import { TextBlockComponent } from 'warskald-ui/components/text-block';
import { isString } from 'warskald-ui/type-guards';
import { DynamicComponent } from 'warskald-ui/components/dynamic';
import { Loggable, LoggableObject, LogLevel, LogService } from 'warskald-ui/services';
import { nanoid } from 'nanoid';

const { COMPONENT, CONTAINER, IMAGE, TEXT_BLOCK } = ElementType;


@Component({
    selector: 'ws-element-renderer',
    standalone: true,
    imports: [
        CommonModule,
        DynamicComponent,
        ViewContainerRefDirective,
    ],
    templateUrl: './element-renderer.component.html',
    styleUrl: './element-renderer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElementRendererComponent extends ComponentClassBase implements LoggableObject{

    readonly LOCAL_ID: string = 'ElementRendererComponent_' + nanoid();
    canLog?: boolean = true;
    localLogLevel?: LogLevel = LogLevel.Error;

    // #region public properties

    /** @todo convert to using ComponentDef so templates can be passed in */
    public model$: BehaviorSubject<ElementModel[]> = new BehaviorSubject<ElementModel[]>([]);

    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs

    private _elements: IComponentConfig[] = [];
    @Input()
    get elements() {
        return this._elements;
    }
    set elements(input: IComponentConfig[]) {
        LogService.debug(this, 'setting elements', 'input:', input);

        this._elements = input;
        this.model$.next(this.toModels(input));

    //        LogService.debug(this, 'exiting', `model$: ${this.model$.value}`);
    }
    
    private _elementConfig?: IComponentConfig;
    @Input()
    get elementConfig() {
        return this._elementConfig;
    }
    set elementConfig(input: IComponentConfig | undefined) {
        this._elementConfig = input;
        this.config = input;
    }
    
    // #endregion standard inputs
    
    
    // #region get/set inputs
    
    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren

    @ViewChildren(ViewContainerRefDirective) public viewContainerRefs?: ViewContainerRefDirective[];
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
    ) {
        super();
    }

    ngAfterViewInit() {
        this.cd.detectChanges();
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    @Loggable()
    public toModels(elements: IComponentConfig[]): ElementModel[] {

        const elementModels = elements.map((element: IComponentConfig) => {
            const { type } = element;
            if(isString(type)) {
                const classType = ElementComponentsMap[type];
                const model: ElementModel = {
                    classType,
                    config: element,
                };
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
    [COMPONENT]: ElementRendererComponent,
    [CONTAINER]: ElementRendererComponent,
    [IMAGE]: ImageComponent,
    [TEXT_BLOCK]: TextBlockComponent,
};

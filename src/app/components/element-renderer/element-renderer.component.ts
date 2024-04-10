import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChildren } from '@angular/core';
import { ViewContainerRefDirective } from 'warskald-ui/directives';
import { ComponentClassBase, IComponentConfig, ElementModel, ElementType, ElementComponentMap, WeakObject } from 'warskald-ui/models';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ImageComponent } from '../image/_index';
import { TextBlockComponent } from '../text-block/_index';
import { isString } from 'warskald-ui/type-guards';
import { DynamicComponent } from '../dynamic/_index';
import { LogLevels, NgLogService, LoggableComponent } from 'warskald-ui/services';
import { nanoid } from 'nanoid';

const { COMPONENT, CONTAINER, IMAGE, TEXT_BLOCK } = ElementType;


@LoggableComponent({
    LOCAL_ID: 'ElementRendererComponent_' + nanoid(),
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Debug
})
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
export class ElementRendererComponent implements ComponentClassBase {

    // #region public properties

    /** @todo convert to using ComponentDef so templates can be passed in */
    public model$: BehaviorSubject<ElementModel[]> = new BehaviorSubject<ElementModel[]>([]);

    
    
    
    
    
    
    
    
    
    [key: string]: unknown;
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs

    @Input() elementType: ElementType = COMPONENT;
    @Input() id: string = nanoid();
    @Input() content?: unknown;
    @Input() style?: string | Partial<CSSStyleDeclaration> | undefined;
    @Input() styleClass?: string | undefined;
    @Input() options?: WeakObject | undefined;
    @Input() children?: IComponentConfig[] | undefined;
    @Input() layoutClass?: string | undefined;
    @Input() layoutStyle?: string | undefined;

    
    
    // #endregion standard inputs
    
    
    // #region get/set inputs

    private _elements: IComponentConfig[] = [];
    @Input()
    get elements() {
        return this._elements;
    }
    set elements(input: IComponentConfig[]) {

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
    }

    ngAfterViewInit() {
        this.cd.detectChanges();
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    public toModels(elements: IComponentConfig[]): ElementModel[] {

        const elementModels = elements.map((element: IComponentConfig) => {
            const { elementType } = element;
            if(isString(elementType)) {
                NgLogService.debug(this, 'fn:toModels', `type: ${elementType}`);
                const classType = ElementComponentsMap[elementType];
                const model: ElementModel = {
                    classType,
                    elementId: element.id ?? nanoid(),
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

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Type, ViewChildren } from '@angular/core';
import { ViewContainerRefDirective } from 'warskald-ui/directives';
import { ComponentClassBase, IComponentConfig, ElementModel, ElementType } from 'warskald-ui/models';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ImageComponent } from 'warskald-ui/components/image';
import { TextBlockComponent } from 'warskald-ui/components/text-block';
import { IsString } from 'warskald-ui/type-guards';
import { DynamicComponent } from 'warskald-ui/components/dynamic';


export type ElementComponentMap = Record<string, Type<unknown>>;

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
export class ElementRendererComponent extends ComponentClassBase {

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
        this._elements = input;
        this.model$.next(this.toModels(input));
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

    public toModels(elements: IComponentConfig[]): ElementModel[] {
        return elements.map((element: IComponentConfig) => {
            const { type } = element;
            if(IsString(type)) {
                const classType = ElementComponentsMap[type];
                const model: ElementModel = {
                    classType,
                    config: element,
                };
                return model;
            }
            return {} as ElementModel;
        });
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

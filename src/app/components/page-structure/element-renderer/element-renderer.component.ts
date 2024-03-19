import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChildren } from '@angular/core';
import { ANGULAR_COMMON, PRIME_COMMON, ViewContainerRefDirective } from '@common';
import { ComponentClassBase, IComponentConfig, ElementModel } from '@models';
import { BehaviorSubject } from 'rxjs';
import { ElementRenderService } from '@services';

@Component({
    selector: 'ws-element-renderer',
    standalone: true,
    imports: [
        ViewContainerRefDirective,
        ...ANGULAR_COMMON,
        ...PRIME_COMMON
    ],
    templateUrl: './element-renderer.component.html',
    styleUrl: './element-renderer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElementRendererComponent extends ComponentClassBase {

    // #region public properties

    public model$: BehaviorSubject<IComponentConfig[]> = new BehaviorSubject<IComponentConfig[]>([]);

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
        this.model$.next(input);
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
        const elements = Array.from(this.viewContainerRefs || []);

        const elementModels: ElementModel[] = elements.map((container: ViewContainerRefDirective) => {
            const config = this.elements.find((element: IComponentConfig) => element.id === container.id);
            return { container, config };
        })
            .filter((elementModel: ElementModel) => elementModel.config !== undefined);

        ElementRenderService.RenderElements(elementModels);

        this.cd.detectChanges();
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}


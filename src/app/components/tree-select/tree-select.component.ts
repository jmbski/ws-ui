import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TreeFilterEvent, TreeNodeUnSelectEvent, TreeNodeSelectEvent } from 'primeng/tree';
import { TreeSelect, TreeSelectModule, TreeSelectNodeCollapseEvent, TreeSelectNodeExpandEvent } from 'primeng/treeselect';
import { BaseComponentConfig, TreeSelectConfig, ElementType, GenericFunction, StyleGroup, WeakObject, PTreeSelectConfig, ComponentConfig } from 'warskald-ui/models';
import { initStyleGroups, LoggableComponent, LogLevels } from 'warskald-ui/services';
import { BaseWidget } from '../base-widget';

@LoggableComponent({
    LOCAL_ID: 'TreeSelectComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-tree-select',
    standalone: true,
    imports: [
        TreeSelectModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TreeSelectComponent),
            multi: true
        }
    ],
    templateUrl: './tree-select.component.html',
    styleUrl: './tree-select.component.scss'
})
export class TreeSelectComponent extends BaseWidget<unknown> implements TreeSelectConfig, ControlValueAccessor {

    // #region public properties


    public defaultBaseStyleClass: string = 'app-tree-select';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];


    [key: string]: unknown;

    // #endregion public properties


    // #region private properties

    // #endregion private properties


    // #region getters/setters

    // #endregion getters/setters


    // #region standard inputs
    @Input() elementType = ElementType.TREE_SELECT as const;

    @Input() value: unknown = undefined;
    
    @Input() options: PTreeSelectConfig = {};

    @Input() onNodeExpandHandler(event: TreeSelectNodeExpandEvent): void {}

    @Input() onNodeCollapseHandler(event: TreeSelectNodeCollapseEvent): void {}

    @Input() onShowHandler(event: Event): void {}

    @Input() onHideHandler(event: Event): void {}

    @Input() onClearHandler(event: unknown): void {}

    @Input() onFilterHandler(event: TreeFilterEvent): void {}

    @Input() onNodeUnselectHandler(event: TreeNodeUnSelectEvent): void {}

    @Input() onNodeSelectHandler(event: TreeNodeSelectEvent): void {}


    // #endregion standard inputs


    // #region get/set inputs

    // #endregion get/set inputs


    // #region outputs, emitters, and event listeners

    // #endregion outputs, emitters, and event listeners


    // #region viewchildren and contentchildren
    
    @ViewChild('treeSelectRef') treeSelectRef?: TreeSelect;

    // #endregion viewchildren and contentchildren


    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
    ) {
        super(cd);
    }

    // #endregion constructor and lifecycle hooks


    // #region public methods
    
    // #endregion public methods


    // #region protected methods

    // #endregion protected methods


    // #region private methods

    // #endregion private methods


}

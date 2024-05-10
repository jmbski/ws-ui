import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TreeFilterEvent, TreeNodeUnSelectEvent, TreeNodeSelectEvent } from 'primeng/tree';
import { TreeSelect, TreeSelectModule, TreeSelectNodeCollapseEvent, TreeSelectNodeExpandEvent } from 'primeng/treeselect';
import { BaseComponentConfig, TreeSelectConfig, ElementType, GenericFunction, StyleGroup, WeakObject, PTreeSelectConfig, ComponentConfig } from 'warskald-ui/models';
import { initStyleGroups, LoggableComponent, LogLevels } from 'warskald-ui/services';

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
export class TreeSelectComponent implements TreeSelectConfig, ControlValueAccessor {

    // #region public properties


    public defaultBaseStyleClass: string = 'app-tree-select';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];
    
    public innerControl: FormControl = new FormControl(undefined);


    [key: string]: unknown;

    // #endregion public properties


    // #region private properties

    // #endregion private properties


    // #region getters/setters

    // #endregion getters/setters


    // #region standard inputs
    @Input() elementType = ElementType.TREE_SELECT as const;

    @Input() value: unknown = undefined;

    @Input() hasForm = true as const;

    @Input() form?: FormControl | FormGroup;

    @Input() label?: string;

    @Input() actionID?: string;

    @Input() id: string = '';

    @Input() baseStyles?: StyleGroup = {};
    
    @Input() options: PTreeSelectConfig = {};

    @Input() children?: ComponentConfig[];

    @Input() layoutStyles?: StyleGroup = {};

    @Input() onChanged: GenericFunction<void> = () => {};

    @Input() onTouched: GenericFunction<void> = () => {};

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
    
    }

    ngOnInit() {
        initStyleGroups.bind(this)();
        this.cd.detectChanges();

        this.innerControl = new FormControl(this.value);
        this.innerControl.valueChanges.subscribe((value) => {
            this.onChanged(value);
            this.onTouched(value);
            this.writeValue(value);
        });
    }

    // #endregion constructor and lifecycle hooks


    // #region public methods

    public writeValue(obj: unknown): void {
        this.value = obj;
        this.form?.patchValue(this.value);
    }

    public registerOnChange(fn: GenericFunction<unknown>): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: GenericFunction<unknown>): void {
        this.onTouched = fn;
    }

    public setDisabledState?(isDisabled: boolean): void {
        isDisabled ? this.innerControl?.disable() : this.innerControl?.enable();
    }

    // #endregion public methods


    // #region protected methods

    // #endregion protected methods


    // #region private methods

    // #endregion private methods


}

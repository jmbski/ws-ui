import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { nanoid } from 'nanoid';
import { ElementType, GenericFunction, HtmlEditorConfig, StyleGroup } from 'warskald-ui/models';
import { initStyleGroups, LoggableComponent, LogLevels } from 'warskald-ui/services';
import { EditorInitEvent, EditorModule, EditorTextChangeEvent } from 'primeng/editor';
import { debounceTime } from 'rxjs';
import Quill from 'quill';

@LoggableComponent({
    LOCAL_ID: 'HtmlEditorComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-html-editor',
    standalone: true,
    imports: [
        CommonModule,
        EditorModule,
        ReactiveFormsModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HtmlEditorComponent),
            multi: true
        }
    ],
    templateUrl: './html-editor.component.html',
    styleUrl: './html-editor.component.scss'
})
export class HtmlEditorComponent implements HtmlEditorConfig, ControlValueAccessor {

    // #region public properties

    public defaultBaseStyleClass: string = 'w-full';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];

    public editorControl: FormControl = new FormControl('');

    public editorRef?: Quill;

    [key: string]: unknown;
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs
    
    @Input() elementType = ElementType.HTML_EDITOR as const;

    @Input() id: string = nanoid();
    
    @Input() src?: string;

    @Input() baseStyles?: StyleGroup = {};

    @Input() layoutStyles?: StyleGroup;

    @Input() actionID?: string;

    @Input() label?: string;

    @Input() hasForm = true as const;

    @Input() form?: FormControl<unknown>;

    @Input() onChange: GenericFunction<void> = () => {};

    @Input() onTouched: GenericFunction<void> = () => {};
    
    // #endregion standard inputs
    
    
    // #region get/set inputs

    private _value: string = '';
    @Input()
    get value() {
        return this._value;
    }
    set value(input: string) {
        this._value = input;
        this.onChange(input);
        this.onTouched();
        this.form?.patchValue(input);
    }
    
    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
    ) {
        
    }

    ngAfterViewInit() {
        initStyleGroups.bind(this)();
        this._initialize();
    }
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    
    
    writeValue(obj: string): void {
        this.value = obj;
    }

    registerOnChange(fn: GenericFunction<void>): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: GenericFunction<void>): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        if(isDisabled) {
            this.editorControl.disable();
            this.form?.disable();
        }
        else {
            this.editorControl.enable();
            this.form?.enable();
        }
    }

    public onTextChange(event: EditorTextChangeEvent) {

    }

    public editorInit(event: EditorInitEvent) {
        this.editorRef = event.editor;
        this.editorRef?.clipboard.dangerouslyPasteHTML(this.value);
    }
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods

    private _initialize() {
        this.editorControl = new FormControl(this.value);
        this.cd.detectChanges();
        this.editorControl.valueChanges.pipe(debounceTime(500)).subscribe(value => {
            this.writeValue(value);
        });

        initStyleGroups.bind(this)();
    }

    // #endregion private methods
    
    
}

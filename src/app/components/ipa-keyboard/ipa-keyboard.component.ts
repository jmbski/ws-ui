import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ComponentConfig, ElementType, FormElementConfig, GenericFunction, StyleGroup, WeakObject } from 'warskald-ui/models';
import { initStyleGroups, LoggableComponent, LogLevels } from 'warskald-ui/services';
import { IpaData, IpaMapping } from './ipa-map';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';

@LoggableComponent({
    LOCAL_ID: 'IpaKeyboardComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-ipa-keyboard',
    standalone: true,
    imports: [
        ButtonModule,
        DialogModule,
        CommonModule,
        ReactiveFormsModule,
        TooltipModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => IpaKeyboardComponent),
            multi: true
        }
    ],
    templateUrl: './ipa-keyboard.component.html',
    styleUrl: './ipa-keyboard.component.scss'
})
export class IpaKeyboardComponent implements FormElementConfig {

    // #region public properties

    public defaultBaseStyleClass: string = 'app-ipa-keyboard';

    public baseStyleClasses: string[] = [this.defaultBaseStyleClass];

    public innerControl: FormControl = new FormControl(undefined);

    public ipaMap: IpaData[] = IpaMapping;

    public visible: boolean = true;


    [key: string]: unknown;
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs
    
    @Input() elementType = ElementType.IPA_KEYBOARD as const;

    @Input() value: string = '';

    @Input() hasForm = true as const;

    @Input() form?: FormControl | FormGroup;

    @Input() label?: string;

    @Input() actionID?: string;

    @Input() id: string = '';

    @Input() baseStyles?: StyleGroup = {};
    
    @Input() options?: WeakObject;

    @Input() children?: ComponentConfig[];

    @Input() layoutStyles?: StyleGroup = {};

    @Input() onChanged: GenericFunction<void> = () => {};

    @Input() onTouched: GenericFunction<void> = () => {};

    
    // #endregion standard inputs
    
    
    // #region get/set inputs
    
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

    public writeValue(obj: string): void {
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

    public showDialog(): void {
        this.visible = true;
    }



    public onCharClick(char: string) {
        
        const clipboard: Clipboard = navigator.clipboard;
        clipboard.writeText(char);
        console.log('Copied to clipboard:', char);
        /* if(event.value) {
            const clipboard: Clipboard = navigator.clipboard;
            clipboard.writeText(event.value);
            this.toastSvc.showSuccess(`Copied ${event.value} to clipboard`);
        } */
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

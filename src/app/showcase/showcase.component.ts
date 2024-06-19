import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoremIpsum } from 'lorem-ipsum';
import { nanoid } from 'nanoid';
import { ToastModule } from 'primeng/toast';
import { 
    BlockableUiComponent, 
    DynamicComponent, 
    ElementRendererComponent,
    HtmlEditorComponent,
    ImageComponent,
    MenuBarComponent,
    NavLogoComponent,
    PageLayoutComponent,
    PullToRefreshComponent,
    SvgComponent,
    TabbedResponseTableComponent,
    TextBlockComponent,
    TopNavComponent,
    WsTableComponent
} from 'warskald-ui/components';
import { ElementType, BaseComponentConfig, PageLayoutConfig, ComponentConfig, WeakObject, FunctionMap, PMultiSelectConfig, ButtonAction, ContainerConfig, DictionaryConfig, PanelConfig, PPanelConfig } from 'warskald-ui/models';
import { DialogManagerService, FormService, LayoutService, LoggableComponent, LogLevels, NgLogService, ThemeService, ToastService } from 'warskald-ui/services';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { isString } from 'lodash';
import { IsButtonAction } from '../type-guards/page-type-guards';
import { CustomKeysComponent } from '../components/custom-keys/custom-keys.component';
import { ButtonModule } from 'primeng/button';
import { BehaviorSubject } from 'rxjs';
import { getFormDialog } from '../components/element-renderer/form-dialog';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

const { 
    BUTTON_GROUP,
    CHECKBOX,
    CONTAINER, 
    TEXT_BLOCK, 
    INPUT_TEXT 
} = ElementType;

export interface MegaMenuConfig {
    style?: { [klass: string]: unknown } | null | undefined;
    styleClass?: string | undefined;
    orientation?: 'horizontal' | 'vertical' | string;
    id?: string | undefined;
    ariaLabel?: string | undefined;
    ariaLabelledBy?: string | undefined;
    disabled?: boolean;
    tabindex?: number;
}

@LoggableComponent({
    LOCAL_ID: 'ShowcaseComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error
})
@Component({
    selector: 'ws-showcase',
    standalone: true,
    imports: [
        BlockableUiComponent,
        ButtonModule,
        CommonModule,
        DynamicComponent,
        ElementRendererComponent,
        HtmlEditorComponent,
        ImageComponent,
        CustomKeysComponent,
        MenuBarComponent,
        NavLogoComponent,
        PageLayoutComponent,
        PullToRefreshComponent,
        ReactiveFormsModule,
        RouterOutlet,
        SvgComponent,
        TabbedResponseTableComponent,
        TextBlockComponent,
        ToastModule,
        TopNavComponent,
        WsTableComponent,
    ],
    templateUrl: './showcase.component.html',
    styleUrl: './showcase.component.scss'
})
export class ShowcaseComponent {

    // #region public properties


    public lorem = new LoremIpsum({
        sentencesPerParagraph: {
            max: 8,
            min: 4
        },
        wordsPerSentence: {
            max: 16,
            min: 4
        }
    });

    public elements: ComponentConfig[] = [];

    public charClasses: string[] = [
        'illuminated',
        'illuminated-red',
        'illuminated-blue',
        /* 'illuminated-green',
        'illuminated-yellow',
        'illuminated-purple',
        'illuminated-cyan', */
    ];

    public borderClasses: string[] = [
        'illuminated-border',
        'illuminated-border-red',
        /* 'illuminated-border-blue',
        'illuminated-border-green',
        'illuminated-border-yellow',
        'illuminated-border-purple',
        'illuminated-border-cyan', */
    ];
    public pageLayoutConfig?: PageLayoutConfig;

    public textValue: string = 'test';

    public formGroup: FormGroup = new FormGroup({});

    public testObj: WeakObject = {
        test: 5,
        test2: 'test2',
        test3: 'test3',
        test4: {
            test5: 'test5',
            test6: 'test6'
        }
    };

    public actionMap: FunctionMap = {
        submit: (data?: WeakObject) => {
            
            console.log('submit', this.formGroup.value, data);
        },
        cancel: () => {
            console.log('cancel');
        },
        addChar: (data?: WeakObject) => {
            const { target, char } = data ?? {};
            if(isString(target) && isString(char)) {
                const value = this.formGroup.get(target)?.value;
                this.formGroup.get(target)?.setValue(value + char);
                this.formGroup.updateValueAndValidity();
                this.cd.detectChanges();
            }
        }
    };

    public textListener$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    public autoCompleteData: SelectItem[] = [
        { label: 'Test 1', value: 'test1' },
        { label: 'Test 2', value: 'test2' },
        { label: 'Test 3', value: 'test3' },
        { label: 'Test 4', value: 'test4' },
        { label: 'Test 5', value: 'test5' },
    ];

    public autoSuggestions: SelectItem[] = [];

    public panelElements: ComponentConfig[] = [
        FormService.getButtonElement({id: 'button_test', label: 'Test Button', layoutClass: 'col-2', 
            handler: () => {console.log('test button clicked');}}),
        
    ];

    public panelChanges$: BehaviorSubject<ComponentConfig[]> = new BehaviorSubject<ComponentConfig[]>(this.panelElements);

    public testButton = FormService.getButtonElement({id: 'button_test', label: 'Test Button', layoutClass: 'col-2', 
        handler: (event: MouseEvent) => {
            event.stopPropagation();
            const longStrList = Array.from({ length: 40 }, (_, i) => `Test ${i + 1}`);
            this.panelElements = [FormService.getListElement('Test', longStrList, {
                listStyles: {
                    style: {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                        gap: '16px',
                        maxHeight: '300px',
                        overflow: 'hidden',
                    }
                }
            })];
            this.panelChanges$.next(this.panelElements);
        }
    });

    public formComponents: ComponentConfig[] = [
        FormService.getTextElement('Test', 'test', 'col-12', false, 'Test'),
        {
            elementType: ElementType.BUTTON_GROUP,
            id: 'button_group_1',
            buttons: [
                {
                    id: 'button_1',
                    label: 'Submit',
                    action: {
                        name: 'submit',
                        data: { id: 'test' }
                    }
                }
            ]
        },
        FormService.getStandardContainer({label:'Showcase Components', id: 'container_1', elements: [
            FormService.getGeneralElement('This showcase is a collection of components that can be used in the Warskald UI library.'),
        ]}),
        FormService.getButtonElement({id:'button_dlg', label:'Open Dialog', layoutClass: 'col-2', handler: () => this.openDialog()}),
        FormService.getPanelForm('test panel', 'panel_1', [], {
            headerContent: [this.testButton],
            headerType: 'components',
            contentChanges$: this.panelChanges$,
        }),
    ];

    /* public formComponents: ComponentConfig[] = [
        {
            elementType: ElementType.AUTO_COMPLETE,
            id: 'auto_complete_1',
            hasForm: true,
            data: this.autoCompleteData,
            options: {
                dropdown: true,
                
            }
        },
        FormService.getButtonElement('button_add_test', 'Add', undefined, () => {
            const dataLength = this.autoCompleteData.length;
            this.autoCompleteData.push({ label: `Test ${dataLength + 1}`, value: `test${dataLength + 1}` });
        }),
        FormService.getCustomKeysElement('custom-keys', 'text_area_1', {t: 't', v: 'v', c: 'c'}, '', 'fa-solid fa-keyboard'),
        {
            elementType: ElementType.DICTIONARY,
            id: 'dictionary_1',
            hasForm: true,
            layoutStyles: {
                baseClass: 'col-12'
            },
            value: {
                test: 'test',
                test2: 2,
                test3: false,
                test4: ['test4', 'test5'],
            },
            keyLabel: 'Syllable',
            valueLabel: 'Weight',
            keyTooltip: 'Grouping of orthographic characters',
            valueTooltip: 'The weight of the syllable\'s occurrence. Higher weights are more likely to be selected.',
            usePanel: true,
            options: {
                header: 'Dictionary',
                collapsed: false,
                toggleable: true,
                toggler: 'header',
            },
            enableEdit: true,
            enableNewKeys: true,
            initialType: 'number',
        },
        {
            elementType: ElementType.CLICKABLE_LIST,
            id: 'clickable_list_1',
            clickHandler: (item: string, event: MouseEvent) => {
                console.log('clicked:', item);
            },
            hasForm: true,
            orientation: 'vertical',
            value: ['test1', 'test2', 'test3'],
        },
        {
            elementType: ElementType.MULTI_SELECT,
            value: [],
            id: 'cb1',
            hasForm: true,
            optionValues: [
                { label: 'Test 1', value: 'test1' },
                { label: 'Test 2', value: 'test2' },
                { label: 'Test 3', value: 'test3' },
                { label: 'Test 4', value: 'test4' },
                { label: 'Test 5', value: 'test5' },
            ],
            label: 'Test Input 1',
            layoutStyles: {
                baseClass: 'col-6'
            },
            options: <PMultiSelectConfig>{
                tooltip: 'This is a tooltip'
            }
        },
        {
            elementType: BUTTON_GROUP,
            id: 'button_group_1',

            buttons: [
                {
                    id: 'button_1',
                    label: 'Submit',
                    action: {
                        name: 'submit',
                        data: { id: 'text_area_1' }
                    }
                }
            ],
        },
        {
            elementType: ElementType.BUTTON,
            id: 'button__1',
            options: {
                label: 'Test'
            },
            onClickHandler: (event: MouseEvent) => {
                console.log('Button Clicked');
                this.textListener$.next('test from subject');
            }
        },
        {
            elementType: ElementType.COLOR_PICKER,
            id: 'color_1',
            hasForm: true,
            value: '#ff0000',
            label: 'Color Picker',
            layoutStyles: {
                baseClass: 'col-3'
            },
            options: {
                appendTo: 'body',
                inline: false,
            }
        },
        {
            elementType: ElementType.KNOB,
            hasForm: true,
            id: 'knob_1',
            value: 50,
            label: 'Knob',
            layoutStyles: {
                baseClass: 'col-3'
            },
            options: {
                rangeColors: ['#ff0000', '#00ff00', '#0000ff']
            }
        },
        {
            elementType: ElementType.CALENDAR,
            id: 'calendar_1',
            hasForm: true,
            value: new Date(),
            label: 'Calendar',
            layoutStyles: {
                baseClass: 'col-3'
            },
            options: {
                appendTo: 'body',
                inline: false,
                timeOnly: true,
                showSeconds: true,
            }
        },
        {
            elementType: ElementType.SLIDER,
            id: 'slider_1',
            hasForm: true,
            value: 50,
            label: 'Slider',
            layoutStyles: {
                baseClass: 'col-3'
            },
            options: {
                animate: true,
            }
        },
        {
            elementType: ElementType.TOGGLE_BUTTON,
            id: 'toggle_1',
            hasForm: true,
            value: false,
            label: 'Toggle Button',
            layoutStyles: {
                baseClass: 'col-3'
            },
            options: {
                onLabel: 'On',
                offLabel: 'Off',
            }
        },
        {
            elementType: ElementType.SPLIT_BUTTON,
            id: 'split_1',
            hasForm: true,
            label: 'Split Button',
            layoutStyles: {
                baseClass: 'col-3'
            },
            options: {
                model: [
                    { label: 'Option 1', command: () => console.log('Option 1') },
                    { label: 'Option 2', command: () => console.log('Option 2') },
                    { label: 'Option 3', command: () => console.log('Option 3') },
                ],
                icon: 'pi pi-plus',
                iconPos: 'right',
                style: { width: '100%' },
                dropdownIcon: 'pi pi-chevron-down',
                label: 'Test Split Button',
            },
            onClickHandler: (event: MouseEvent) => {
                console.log('Split Button Clicked');
            }
        },
        {
            elementType: ElementType.TEXT_AREA,
            id: 'text_area_1',
            hasForm: true,
            value: 'test',
            label: 'Test Text Area',
            layoutStyles: {
                baseClass: 'col-6'
            },
            options: {
                autoResize: true,
                rows: 5,
                cols: 30,

            },
        },
        {
            elementType: ElementType.HTML_EDITOR,
            id: 'general_1',
            label: 'General',
            layoutStyles: {
                baseClass: 'col-6'
            },
            hasForm: true,
            value: '<h1><span class="ql-font-monospace">Companions Griffon-Dore</span></h1><p><br></p><p>this is a test</p>',
        },
        {
            elementType: INPUT_TEXT,
            id: 'text_2',
            hasForm: true,
            value: 'test2',
            label: 'Test Input 2',
            layoutStyles: {
                baseClass: 'col-4'
            },
            disabled: true,
            //externalListener$: this.textListener$
        },
        {
            elementType: ElementType.CUSTOM_KEYS,
            id: 'ipa_1',
            hasForm: true,
            attachTo: 'text_2',
            layoutStyles: {
                baseClass: 'col-2'
            }
        },
        {
            elementType: INPUT_TEXT,
            id: 'text_3',
            hasForm: true,
            value: 'test3',
            layoutStyles: {
                baseClass: 'col-12'
            }
        },
        {
            elementType: CONTAINER,
            id: 'container_1',
            hasForm: true,
            label: 'Container',
            value: '',
            layoutStyles: {
                baseClass: 'col-12'
            },
            elements: [
                {
                    elementType: INPUT_TEXT,
                    id: 'text_4',
                    hasForm: true,
                    value: 'test4',
                    layoutStyles: {
                        baseClass: 'col'
                    }
                },
                {
                    elementType: INPUT_TEXT,
                    id: 'text_5',
                    hasForm: true,
                    value: 'test5',
                    layoutStyles: {
                        baseClass: 'col'
                    }
                },
                {
                    elementType: INPUT_TEXT,
                    id: 'text_6',
                    hasForm: true,
                    value: 'test6',
                    layoutStyles: {
                        baseClass: 'col'
                    }
                },
            ]
        }
    ]; */
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region standard inputs
    
    // #endregion standard inputs
    
    
    // #region get/set inputs
    
    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren

    @ViewChild('pageLayout') pageLayout?: PageLayoutComponent;
    @ViewChild('formComponent') formComponent?: ElementRendererComponent;
    @ViewChild('testContent') testContent?: TemplateRef<unknown>;
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
        private dialogMgr: DialogManagerService,
    ) {

    }

    ngOnInit() {

        this.formGroup.valueChanges.subscribe(changes => {
            FormService.patchValues(changes, this.testObj);
        });

        this.cd.detectChanges();

        this.pageLayoutConfig = LayoutService.getLayout('showcase');
        
    }

    ngAfterViewInit() {
    }
    
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    getPanelForm(header: string, id: string, elements: ComponentConfig[]): PanelConfig {
        return {
            elementType: ElementType.PANEL,
            id,
            hasForm: true,
            content: elements,
            layoutStyles: {
                baseClass: 'col-12'
            },
            options: {
                toggleable: true,
                toggler: 'header',
                collapsed: true,
                header,
            },
            hasFormGroup: true,
        };
    }

    triggerGlow = FormService.triggerAnimation;
      
    public openDialog() {
        /* const topRefs = Array.from(this.formComponent?.componentRefs ?? []);
        topRefs.forEach((ref) => {
            console.log('ref:', ref._componentRef.changeDetectorRef);
        }); */
        const value = {
            test: ['a', 'b', 'c'],
            test2: 2,
            test3: 3,
            test4: 1,
        };
        
        const formElement = FormService.getDictionaryForm({ value, label: 'Test Dictionary', id: 'dictionary_1', 
            options: {
                keyLabel: 'Syllable',
                valueLabel: 'Weight',
                keyTooltip: 'Grouping of orthographic characters',
                valueTooltip: 'The weight of the syllable\'s occurrence. Higher weights are more likely to be selected.',
                initialType: 'number',
                useSortByValues: true,
                reverseSort: true,
            }
        });

        const panelForm = this.getPanelForm('Test Panel', 'panel_1', [formElement]);
        const { options, form } = getFormDialog('Test Dialog', [panelForm]);
        options.modal = false;
        const dialogRef = this.dialogMgr.openModularDialog(options);

        dialogRef?.onSubmit.subscribe(() => {
            console.log('submit:', form.value);
            ToastService.showInfo('Submitted');
        });
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

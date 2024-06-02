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
import { ElementType, BaseComponentConfig, PageLayoutConfig, ComponentConfig, WeakObject, FunctionMap, PMultiSelectConfig, ButtonAction, ContainerConfig } from 'warskald-ui/models';
import { DialogManagerService, FormService, LayoutService, LoggableComponent, LogLevels, NgLogService, ThemeService } from 'warskald-ui/services';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { isString } from 'lodash';
import { IsButtonAction } from '../type-guards/page-type-guards';
import { IpaKeyboardComponent } from '../components/ipa-keyboard/ipa-keyboard.component';
import { ButtonModule } from 'primeng/button';
import { BehaviorSubject } from 'rxjs';
import { getFormDialog } from '../components/element-renderer/form-dialog';

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
        IpaKeyboardComponent,
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

    public formComponents: ComponentConfig[] = [
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
            /* action: {
                name: 'submitWord',
            }, */
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
            elementType: ElementType.IPA_KEYBOARD,
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
    ];
    
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

        interface test {
            test: number;
            test2?: string;
            test3?: string;
        }

        const test: test = {
            test: 5,
        };

        console.log('PROTO',Object.getPrototypeOf(test));
    }

    ngOnInit() {
        NgLogService.customKeyListeners['5'] = () => {
            console.log(this.formGroup.value);
        };

        //this.formComponents = FormService.objToElements(this.testObj);
        this.formGroup.valueChanges.subscribe(changes => {
            FormService.patchValues(changes, this.testObj);
            //console.log(this.testObj);
        });

        ThemeService.switchTheme('viva-dark', 'secondary-theme');

        this.cd.detectChanges();
        this.pageLayoutConfig = LayoutService.getLayout('showcase');
        

        this.elements = [
            {
                elementType: TEXT_BLOCK,
                id: nanoid(),
                value: 'Welcome to the home of La Compagnie du Griffon Doré!',
                layoutStyles: {
                    baseClass: 'w-full'
                },
                baseStyles: {
                    style: {
                        display: 'flex',
                        justifyContent: 'center',
                    }
                },
                bodyStyles: {
                    style: {
                        fontSize: '3em',
                        textAlign: 'center',
                        width: '100%',
                        fontWeight: 'bold',

                    },
                    baseClass: 'black-castle '
                }
            },
            {
                elementType: TEXT_BLOCK,
                id: nanoid(),
                escapeHTML: true,
                value: 'Ferrum Omnia Regit - Iron rules Everything',
                layoutStyles: {
                    baseClass: 'w-full'
                },
                baseStyles: {
                    style: {
                        display: 'flex',
                        justifyContent: 'center',
                    }
                },
                bodyStyles: {
                    style: {
                        fontSize: '1.5em',
                        textAlign: 'center',
                        width: '100%',
                    },
                    baseClass: 'black-castle '
                }
            },
        ];
        /* this.borderClasses.forEach((borderClass, borderIndex) => {
            this.charClasses.forEach((charClass, index) => {
                const text = this.lorem.generateParagraphs(1);
                const newElements: BaseComponentConfig[] = [];

                const newElement: BaseComponentConfig = {
                    elementType: ElementType.TEXT_BLOCK, 
                    content: text,
                    illuminated: index % 2 === 0,
                    illuminatedColor: charClass,
                    illuminatedBorder: borderClass,
                    id: `text-block-${index + borderIndex * 7}`,
                };

                newElements.push(newElement);

                if(!newElement.illuminated) {
                    newElements.push({
                        elementType: ElementType.IMAGE,
                        src: 'app/assets/images/wulfgard-ermine-alpha.png',
                        baseStyles: {
                            style: {
                                width: '150px',
                                float: 'right',
                            }
                        },
                        id: `image-${index + borderIndex * 7}`,
                    });
                }

                this.elements.push(...newElements);
            });
        }); */
    }

    ngAfterViewInit() {
    }
    
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    public openDialog() {
        /* const topRefs = Array.from(this.formComponent?.componentRefs ?? []);
        topRefs.forEach((ref) => {
            console.log('ref:', ref._componentRef.changeDetectorRef);
        }); */

        const { options, form } = getFormDialog('Test Dialog', FormService.objToElements(this.testObj));
        
        const dialogRef = this.dialogMgr.openModularDialog(options);

        dialogRef?.onSubmit.subscribe(() => {
            console.log('submit:', form.value);
        });
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
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
import { ElementType, BaseComponentConfig, PageLayoutConfig, ComponentConfig, WeakObject, ButtonAction, FunctionMap } from 'warskald-ui/models';
import { FormService, LayoutService, LoggableComponent, LogLevels, NgLogService, ThemeService } from 'warskald-ui/services';
import { TextInputComponent } from '../components/text-input/text-input.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

const { BUTTON_GROUP: BUTTONS, CONTAINER, TEXT_BLOCK, TEXT_INPUT } = ElementType;

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
        CommonModule,
        DynamicComponent,
        ElementRendererComponent,
        HtmlEditorComponent,
        ImageComponent,
        MenuBarComponent,
        NavLogoComponent,
        PageLayoutComponent,
        PullToRefreshComponent,
        ReactiveFormsModule,
        RouterOutlet,
        SvgComponent,
        TabbedResponseTableComponent,
        TextBlockComponent,
        TextInputComponent,
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
        submit: () => {
            console.log('submit', this.formGroup.value);
        },
        cancel: () => {
            console.log('cancel');
        }
    };

    public formComponents: ComponentConfig[] = [

        {
            elementType: TEXT_INPUT,
            id: 'text_1',
            hasForm: true,
            value: 'test1',
            label: 'Test Input 1',
            layoutStyles: {
                baseClass: 'col-6'
            }
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
            elementType: TEXT_INPUT,
            id: 'text_2',
            hasForm: true,
            value: 'test2',
            label: 'Test Input 2',
            layoutStyles: {
                baseClass: 'col-6'
            }
        },
        {
            elementType: TEXT_INPUT,
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
            layoutStyles: {
                baseClass: 'col-12'
            },
            elements: [
                {
                    elementType: TEXT_INPUT,
                    id: 'text_4',
                    hasForm: true,
                    value: 'test4',
                    layoutStyles: {
                        baseClass: 'col'
                    }
                },
                {
                    elementType: TEXT_INPUT,
                    id: 'text_5',
                    hasForm: true,
                    value: 'test5',
                    layoutStyles: {
                        baseClass: 'col'
                    }
                },
                {
                    elementType: TEXT_INPUT,
                    id: 'text_6',
                    hasForm: true,
                    value: 'test6',
                    layoutStyles: {
                        baseClass: 'col'
                    }
                },
            ]
        },
        {
            elementType: BUTTONS,
            id: 'buttons_1',
            buttons: [
                {
                    id: 'submit',
                    label: 'Submit',
                    action: ButtonAction.SUBMIT,
                },
                {
                    id: 'cancel',
                    label: 'Cancel',
                    action: ButtonAction.CANCEL,
                },
            ],
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
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
    ) {

    }

    ngOnInit() {
        NgLogService.customKeyListeners['5'] = () => {
            console.log(this.formGroup.value);
        };

        //this.formComponents = FormService.objToElements(this.testObj);
        this.formGroup.valueChanges.subscribe(changes => {
            FormService.patchValues(changes, this.testObj);
            console.log(this.testObj);
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
    
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

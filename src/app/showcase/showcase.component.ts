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
import { ElementType, BaseComponentConfig, PageLayoutConfig, ComponentConfig } from 'warskald-ui/models';
import { LayoutService, LoggableComponent, LogLevels } from 'warskald-ui/services';

const { TEXT_BLOCK } = ElementType;

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
        ImageComponent,
        MenuBarComponent,
        NavLogoComponent,
        PageLayoutComponent,
        PullToRefreshComponent,
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
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
    ) {

    }

    ngOnInit() {

        this.pageLayoutConfig = LayoutService.getLayout('showcase');

        this.elements = [
            {
                elementType: TEXT_BLOCK,
                id: nanoid(),
                content: 'Welcome to the home of La Compagnie du Griffon Doré!',
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
                content: 'Ferrum Omnia Regit - Iron rules Everything',
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

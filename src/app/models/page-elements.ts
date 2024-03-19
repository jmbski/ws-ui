import { ViewContainerRefDirective } from '@common';
import { CssStyleObject, RecordObject } from '@models';

/**
 * Represents a block of text meant to be rendered as an illuminated text block.
 */
export interface TextBlockConfig extends IComponentConfig {
    readonly elementType: ElementType.TEXT_BLOCK;
    content: string;
    illuminated?: boolean;
    illuminatedColor?: string;
    illuminatedBorder?: string;

    [key: string]: unknown;
}

export interface ContainerConfig extends IComponentConfig {
    readonly elementType: ElementType.CONTAINER;
    elements: IComponentConfig[];
}

export interface ImageConfig extends IComponentConfig {
    readonly elementType: ElementType.IMAGE;
    src?: string;
}

/**
 * Union type of all possible element configs
 */
export type ComponentConfig = TextBlockConfig | ContainerConfig | ImageConfig;


export enum ElementType {
    TEXT_BLOCK = 'text-block',
    CONTAINER = 'container',
    IMAGE = 'image',
    COMPONENT = 'component'
}

/**
 * Represents an element to render on a page
 */
export interface IComponentConfig {

    /**
     * The type of element to render
     */
    readonly elementType: ElementType; // @todo: add type/enum later

    /**
     * The id of the element
     */
    id: string;

    /**
     * The content to render in the element
     */
    content?: unknown;

    /**
     * The style to apply to the element
     */
    style?: string | CssStyleObject;
    
    /**
     * The style class to apply to the element
     */
    styleClass?: string;

    /**
     * The options to apply to the element
     */
    options?: RecordObject;

    /**
     * The children of the element
     */
    children?: IComponentConfig[];

    /**
     * Styleclasses to use for the layout of the element
     */
    layoutClass?: string;

    /**
     * Style to use for the layout of the element
     */
    layoutStyle?: string;

    [key: string]: unknown;
}


/**
 * Represents an element to render on a page
 */
export class ComponentClassBase implements IComponentConfig {

    /**
     * The type of element to render
     */
    public elementType: ElementType = ElementType.COMPONENT; // @todo: add type/enum later

    /**
     * The id of the element
     */
    public id: string = '';

    /**
     * The content to render in the element
     */
    public content?: unknown;

    /**
     * The style to apply to the element
     */
    public style?: string | CssStyleObject;
    
    /**
     * The style class to apply to the element
     */
    public styleClass?: string;

    /**
     * The options to apply to the element
     */
    public options?: RecordObject;

    /**
     * The children of the element
     */
    public children?: IComponentConfig[];

    /**
     * Styleclasses to use for the layout of the element
     */
    public layoutClass?: string;

    /**
     * Style to use for the layout of the element
     */
    public layoutStyle?: string;

    // config?: ComponentConfig;
    private _config?: IComponentConfig;
    get config() {
        return this._config;
    }
    set config(input: IComponentConfig | undefined) {
        this._config = input;
        if(input && this.parseConfig) {
            this.parseConfig(input);
        }
    }

    [key: string]: unknown;

    constructor(parser?: ConfigParser) {
        this.parseConfig = parser?.bind(this) ?? DefaultConfigParser.bind(this);
        
    }

    parseConfig?: (config: IComponentConfig) => void;
}

export type ConfigParser = (this: ComponentClassBase, config: IComponentConfig) => void;

export function DefaultConfigParser(this: ComponentClassBase, config: IComponentConfig): void {
    Object.keys(config).forEach((key) => {
        try {
            this[key] = config[key];
        }
        catch(error: unknown) {
            if(!(error instanceof TypeError)) {
                console.error(error);
            }
        }
    });
}
export interface ElementModel {
    container: ViewContainerRefDirective;
    config?: IComponentConfig;
}
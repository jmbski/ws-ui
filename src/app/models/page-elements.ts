import { WeakObject } from './general';
import { CssStyleObject } from './style-types';
import { Component, Inject, Input, Type } from '@angular/core';

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

export type ElementComponentMap = Record<string, Type<unknown>>;

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
    options?: WeakObject;

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
@Component({
    selector: 'ws-component-class-base',
    template: ''
})
export class ComponentClassBase implements IComponentConfig {

    /**
     * The type of element to render
     */
    @Input() elementType: ElementType = ElementType.COMPONENT; // @todo: add type/enum later

    /**
     * The id of the element
     */
    @Input() id: string = '';

    /**
     * The content to render in the element
     */
    @Input() content?: unknown;

    /**
     * The style to apply to the element
     */
    @Input() style?: string | CssStyleObject;
    
    /**
     * The style class to apply to the element
     */
    @Input() styleClass?: string;

    /**
     * The options to apply to the element
     */
    @Input() options?: WeakObject;

    /**
     * The children of the element
     */
    @Input() children?: IComponentConfig[];

    /**
     * Styleclasses to use for the layout of the element
     */
    @Input() layoutClass?: string;

    /**
     * Style to use for the layout of the element
     */
    @Input() layoutStyle?: string;

    // config?: ComponentConfig;
    /* private _config?: IComponentConfig;
    @Input()
    get config() {
        return this._config;
    }
    set config(input: IComponentConfig | undefined) {
        this._config = input;
        if(input && this.parseConfig) {
            this.parseConfig(input);
        }
    } */

    [key: string]: unknown;

    /* constructor(@Inject(CONFIG_PARSER)parser?: ConfigParser) {
        this.parseConfig = parser?.bind(this) ?? DefaultConfigParser.bind(this);
    } */
    constructor() {}

    /* parseConfig: (config: IComponentConfig) => void = DefaultConfigParser.bind(this); */
}

export type ConfigParser = (this: ComponentClassBase, config: IComponentConfig) => void;

export interface ElementModel {
    classType?: Type<unknown>;
    config?: IComponentConfig;
    elementId: string;
}
import { WeakObject } from './general';
import { CssStyleObject, StyleGroup } from './style-types';
import { Type } from '@angular/core';

/**
 * Represents an element to render on a page
 */
export interface BaseComponentConfig {

    LOCAL_ID?: string;

    canLog?: boolean;

    localLogLevel?: number;

    /**
     * The type of element to render
     */
    elementType: ElementType; // @todo: add type/enum later

    /**
     * The id of the element
     */
    id: string;

    /**
     * The content to render in the element
     */
    content?: unknown;

    /**
     * Styles and classes to apply to the element
     */
    styles?: StyleGroup;

    /**
     * The options to apply to the element
     */
    options?: WeakObject;

    /**
     * The children of the element
     */
    children?: BaseComponentConfig[];

    /**
     * Styles and classes to use for the layout of the element
     */
    layoutStyles?: StyleGroup;

    [key: string]: unknown;
}

/**
 * Represents a block of text meant to be rendered as an illuminated text block.
 */
export interface TextBlockConfig extends BaseComponentConfig {
    elementType: ElementType.TEXT_BLOCK;
    content: string;
    illuminated?: boolean;
    illuminatedColor?: string;
    illuminatedBorder?: string;
    bodyStyles?: StyleGroup;
}

export interface ContainerConfig extends BaseComponentConfig {
    elementType: ElementType.CONTAINER;
    elements?: BaseComponentConfig[];
}

export interface WsImageConfig extends BaseComponentConfig {
    elementType: ElementType.IMAGE;
    src?: string;
    imageStyles?: StyleGroup;
}

/**
 * Union type of all possible element configs
 */
export type ComponentConfig = TextBlockConfig | ContainerConfig | WsImageConfig;


export enum ElementType {
    TEXT_BLOCK = 'text-block',
    CONTAINER = 'container',
    IMAGE = 'image',
    COMPONENT = 'component'
}

export type ElementComponentMap = Record<string, Type<unknown>>;


export interface ElementModel {
    classType?: Type<unknown>;
    config?: BaseComponentConfig;
    elementId?: string;
}
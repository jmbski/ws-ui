import { CssStyleObject, NgStyleValues } from 'warskald-ui/models';
import { isString } from 'warskald-ui/type-guards';

type DialogBoundsKey = 'top' | 'bottom' | 'left' | 'right' | 'height' | 'width';
const dialogBoundsKeys: DialogBoundsKey[] = ['top', 'bottom', 'left', 'right', 'height', 'width'];

export class DialogBounds {
    private _top: number = 0;
    set top(value: number) {
        this._top = Math.round(value);
    }
    get top(): string {
        return this._top + 'px';
    }

    private _bottom: number = 0;
    set bottom(value: number) {
        this._bottom = Math.round(value);
    }
    get bottom(): string {
        return this._bottom + 'px';
    }

    private _left: number = 0;
    set left(value: number) {
        this._left = Math.round(value);
    }
    get left(): string {
        return this._left + 'px';
    }

    private _right: number = 0;
    set right(value: number) {
        this._right = Math.round(value);
    }
    get right(): string {
        return this._right + 'px';
    }

    private _height: number = 0;
    set height(value: number) {
        this._height = Math.round(value);
    }
    get height(): string {
        return this._height + 'px';
    }

    private _width: number = 0;
    set width(value: number) {
        this._width = Math.round(value);
    }
    get width(): string {
        return this._width + 'px';
    }

    public element?: HTMLElement;
    public navBoundaryElement?: HTMLElement;
    public constrainToViewport: boolean = true;

    /**
     * Class to manage the bounds of a dialog element
     * 
     * To use this class, create a new instance with the element you want to manage.
     * And a possible navBoundaryElement to check if the dialog is within the viewport.
     * 
     * @param element - The element to manage the bounds of
     * @param navBoundaryElement - An element representing a boundary within the viewport (such as a nav bar)
     * @param constrainToViewport - Whether to check the bounds of the element against the viewport (default: true)
     */
    constructor(
        element?: HTMLElement, 
        navBoundaryElement?: HTMLElement | string,
        constrainToViewport: boolean = true,
    ) {
        
        if(element) {
            const bounds: DOMRect = element.getBoundingClientRect();
            this.element = element;

            this.top = bounds.top;
            this.bottom = bounds.bottom;
            this.left = bounds.left;
            this.right = bounds.right;
            this.height = bounds.height;
            this.width = bounds.width;
        }

        if(isString(navBoundaryElement)) {
            const element = document.querySelector(navBoundaryElement);
            if(element instanceof HTMLElement) {
                navBoundaryElement = element;
            }
        }

        if(navBoundaryElement instanceof HTMLElement) {
            this.navBoundaryElement = navBoundaryElement;
        }

        this.constrainToViewport = constrainToViewport;
        if(constrainToViewport) {
            this.checkViewportBounds();
        }
    }

    /**
     * Return the desired properties of the bounds element as a style object
     * 
     * @param props - The properties to include in the style object
     * @returns - A style object with the specified properties
     */
    public toStyle(props: DialogBoundsKey[] = dialogBoundsKeys, unsetProps?: DialogBoundsKey[]): CssStyleObject {
        const style: CssStyleObject = {};
        if(props) {
            props.forEach(prop => {
                    
                style[prop] = this[prop]; 
            });
        }
        else {
            Object.assign(style, this);
        }

        unsetProps?.forEach(prop => {
            style[prop] = 'unset';
        
        });
        return style;
    }

    /**
     * Update the element with the current bounds.
     * 
     * Converts the class instances boundary properties to a style object and assigns it to the element.
     * 
     * @param props - The properties to update on the element (default: all properties)
     */
    public updateElement(
        props: DialogBoundsKey[] = dialogBoundsKeys, 
        overrideMaxBounds: boolean = false,
        unsetProps?: DialogBoundsKey[],
    ) {
        if(this.element) {

            const style = this.toStyle(props, unsetProps);
            if(overrideMaxBounds) {
                this.element.classList.add('max-w-max', 'max-h-max');
            }
            else {
                this.element.classList.remove('max-w-max', 'max-h-max');
            }
            Object.assign(this.element.style, style);
        }
    }

    /**
     * Set the bounds properties of the instance with the provided values.
     * 
     * @param bounds - The bounds properties to set
     */
    public setBounds(
        bounds: Partial<DOMRect>, 
        updateProps?: DialogBoundsKey[], 
        updateElement: boolean = false,
    ) {
        if(bounds.top != null) {
            this.top = bounds.top;
        }
        if(bounds.bottom != null) {
            this.bottom = bounds.bottom;
        }
        if(bounds.left != null) {
            this.left = bounds.left;
        }
        if(bounds.right != null) {
            this.right = bounds.right;
        }
        if(bounds.height != null) {
            this.height = bounds.height;
            if(this.constrainToViewport && this.navBoundaryElement) {
                const { bottom } = this.navBoundaryElement.getBoundingClientRect();
                const { offsetHeight } = document.body;
                const maxHeight = offsetHeight - bottom;

                if(bounds.height && bounds.height > maxHeight) {
                    this.top = bottom;
                    this.height = maxHeight;
                }
            }
        }
        if(bounds.width != null) {
            this.width = bounds.width;
        }


        if(updateProps && updateElement) {
            this.updateElement(updateProps);
        }
    }

    /**
     * Update the bounds properties of the instance with the current element bounds.
     * 
     * If an element is provided, it will update the instance with the bounds of that element,
     * and update the element property of the instance.
     * 
     * @param element - Optional element to retrieve the bounds of for this instance
     */
    public updateBounds(element?: HTMLElement | string, updateProps?: DialogBoundsKey[]) {
        if(element instanceof HTMLElement) {
            this.element = element;
        }
        else if(isString(element)) {
            const el = document.querySelector(element);
            if(el instanceof HTMLElement) {
                this.element = el;
            }
        }

        if(this.element) {
            const bounds: DOMRect = this.element.getBoundingClientRect();
            updateProps ??= dialogBoundsKeys;

            this.setBounds(bounds, updateProps);
            
        }
    }

    /**
     * Check the bounds of the element against the viewport and adjust if necessary.
     * 
     * This will also check against the navBoundaryElement if one is provided.
     */
    public checkViewportBounds() {
        if(this.element) {

            // Get the bounds of the element and the viewport
            const { top, bottom, left, right, height, width } = this.element.getBoundingClientRect();
            const { offsetHeight, offsetWidth } = document.body;


            
            // Get the bottom of the navBoundaryElement
            const { bottom: navBottom } = this.navBoundaryElement?.getBoundingClientRect() ?? {};

            /** @todo Add the math to check for more than just the bottom of the boundary element */
            
            // Check the bounds of the element against the viewport
            if(top < 0) {
                this.top = 0;
            }
            if(bottom > offsetHeight) {
                this.bottom = offsetHeight;
            }
            if(left < 0) {
                this.left = 0;
            }
            if(right > offsetWidth) {
                this.right = offsetWidth;
            }
            if(navBottom && navBottom > top) {
                this.top = navBottom;
            }
            if(height > offsetHeight) {
                this.height = offsetHeight;
            }
            if(width > offsetWidth) {
                this.width = offsetWidth;
            }

            this.updateElement(['top']);
        }
    }

}

export interface DialogBoundaryStates {
    open: DialogBounds;
    closed: DialogBounds;
    collapsed: DialogBounds;
    maximized: DialogBounds;

    [key: string]: DialogBounds;
}
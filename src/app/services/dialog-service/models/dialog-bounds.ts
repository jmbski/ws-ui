import { NgStyleValues } from 'warskald-ui/models';

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

    constructor(element?: HTMLElement, bounds?: DOMRect, navBoundaryElement?: HTMLElement) {
        if(element) {
            bounds ??= element.getBoundingClientRect();
            this.element = element;
        }

        if(bounds) {
            this.top = bounds.top;
            this.bottom = bounds.bottom;
            this.left = bounds.left;
            this.right = bounds.right;
            this.height = bounds.height;
            this.width = bounds.width;
        }

        if(navBoundaryElement) {
            this.navBoundaryElement = navBoundaryElement;
            this.checkViewportBounds();
        }
    }

    public toStyle(props: DialogBoundsKey[] = dialogBoundsKeys): NgStyleValues {
        const style: NgStyleValues = {};
        if(props) {
            props.forEach(prop => {
                style[prop] = this[prop];
            });
        }
        else {
            Object.assign(style, this);
        }
        return style;
    }

    public updateElement(props: DialogBoundsKey[] = dialogBoundsKeys) {
        if(this.element) {
            const style = this.toStyle(props);
            Object.assign(this.element.style, style);
        }
    }

    public checkViewportBounds() {
        if(this.element) {
            const { top, bottom, left, right, height, width } = this.element.getBoundingClientRect();
            const { offsetHeight, offsetWidth } = document.body;
            
            const { bottom: navBottom } = this.navBoundaryElement?.getBoundingClientRect() ?? {};

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
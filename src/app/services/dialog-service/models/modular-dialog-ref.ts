import { Observable, Subject } from 'rxjs';
/**
 * Dynamic Dialog instance.
 * @group Components
 */
export class ModularDialogRef {

    public dialogID: string = '';
    public title?: string;

    constructor() {}

    /**
     * Closes dialog.
     * @group Method
     */
    close(result?: unknown) {
        this._onClose.next(result);

        setTimeout(() => {
            this._onClose.complete();
        }, 1000);
    }

    /**
     * Destroys the dialog instance.
     * @group Method
     */
    destroy() {
        this._onDestroy.next(null);
    }

    /**
     * Callback to invoke on drag start.
     * @param {MouseEvent} event - Mouse event.
     * @group Method
     */
    dragStart(event: MouseEvent) {
        this._onDragStart.next(event);
    }

    /**
     * Callback to invoke on drag end.
     * @param {MouseEvent} event - Mouse event.
     * @group Method
     */
    dragEnd(event: MouseEvent) {
        this._onDragEnd.next(event);
    }

    /**
     * Callback to invoke on resize start.
     * @param {MouseEvent} event - Mouse event.
     * @group Method
     */
    resizeInit(event: MouseEvent) {
        this._onResizeInit.next(event);
    }

    /**
     * Callback to invoke on resize start.
     * @param {MouseEvent} event - Mouse event.
     * @group Method
     */
    resizeEnd(event: MouseEvent) {
        this._onResizeEnd.next(event);
    }
    
    /**
     * Callback to invoke on dialog is maximized.
     * @param {*} value - Size value.
     * @group Method
     */
    maximize(value: unknown) {
        this._onMaximize.next(value);
    }

    /**
     * Callback to invoke on dialog is minimized.
     * @group Method
     */
    minimize() {
        this._onMinimize.next(null);
    }

    /**
     * Callback to invoke on dialog is restored.
     * @group Method
     */
    restore() {
        this._onRestore.next(null);
    }

    /**
     * Callback to invoke on dialog is pinned.
     * @group Method
     * @note Not implemented.
     */
    pin() {
        this._onPin.next(null);
    }

    /**
     * Callback to invoke on dialog is unpinned.
     * @group Method
     * @note Not implemented.
     */
    unpin() {
        this._onUnpin.next(null);
    }

    /**
     * Callback to invoke on dialog is toggled.
     * @param {boolean} value - Toggle value.
     * @group Method
     */
    toggle(value: boolean) {
        this._onToggle.next(value);
    }

    /**
     * Callback to invoke on dialog is submitted. This is used as a separate relay between the
     * generated modular dialog and its inner content for the child component to to inform the 
     * parent modular dialog that it is ready to be submitted. This in turn will trigger the 
     * onClose() event with the submitted data
     * 
     * @param {unknown} value - Data to consume upon submitting.
     * @group Method
     */
    submit(...args: unknown[]) {
        this._onSubmit.next(args);
    }

    /**
     * Callback to invoke on dialog is cancelled. This is used as a separate relay between the
     * generated modular dialog and its inner content for the child component to to inform the
     * parent modular dialog that it is ready to be cancelled. This in turn will trigger the
     * onClose() event with the cancelled data
     * 
     * @group Method
     */
    cancel(...args: unknown[]) {
        this._onCancel.next(args);
    }

    private readonly _onClose = new Subject<unknown>();
    /**
     * Event triggered on dialog is closed.
     * @group Events
     */
    onClose: Observable<unknown> = this._onClose.asObservable();

    private readonly _onDestroy = new Subject<unknown>();
    /**
     * Event triggered on dialog instance is destroyed.
     * @group Events
     */
    onDestroy: Observable<unknown> = this._onDestroy.asObservable();

    private readonly _onDragStart = new Subject<unknown>();
    /**
     * Event triggered on drag start.
     * @param {MouseEvent} event - Mouse event.
     * @group Events
     */
    onDragStart: Observable<unknown> = this._onDragStart.asObservable();

    private readonly _onDragEnd = new Subject<unknown>();
    /**
     * Event triggered on drag end.
     * @param {MouseEvent} event - Mouse event.
     * @group Events
     */
    onDragEnd: Observable<unknown> = this._onDragEnd.asObservable();

    private readonly _onResizeInit = new Subject<unknown>();
    /**
     * Event triggered on resize start.
     * @param {MouseEvent} event - Mouse event.
     * @group Events
     */
    onResizeInit: Observable<unknown> = this._onResizeInit.asObservable();

    private readonly _onResizeEnd = new Subject<unknown>();
    /**
     * Event triggered on resize end.
     * @param {MouseEvent} event - Mouse event.
     * @group Events
     */
    onResizeEnd: Observable<unknown> = this._onResizeEnd.asObservable();

    private readonly _onMaximize = new Subject<unknown>();
    /**
     * Event triggered on resize end.
     * @param {*} value - Size value.
     * @group Events
     */
    onMaximize: Observable<unknown> = this._onMaximize.asObservable();

    private readonly _onMinimize = new Subject<unknown>();
    /**
     * Event triggered on minimize.
     * @group Events
     */
    onMinimize: Observable<unknown> = this._onMinimize.asObservable();

    private readonly _onRestore = new Subject<unknown>();
    /**
     * Event triggered on restore.
     * @group Events
     */
    onRestore: Observable<unknown> = this._onRestore.asObservable();

    private readonly _onPin = new Subject<unknown>();
    /**
     * Event triggered on pin.
     * @group Events
     */
    onPin: Observable<unknown> = this._onPin.asObservable();

    private readonly _onUnpin = new Subject<unknown>();
    /**
     * Event triggered on unpin.
     * @group Events
     */
    onUnpin: Observable<unknown> = this._onUnpin.asObservable();

    private readonly _onToggle = new Subject<boolean>();
    /**
     * Event triggered on toggle.
     * @param {boolean} value - Toggle value.
     * @group Events
     */
    onToggle: Observable<unknown> = this._onToggle.asObservable();

    private readonly _onSubmit = new Subject<unknown | undefined>();
    /**
     * Event triggered on submit. 
     * @param {unknown} value - Data to consume upon submitting.
     * @group Events
     */
    onSubmit: Observable<unknown | undefined> = this._onSubmit.asObservable();

    private readonly _onCancel = new Subject<unknown | undefined>();
    /**
     * Event triggered on cancel.
     * @group Events
     */
    onCancel: Observable<unknown | undefined> = this._onCancel.asObservable();
    
}
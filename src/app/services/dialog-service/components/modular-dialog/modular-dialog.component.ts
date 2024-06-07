import { ChangeDetectorRef, Component, ComponentRef, EventEmitter, Output, QueryList, TemplateRef, Type, ViewChild, ViewChildren } from '@angular/core';
import { ComponentType, DialogComponentType, GenericFunction, HTMLRef, StyleGroup, WeakObject } from 'warskald-ui/models';
import { DialogBounds } from '../../models/dialog-bounds';
import { Dialog, DialogModule } from 'primeng/dialog';
import { DialogManagerService } from '../../dialog-manager.service';
import { ModularDialogRef } from '../../models/modular-dialog-ref';
import { isString, isWeakObject } from 'warskald-ui/type-guards';
import { isObservable } from 'rxjs';
import { ViewContainerRefDirective } from 'warskald-ui/directives';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PrimeNGConfig } from 'primeng/api';
import { ZIndexUtils } from 'primeng/utils';


/* function moveOnTop(this: Dialog) {
    if (this.autoZIndex) {
        console.log(this.container, this.baseZIndex, this.config.zIndex.modal);
        ZIndexUtils.set('modal', this.container, this.baseZIndex + this.config.zIndex.modal);
        (this.wrapper as HTMLElement).style.zIndex = String(parseInt((this.container as HTMLDivElement).style.zIndex, 10) - 1);
    }
} */
@Component({
    selector: 'ws-modular-dialog',
    standalone: true,
    imports: [
        CommonModule,
        DialogModule,
        ButtonModule,
    ],
    templateUrl: './modular-dialog.component.html',
    styleUrl: './modular-dialog.component.scss'
})
export class ModularDialogComponent {

    // #region public properties
    public styles?: StyleGroup;

    public header?: DialogComponentType;
    public headerStyles?: StyleGroup;
    public headerData?: WeakObject;
    public headerComponentRef?: ComponentRef<unknown>;

    public content?: DialogComponentType;
    public contentStyles?: StyleGroup;
    public contentData?: WeakObject;
    public contentComponentRef?: ComponentRef<unknown>;

    public footer?: DialogComponentType;
    public footerStyles?: StyleGroup;
    public footerData?: WeakObject;
    public footerComponentRef?: ComponentRef<unknown>;

    public navBoundaryElementRef?: HTMLRef;
    public navBoundaryElement?: HTMLElement;

    public minimizable: boolean = true;
    public minimized: boolean = false;

    public collapsible: boolean = true;
    public collapsed: boolean = false;
    public collapseIconElement?: HTMLElement;

    public showSubmitButton: boolean = true;
    public submitAutoFocus: boolean = true;
    public submitLabel: string = 'Submit';
    public submitIcon: string = 'pi pi-check';
    public innerSubmitHandler?: GenericFunction<unknown>;

    public showCancelButton: boolean = true;
    public cancelLabel: string = 'Cancel';
    public cancelIcon: string = 'pi pi-times';
    public innerCancelHandler?: GenericFunction<unknown>;

    public closable: boolean = true;

    public visible: boolean = true;

    public topWhenOpen: string = '';
    public leftWhenOpen: string = '';
    public heightWhenOpen: string = '';

    public dialogElement?: HTMLElement;
    public dialogContentElement?: HTMLElement;
    public headerElement?: HTMLElement;
    public maskElement?: HTMLElement;

    public appendTo?: string | TemplateRef<unknown>;

    public animating: boolean = false;

    public openBounds: DialogBounds = new DialogBounds();
    public closedBounds: DialogBounds = new DialogBounds();

    public contentBoundsOpen: DialogBounds = new DialogBounds();
    public contentBoundsClosed: DialogBounds = new DialogBounds();

    public config?: WeakObject;

    public modal?: boolean = false;

    [key: string]: unknown;

    // #endregion public properties


    // #region private properties

    // #endregion private properties


    // #region getters/setters

    get resizable(): boolean {
        return this.pDialog?.resizable ?? false;
    }

    // #endregion getters/setters


    // #region standard inputs

    // #endregion standard inputs


    // #region get/set inputs

    // #endregion get/set inputs


    // #region outputs, emitters, and event listeners
    @Output() onCreated: EventEmitter<ModularDialogComponent> = new EventEmitter<ModularDialogComponent>();
    @Output() onMinimized: EventEmitter<ModularDialogComponent> = new EventEmitter<ModularDialogComponent>();
    @Output() onClose: EventEmitter<ModularDialogComponent> = new EventEmitter<ModularDialogComponent>();
    @Output() onBringToTop: EventEmitter<ModularDialogComponent> = new EventEmitter<ModularDialogComponent>();

    // #endregion outputs, emitters, and event listeners


    // #region viewchildren and contentchildren
    @ViewChild('pDialog') pDialog?: Dialog;

    @ViewChildren(ViewContainerRefDirective) containers?: QueryList<ViewContainerRefDirective>;

    // #endregion viewchildren and contentchildren


    // #region constructor and lifecycle hooks
    constructor(
        public cd: ChangeDetectorRef,
        public dialogManagerSvc: DialogManagerService,
        private dialogRef: ModularDialogRef,
        public primeConfig: PrimeNGConfig,
    ) {
    }

    ngAfterViewInit() {

        this._initialize();
        
    }
    // #endregion constructor and lifecycle hooks


    // #region public methods
    public handleDialogTouched() {
        this.dialogRef.touch();
    }

    public animateMinimize() {
        this.setAnimationTimer();
        this.minimized = true;
        if(this.dialogElement) {
            const { offsetTop, offsetLeft, offsetWidth } = this.dialogElement;
            const { offsetHeight } = document.body;
            this.topWhenOpen = offsetTop + 'px';

            this.leftWhenOpen = offsetLeft + 'px';
            const insetValues = {
                top: offsetHeight - offsetTop + 'px',
                left: 0 - (offsetWidth / 2) + 'px'
            };

            Object.assign(this.dialogElement.style, insetValues);
        }
    }

    public minimize() {
        this.dialogRef.minimize();
    }

    public animateRestore() {
        this.setAnimationTimer();
        this.minimized = false;
        if(this.dialogElement) {
            const insetValues = {
                top: this.topWhenOpen,
                left: this.leftWhenOpen
            };
            Object.assign(this.dialogElement.style, insetValues);
        }
    }

    public restore() {
        this.dialogRef.restore();
    }

    public toggleCollapse(collapsed?: boolean) {
        this.setAnimationTimer();

        collapsed ??= !this.collapsed;

        this.collapsed = collapsed;
    }

    public setAnimationTimer() {
        this.animating = true;
        setTimeout(() => {
            this.animating = false;
        }, 300);
    }

    public close() {
        this.dialogRef.close();
    }

    public submit() {
        this.dialogRef.submit();
    }

    public cancel() {
        this.dialogRef.cancel();
    }

    public isComponentRef(obj: unknown): obj is Type<unknown> {
        return obj instanceof Type;
    }

    public isTemplate(obj: unknown): obj is TemplateRef<unknown> {
        return obj instanceof TemplateRef;
    }

    public isString = isString;

    // #endregion public methods


    // #region protected methods

    // #endregion protected methods


    // #region private methods
    private _initialize() {
        if(this.config) {
            Object.assign(this, this.config);
            this.cd.detectChanges();
        }
        
        const components = [
            'header',
            'content',
            'footer',
        ];

        components.forEach(component => {
            this._buildDialogComponent(component);
        });


        this.dialogElement = this.pDialog?.el.nativeElement.querySelector('.p-dialog') as HTMLElement;
        this.headerElement = this.pDialog?.el.nativeElement.querySelector('.p-dialog-header') as HTMLElement;
        this.dialogContentElement = this.pDialog?.el.nativeElement.querySelector('.p-dialog-content') as HTMLElement;
        this.maskElement = this.pDialog?.el.nativeElement.querySelector('.p-dialog-mask') as HTMLElement;

        
        this._setNavBoundary();

        this._initializeInsetValues();

        this._registerEventHandlers();

        this.onCreated.emit(this);
    }

    private _initializeInsetValues() {
        setTimeout(() => {
            if(this.dialogElement) {
                this.openBounds = new DialogBounds(this.dialogElement, undefined, this.navBoundaryElement);
                this.openBounds.updateElement(['top','left', 'width']);
                if(this.headerElement) {
                    this.closedBounds = new DialogBounds(this.dialogElement, this.headerElement.getBoundingClientRect());
                    
                }
            }

            if(this.dialogContentElement) {
                this.contentBoundsOpen = new DialogBounds(this.dialogContentElement);
                this.contentBoundsOpen.updateElement(['height']);
            }

            if(this.dialogContentElement) {
                const { height } = this.dialogContentElement.getBoundingClientRect();

                if(height) {
                    this.dialogContentElement.style.height = Math.round(height) + 'px';
                    this.heightWhenOpen = Math.round(height) + 'px';
                }
            }

        }, 310);
    }

    private _setNavBoundary() {
        if(this.pDialog) {
            let navElement: HTMLElement | undefined = undefined;

            if(typeof this.navBoundaryElementRef === 'string') {
                navElement = document.querySelector(this.navBoundaryElementRef) as HTMLElement;    
            }

            else if (this.navBoundaryElementRef instanceof TemplateRef) {
                navElement = this.navBoundaryElementRef.elementRef.nativeElement as HTMLElement;
            }

            else {
                navElement = this.navBoundaryElementRef;
            }

            if(navElement) {
                this.navBoundaryElement = navElement;
                const { bottom } = navElement.getBoundingClientRect() ?? {};
                if(bottom) {
                    this.pDialog.minY = bottom;
                }
            }
        }
    }

    private _registerEventHandlers() {
        if(this.pDialog) {
            /* this.dialogElement?.addEventListener('mousedown', (event: MouseEvent) => {
                console.log(this.pDialog?.container, this.primeConfig.zIndex);
            }); */
            /* if(this.dialogElement) {
                const headerElement = this.dialogElement.querySelector('.p-dialog-header') as HTMLElement;
                if(headerElement) {
                    headerElement.addEventListener('touchstart', (event: TouchEvent) => {
                        const touch = event.touches[0];
                        this.pDialog?.initDrag(touch as any);
                    });
                
                }
            } */
            for(const key in this.pDialog) {
                if(isWeakObject(this.pDialog)) {
                    const property = this.pDialog[key];
                    const handlerKey = 'handle' + key.toFormat('capitalize').split(' ').join('');
                    const eventHandler = this[handlerKey];
                    if(isObservable(property) && typeof eventHandler === 'function') {
                        
                        property.subscribe((event: unknown) => {
                            if(typeof eventHandler === 'function') {
                                eventHandler(this, event);
                            }
                        });
                    }
                }
            }
        }
    }

    private _buildDialogComponent(key: string) {
        
        const component = this[key] as ComponentType;
        if(isWeakObject(this.pDialog)) {
            if(typeof component === 'string') {
                this.pDialog[key] = component;
            }
            else if(component instanceof Type) {
                const container = this.containers?.find(container => container.id === key);
                if(container) {
                    const componentRef = container.viewContainerRef.createComponent(component);
                    Object.assign(componentRef, this[key + 'Data']);
                    this[key + 'ComponentRef'] = componentRef;
                    if(key === 'content') {
                        const {instance} = componentRef;
                        if(instance && isWeakObject(instance)) {
                            const { submit, cancel } = instance;
                            if(typeof submit === 'function') {
                                this.innerSubmitHandler = submit as GenericFunction<unknown>;
                            }
                            if(typeof cancel === 'function') {
                                this.innerCancelHandler = cancel as GenericFunction<unknown>;
                            }
                        }
                    }
                }
            }
            else if(component instanceof TemplateRef) {
                // this.dialogRef[key] = component;

            }
        }
        
    }

    // #endregion private methods


}

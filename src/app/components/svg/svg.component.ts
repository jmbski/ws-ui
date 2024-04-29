import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { nanoid } from 'nanoid';
import { LoggableComponent, LogLevels } from 'warskald-ui/services';

@LoggableComponent({
    LOCAL_ID: 'SvgComponent',
    autoAddLogs: true,
    canLog: true,
    localLogLevel: LogLevels.Error

})
@Component({
    selector: 'ws-svg',
    standalone: true,
    imports: [],
    templateUrl: './svg.component.html',
    styleUrl: './svg.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgComponent {
    
    public widthVal: string = '0';
    public heightVal: string = '48';

    public xOffset: number = 0;
    public yOffset: number = 0;

    // public points: string = '10,10 200,10 200,200, 10,200';
    // #region public properties
    
    // #endregion public properties
    
    
    // #region private properties
    
    // #endregion private properties
    
    
    // #region getters/setters
	
    
    get points() {
        return this.pointsList.join(' ');
    }
    
    // #endregion getters/setters
    
    
    // #region standard inputs
    @Input() pointsList: string[] = [
        '0,0',
        '96,0',
        '48,24',
        '0,0'
    ];
    
    // #endregion standard inputs
    
    
    // #region get/set inputs
    
    // #endregion get/set inputs
    
    
    // #region outputs, emitters, and event listeners

    @Output() mousePos: EventEmitter<string> = new EventEmitter();

    /* @HostListener('mousemove',['$event']) updateMouse(event: MouseEvent) {
        this.mousePos.emit(`${event.x - this.xOffset}, ${event.y - this.yOffset}`);
		
    } */
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region viewchildren and contentchildren
    
    @ViewChild('svgElement') svgElement?: SVGElement;
    
    // #endregion viewchildren and contentchildren
    
    
    // #region constructor and lifecycle hooks
    constructor(
        public el: ElementRef,
        public cd: ChangeDetectorRef
    ) {
        
    }
    
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}

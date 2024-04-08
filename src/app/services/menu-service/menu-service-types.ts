import { NgStyleValues } from 'warskald-ui/models';
import { NavAction } from '../nav-service/_index';
import { GenericFunction } from 'src/app/models/general';
import { TooltipOptions } from 'primeng/api';


export interface WSMenuItem {
    /**
     * Text of the item.
     */
    label?: string;

    /**
     * Icon of the item.
     */
    icon?: string;
    
    /**
     * When set as true, disables the menuitem.
     */
    disabled?: boolean;

    /**
     * Whether the dom element of menuitem is created or not.
     */
    visible?: boolean;

    /**
     * Tooltip of the item.
     */
    tooltip?: string;

    /**
     * Position of the tooltip item.
     */
    tooltipPosition?: string;
    
    /**
     * Identifier of the element.
     */
    id?: string;
    
    /**
     * Options of the item's tooltip.
     * @see {TooltipOptions}
     */
    tooltipOptions?: TooltipOptions;

    customIcon?: NgStyleValues;

    command?: GenericFunction<unknown>;

    items?: WSMenuItem[];

    isExpanded?: boolean;

    maxHeight?: string;
    
    navAction?: NavAction;
}

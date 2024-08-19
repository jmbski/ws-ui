import { isFunction } from 'warskald-ui/type-guards';
import { contains, FilterFunctions } from './filter-functions';
import { FilterFunction } from 'warskald-ui/models';



export class FilterService {
    // #region public properties
    
    /* public static primeFilterSvc?: PrimeFilterService; */

    // #endregion public properties
    
    
    // #region private properties
    
    /* private static pFilterSvcSub: Subscription = wsConfig.primeFilterSvc$.subscribe((svc) => {
        FilterService.primeFilterSvc = svc;
    }); */

    // #endregion private properties
    
    
    // #region getters/setters
    
    // #endregion getters/setters
    
    
    // #region outputs, emitters, and event listeners
    
    // #endregion outputs, emitters, and event listeners
    
    
    // #region constructor and lifecycle hooks
    
    // #endregion constructor and lifecycle hooks
    
    
    // #region public methods

    public static checkFilter(value: unknown, filterValue: unknown, funct: string): boolean {

        const filterFunct = FilterFunctions[funct];
        
        if(isFunction(filterFunct)) {
            return filterFunct(value, filterValue);
        }
        return false;
    }

    public static registerFilter(name: string, funct: FilterFunction): void {
        FilterFunctions[name] = funct;
    }
    
    // #endregion public methods
    
    
    // #region protected methods
    
    // #endregion protected methods
    
    
    // #region private methods
    
    // #endregion private methods
    
    
}
import { FilterService as PrimeFilterService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

export class WsConfig {
    public primeFilterSvc$: BehaviorSubject<PrimeFilterService | undefined> = new BehaviorSubject<PrimeFilterService | undefined>(undefined);

}

export const wsConfig: WsConfig = new WsConfig();
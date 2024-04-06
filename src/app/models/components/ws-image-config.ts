import { ElementType } from '../page-elements';

export interface WsImageConfig {
    LOCAL_ID: string;
    canLog?: boolean;
    localLogLevel?: number;
    elementType?: ElementType;
    src?: string;
}
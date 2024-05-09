import { ElementType } from '../element-types';


export interface _WsImageConfig {
    LOCAL_ID: string;
    canLog?: boolean;
    localLogLevel?: number;
    elementType?: ElementType;
    src?: string;
}
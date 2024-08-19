import { ComponentDef } from '../general';
import { StyleGroup } from '../style-types';
import { TopNavConfig } from './top-nav-config';

export interface PageLayoutConfig {
    LOCAL_ID?: string;
    localLogLevel?: number;
    canLog?: boolean;
    pageLayoutStyles?: StyleGroup;
    pageContentStyles?: StyleGroup;
    customTopNavDef?: ComponentDef<unknown>;
    wsTopNavConfig?: TopNavConfig;
}
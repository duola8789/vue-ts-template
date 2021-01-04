import {MutationTree, GetterTree, ActionTree, ActionContext} from 'vuex';
import {
    LOGIN_MUTATION,
    LOGIN_ACTION,
    USER_PERMISSION_MUTATION,
    USER_PERMISSION_ACTION,
    LOGOUT_MUTATION,
    LOGOUT_ACTION,
    WS_MUTATION,
    WS_CONNECT_ACTION,
    WS_DISCONNECT_ACTION
} from './store-types';
import {TypeProjectInfo, TypeUserPermissionCodes, TypeProjectIds} from '@/config/types';

export type TypeUserPermissions = TypeUserPermissionCodes | -1;

export interface RootLoginResponse {
    token: string;
    userName: string;
}

export interface RootState {
    token: string;
    userName: string;
    permission: TypeUserPermissions;
    ws: WebSocket | null;
    currentProjectId: TypeProjectIds | '';
}

export interface RootGetters extends GetterTree<RootState, RootState> {
    isLogin(): () => boolean;
    isAuthorized(state: RootState): boolean;
    currentProjectInfo(state: RootState): TypeProjectInfo;
}

export interface RootMutations extends MutationTree<RootState> {
    [LOGIN_MUTATION](state: RootState, payload: {token: string; userName: string}): void;
    [USER_PERMISSION_MUTATION](state: RootState, permission: TypeUserPermissionCodes): void;
    [LOGOUT_MUTATION](state: RootState): void;
    [WS_MUTATION](state: RootState, ws: WebSocket): void;
}

export interface RootActions extends ActionTree<RootState, RootState> {
    [LOGIN_ACTION](actionContext: ActionContext<RootState, RootState>): Promise<boolean>;
    [LOGOUT_ACTION](actionContext: ActionContext<RootState, RootState>): Promise<boolean>;
    [USER_PERMISSION_ACTION](actionContext: ActionContext<RootState, RootState>, userName: string): Promise<boolean>;
    [WS_CONNECT_ACTION](actionContext: ActionContext<RootState, RootState>): Promise<void>;
    [WS_DISCONNECT_ACTION](actionContext: ActionContext<RootState, RootState>): Promise<void>;
}

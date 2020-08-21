import {MutationTree, GetterTree, ActionTree, ActionContext} from 'vuex';
import {
    LOGIN_MUTATION,
    LOGIN_ACTION,
    USER_ROLE_MUTATION,
    USER_ROLE_ACTION,
    LOGOUT_MUTATION,
    LOGOUT_ACTION,
    WS_MUTATION,
    WS_CONNECT_ACTION,
    WS_DISCONNECT_ACTION
} from './store-types';

export interface RootLoginResponse {
    token: string;
    username: string;
}

export interface RootState {
    token: string;
    username: string;
    role: string;
    ws: WebSocket | null;
}

export interface RootGetters extends GetterTree<RootState, RootState> {
    isLogin(): () => boolean;
    isAuthorized(state: RootState): boolean;
}

export interface RootMutations extends MutationTree<RootState> {
    [LOGIN_MUTATION](state: RootState, payload: {token: string; username: string}): void;
    [USER_ROLE_MUTATION](state: RootState, role: string): void;
    [LOGOUT_MUTATION](state: RootState): void;
    [WS_MUTATION](state: RootState, ws: WebSocket): void;
}

export interface RootActions extends ActionTree<RootState, RootState> {
    [LOGIN_ACTION](actionContext: ActionContext<RootState, RootState>): Promise<boolean>;
    [LOGOUT_ACTION](actionContext: ActionContext<RootState, RootState>): Promise<boolean>;
    [USER_ROLE_ACTION](actionContext: ActionContext<RootState, RootState>, username: string): Promise<boolean>;
    [WS_CONNECT_ACTION](actionContext: ActionContext<RootState, RootState>): Promise<void>;
    [WS_DISCONNECT_ACTION](actionContext: ActionContext<RootState, RootState>): Promise<void>;
}

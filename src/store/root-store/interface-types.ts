import {MutationTree, GetterTree, ActionTree, ActionContext} from 'vuex';
import {
    ROOT_UPDATE_USER_INFO_MUTATION,
    ROOT_UPDATE_USER_ROLE_MUTATION,
    ROOT_LOGIN_ACTION,
    ROOT_LOGOUT_MUTATION,
    ROOT_LOGOUT_ACTION,
    ROOT_GET_USER_ROLE_ACTION
} from '@/store/root-store/store-types';

export interface RootLoginResponse {
    token: string;
    username: string;
}

export interface RootState {
    token: string;
    username: string;
    role: string;
}

export interface RootGetters extends GetterTree<RootState, RootState> {
    isLogin(): () => boolean;
    isAuthorized(state: RootState): boolean;
}

export interface RootMutations extends MutationTree<RootState> {
    [ROOT_UPDATE_USER_INFO_MUTATION](state: RootState, payload: {token: string; username: string}): void;
    [ROOT_UPDATE_USER_ROLE_MUTATION](state: RootState, role: string): void;
    [ROOT_LOGOUT_MUTATION](state: RootState): void;
}

export interface RootActions extends ActionTree<RootState, RootState> {
    [ROOT_LOGIN_ACTION](actionContext: ActionContext<RootState, RootState>): Promise<boolean>;
    [ROOT_LOGOUT_ACTION](actionContext: ActionContext<RootState, RootState>): Promise<boolean>;
    [ROOT_GET_USER_ROLE_ACTION](actionContext: ActionContext<RootState, RootState>, username: string): Promise<void>;
}

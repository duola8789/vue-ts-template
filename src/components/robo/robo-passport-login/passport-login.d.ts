declare namespace passport {
    interface Magic {
        passport: {
            login: any;
        };
    }

    interface LoadingStance {
        render(id: string): void;
        on(eventName: string, cb: (evt?: any) => void): void;
    }

    interface UseCb {
        (magic: Magic): void;
    }

    interface UseOption {
        tangram: boolean;
        loginVersion: 'v4';
        defaultCss: boolean;
    }

    interface Use {
        (action: 'login', options: UseOption, cb: UseCb): void;
    }
    const use: Use;
}

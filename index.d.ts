export interface Config {
    port?: number;

    routes: {
        [routePath: string]: Route;
    }
    
    components: {
        [index: string]: Component;
    }
}

export interface Component {
    template: string;
    viewModel: string;
}

export interface Route {
    method: string;
    handler: string;
    path?: string;
    aliases?: string[];
}

export interface Include {
    root: string;
    files: string[];
}
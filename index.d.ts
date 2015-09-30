export interface Config {
    routes: { 
        [index: string]: Route;
    }
}

export interface Route {
    method: string;
    handler: string;
    aliases?: string[];    
}
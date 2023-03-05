export interface ResourceInterface {
    checkConnection: () => Promise<void | string>;
}

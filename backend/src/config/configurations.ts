export default () => {
    return {
        serverUrl: process.env.SERVER_URL || "http://127.0.0.1:3000",
        nodeEnv: process.env.NODE_ENV || "prod",
    };
};

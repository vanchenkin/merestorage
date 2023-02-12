export default () => {
    return {
        serverUrl: process.env.SERVER_URL || "http://127.0.0.1:3000",
        nodeEnv: process.env.NODE_ENV || "prod",
        database: {
            host: process.env.POSTGRES_HOST || "127.0.0.1",
            port: parseInt(process.env.POSTGRES_PORT || "", 10) || 5432,
            user: process.env.POSTGRES_USER || "root",
            password: process.env.POSTGRES_PASSWORD || "root",
            database: process.env.POSTGRES_DATABASE || "merestorage",
        },
    };
};

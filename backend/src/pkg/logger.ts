export const logger = {
    info: (msg: string, ...args: unknown[]) => console.log(`ℹ️ [INFO] ${msg}`, ...args),
    warn: (msg: string, ...args: unknown[]) => console.warn(`⚠️ [WARN] ${msg}`, ...args),
    error: (msg: string, ...args: unknown[]) => console.error(`❌ [ERROR] ${msg}`, ...args),
    debug: (msg: string, ...args: unknown[]) => {
        if (process.env.NODE_ENV !== 'production') {
            console.debug(`🐛 [DEBUG] ${msg}`, ...args);
        }
    },
};

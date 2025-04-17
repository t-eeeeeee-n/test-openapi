"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
exports.logger = {
    info: (msg, ...args) => console.log(`ℹ️ [INFO] ${msg}`, ...args),
    warn: (msg, ...args) => console.warn(`⚠️ [WARN] ${msg}`, ...args),
    error: (msg, ...args) => console.error(`❌ [ERROR] ${msg}`, ...args),
    debug: (msg, ...args) => {
        if (process.env.NODE_ENV !== 'production') {
            console.debug(`🐛 [DEBUG] ${msg}`, ...args);
        }
    },
};

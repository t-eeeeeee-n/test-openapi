"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("../pkg/logger");
const errorHandler = (err, req, res, next) => {
    logger_1.logger.error('Unhandled error', err);
    if (err instanceof Error) {
        return res.status(500).json({ error: err.message });
    }
    res.status(500).json({ error: 'Unexpected error' });
};
exports.errorHandler = errorHandler;

// Imports
import * as path from 'path';
import * as winston from 'winston';

// Imports configuration
import { config } from './config';

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ level: 'debug' }),
    new (winston.transports.File)({
      filename: path.join(config.logging.path, 'html-converter-api.log'),
      level: config.logging.level,
    }),
  ],
});

// Exports
export { logger };

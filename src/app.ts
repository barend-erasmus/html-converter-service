// Imports
import * as express from "express";
import * as path from 'path';
import * as yargs from 'yargs';

// Imports middleware
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as expressWinston from 'express-winston';

// Imports routes
import { ConvertRouter } from './routes/convert';

// Imports logger
import { logger } from './logger';

const argv = yargs.argv;

export class WebApi {

    constructor(private app: express.Express, private port: number) {
        this.configureMiddleware(app);
        this.configureRoutes(app);
        this.configureErrorHandling(app);
    }

    public getApp() {
        return this.app;
    }

    public run() {
        this.app.listen(this.port);
    }

    private configureMiddleware(app: express.Express) {

        // Configure body-parser
        app.use(bodyParser.json({limit: '50mb'}));
        app.use(bodyParser.urlencoded({ extended: false }));

        // Configure CORS
        app.use(cors());

        // Configure express-winston
        app.use(expressWinston.logger({
            meta: false,
            msg: 'HTTP Request: {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}} {{req.ip}}',
            winstonInstance: logger,
        }));
    }

    private configureRoutes(app: express.Express) {
        app.post('/api/convert/topdf', ConvertRouter.toPdf);
        app.post('/api/convert/topng', ConvertRouter.toPng);

        app.use('/api/docs', express.static(path.join(__dirname, './../apidoc')));
        app.use('/api/coverage', express.static(path.join(__dirname, './../coverage/lcov-report')));

        app.use('/', express.static(path.join(__dirname, './views')));
    }

    private configureErrorHandling(app: express.Express) {
        app.use((err: Error, req: express.Request, res: express.Response, next: () => void) => {
            logger.error(err.message, err);
            res.status(500).send(err.message);
        });
    }
}

const api = new WebApi(express(), argv.port || 3000);
api.run();

logger.info(`listening on ${argv.port || 3000}`);

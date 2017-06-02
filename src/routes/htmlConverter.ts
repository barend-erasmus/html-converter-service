// Imports
import { Express, Request, Response } from "express";
import * as express from 'express';
import * as stream from 'stream';

import { ServiceFactory } from './base';

// Import configurations
let config = require('./../config').config;

const argv = require('yargs').argv;

if (argv.prod) {
  config = require('./../config.prod').config;
}

// Imports logger
import { logger } from './../logger';

export class HtmlConverterRouter {

    public static convertPdf(req: Request, res: Response, next: () => void) {

        const html = req.body.html;

        const pdfConverterService = ServiceFactory.getPdfConverterService(req.query.top | 0, req.query.bottom | 0, req.query.left | 0, req.query.right | 0);

        pdfConverterService.convert(html).then((stream: stream.Stream) => {
            stream.pipe(res);
        }).catch((err: Error) => {
            logger.error(err.message);
            res.status(500).send(err.message);
        });
    }

    public static convertPng(req: Request, res: Response, next: () => void) {

        const html = req.body.html;

        const pngConverterService = ServiceFactory.getPngConverterService(req.query.top | 0, req.query.bottom | 0, req.query.left | 0, req.query.right | 0);

        pngConverterService.convert(html).then((stream: stream.Stream) => {
            stream.pipe(res);
        }).catch((err: Error) => {
            logger.error(err.message);
            res.status(500).send(err.message);
        });
    }
}

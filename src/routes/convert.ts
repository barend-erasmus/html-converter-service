// Imports
import { Express, Request, Response } from "express";
import * as express from 'express';
import * as stream from 'stream';

import { ServiceFactory } from './base';

// Imports logger
import { logger } from './../logger';

export class ConvertRouter {

    /**
     * @api {post} /api/convert/topdf Get Convert HTML to PDF
     * @apiName ConvertToPdf
     * @apiGroup Convert
     *
     * @apiParam {String} html HTML
     * @apiParam {Number} top Top offset
     * @apiParam {Number} bottom Bottom offset
     * @apiParam {Number} left Left offset
     * @apiParam {Number} right Right offset
     *
     * @apiSuccess {Binary} binary Binary PDF file bytes
     * 
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 400 Bad Request
     *      {
     *          "message": "Your request was not understood"
     *      }
     */
    public static toPdf(req: Request, res: Response, next: () => void) {

        const html = req.body.html;

        const pdfConverterService = ServiceFactory.getPdfConverterService(req.body.top | 0, req.body.bottom | 0, req.body.left | 0, req.body.right | 0);

        pdfConverterService.convert(html).then((stream: stream.Stream) => {
            stream.pipe(res);
        }).catch((err: Error) => {
            logger.error(err.message);
            res.status(400).send({
                message: err.message
            });
        });
    }

    /**
     * @api {post} /api/convert/topng Get Convert HTML to PNG
     * @apiName ConvertToPng
     * @apiGroup Convert
     *
     * @apiParam {String} html HTML
     * @apiParam {Number} top Top offset
     * @apiParam {Number} bottom Bottom offset
     * @apiParam {Number} left Left offset
     * @apiParam {Number} right Right offset
     *
     * @apiSuccess {Binary} binary Binary PNG file bytes
     * 
     * @apiErrorExample {json} Error-Response:
     *      HTTP/1.1 400 Bad Request
     *      {
     *          "message": "Your request was not understood"
     *      }
     */
    public static toPng(req: Request, res: Response, next: () => void) {

        const html = req.body.html;

        const pngConverterService = ServiceFactory.getPngConverterService(req.body.top | 0, req.body.bottom | 0, req.body.left | 0, req.body.right | 0);

        pngConverterService.convert(html).then((stream: stream.Stream) => {
            stream.pipe(res);
        }).catch((err: Error) => {
            logger.error(err.message);
            res.status(400).send({
                message: err.message
            });
        });
    }
}

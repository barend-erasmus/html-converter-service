// Imports
import * as base64 from 'base64-stream';
import * as juice from 'juice';
import * as phantom from 'phantom-html-to-pdf';
import * as stream from 'stream';

import { PngConverter } from './/PngConverter';
import { IConverter } from './IConverter';

const phantomConverter = phantom();

export class PdfConverter extends IConverter {

    private shotSize = {
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
    };

    constructor(top: number, bottom: number, left: number, right: number) {
        super();

        this.shotSize.top = top;
        this.shotSize.bottom = bottom;
        this.shotSize.left = left;
        this.shotSize.right = right;
    }

    public convert(html: string, footer: string): Promise<stream.Stream> {
        html = juice(html);

        html = html.replace(/<style>(.|\n)*?<\/style>/g, '');

        return this.convertToPdf(html, footer);
    }

    private convertToPdf(html: string, footer: string): Promise<stream.Stream> {
        return new Promise((resolve: (strm: stream.Stream) => void, reject: (err: Error) => void) => {
            phantomConverter({
                html,
                fitToPage: true,
                footer,
            }, (err: Error, pdf: any) => {
                if (err) {
                    reject(err);
                    return;
                }

                const outStream = new stream.PassThrough();

                pdf.stream.pipe(outStream);

                resolve(outStream);
            });
        });
    }
}

// Imports
import * as base64 from 'base64-stream';
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

    public convert(html: string): Promise<stream.Stream> {

        return this.convertToPdf(html);

        // const pngConverter = new PngConverter(this.shotSize.top, this.shotSize.bottom, this.shotSize.left, this.shotSize.right);
        // return pngConverter.convert(html).then((result: stream.Stream) => {
        //     return this.streamToString(result);
        // }).then((result: string) => {
        //     return this.convertToPdf(`<img width="100%" src="data:image/png;base64,${result}"></img>`);
        // });
    }

    private convertToPdf(html: string): Promise<stream.Stream> {
        return new Promise((resolve: (strm: stream.Stream) => void, reject: (err: Error) => void) => {
            phantomConverter({ html }, (err: Error, pdf: any) => {
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

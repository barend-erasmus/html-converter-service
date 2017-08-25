// Imports
import * as base64 from 'base64-stream';
import * as fs from 'fs';
import * as path from 'path';
import * as stream from 'stream';
import * as uuid from 'uuid';
import * as webshot from 'webshot';
import * as yargs from 'yargs';

const argv = yargs.argv;

import { IConverter } from './IConverter';

export class PngConverter extends IConverter {

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

        return new Promise((resolve: (strm: stream.Stream) => void, reject: (err: Error) => void) => {

            const id = uuid.v4();
            const tempPath = path.join(argv.prod ? './temp' : './src/temp', id + '.png');

            webshot(html, tempPath, {
                defaultWhiteBackground: true,
                shotOffset: this.shotSize,
                shotSize: {
                    height: 'all',
                    width: 'all',
                },
                siteType: 'html',
            }, (err: Error) => {

                if (err) {
                    reject(err);
                    return;
                }

                const outStream = new stream.PassThrough();

                fs.createReadStream(tempPath).pipe(outStream);

                resolve(outStream);
            });

        });
    }

}

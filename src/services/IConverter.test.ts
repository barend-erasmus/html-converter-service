import { expect } from 'chai';
import 'mocha';
import * as stream from 'stream';

// Imports services
import { IConverter } from './IConverter';

// Import configurations
let config = require('./../config').config;

let argv = require('yargs').argv;

if (argv.prod) {
  config = require('./../config.prod').config;
}

describe('IConverter', () => {

    let converter: MockConverter = null;

    beforeEach(() => {
        converter = new MockConverter();
    });

    describe('streamToString', () => {
        it('should return string given stream', () => {

            const inputStream = new stream.Readable();
            inputStream.push('Hello World');
            inputStream.push(null);

            return converter.streamToString(inputStream).then((result: string) => {
                 expect(result).to.be.eq('SGVsbG8gV29ybGQ=');
            });
        });

        it('should return null string given null stream', () => {
            return converter.streamToString(null).then((result: string) => {
                 expect(result).to.be.null;
            });
        });
    });
});

class MockConverter extends IConverter {

}

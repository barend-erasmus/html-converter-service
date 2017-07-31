// Imports
import * as stream from 'stream';

export abstract class IConverter {

    public convert(html: string): Promise<stream.Stream> {
        throw new Error('Not Implemented Yet');
    }

    public streamToString(inputStream: stream.Stream): Promise<string> {
        return new Promise((resolve: (str: string) => void, reject: (err: Error) => void) => {

            if (inputStream == null) {
                resolve(null);
                return;
            }

            const chunks = [];
            inputStream.on("data", (chunk) => {
                chunks.push(chunk);
            });

            inputStream.on("end", () => {

                const base64String = Buffer.concat(chunks).toString('base64');

                resolve(base64String);
            });
        });
    }
}

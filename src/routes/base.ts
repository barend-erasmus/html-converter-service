// Imports services
import { IConverter } from './../services/IConverter';
import { PdfConverter } from './../services/PdfConverter';
import { PngConverter } from './../services/PngConverter';

export class ServiceFactory {

    public static getPdfConverterService(top: number, bottom: number, left: number, right: number) {
        return new PdfConverter(top, bottom, left, right);
    }

    public static getPngConverterService(top: number, bottom: number, left: number, right: number) {
        return new PngConverter(top, bottom, left, right);
    }
}

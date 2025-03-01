export default class FieldModel {
    fieldCode: string;
    fieldName: string;
    fieldLocation: string;
    fieldSize: number;
    cropCode: string;
    fieldImage01: string;
    fieldImage02: string;

    constructor(
        fieldCode: string,
        fieldName: string,
        fieldLocation: string,
        fieldSize: number,
        cropCode: string,
        fieldImage01: string,
        fieldImage02: string,
    ) {
        this.fieldCode = fieldCode;
        this.fieldName = fieldName;
        this.fieldLocation = fieldLocation;
        this.fieldSize = fieldSize;
        this.cropCode = cropCode;
        this.fieldImage01 = fieldImage01;
        this.fieldImage02 = fieldImage02;
    }
}

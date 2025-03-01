export default class Crop {
    cropCode: string;
    cropCommonName: string;
    cropScientificName: string;
    cropImage: string;
    cropCategory: string;
    cropSeason: string;

    constructor(
        cropCode: string,
        cropCommonName: string,
        cropScientificName: string,
        cropSeason: string,
        cropCategory: string,
        cropImage: string
    ) {
        this.cropImage = cropImage;
        this.cropCode = cropCode;
        this.cropCommonName = cropCommonName;
        this.cropScientificName = cropScientificName;
        this.cropSeason = cropSeason;
        this.cropCategory = cropCategory;
    }
}

import express from "express";
import {createCrop, getCrops, updateCrop} from "../controllers/cropController";
import Crop from "../model/CropModel";

const router = express.Router();

router.get("/", async(req,res,next)=>{
    console.log("Fetch method calling");
    try{
        const crops = await getCrops()
        res.status(200).json(crops);
    }catch(e){
        console.error('Error during registration:', e);
        res.status(500).json({ error: 'An error occurred during registration', details: e });
    }

});

router.post('/', async(req,res,next)=>{
    const code = req.body.cropCode;
    const commonName = req.body.cropCommonName;
    const scientificName = req.body.cropScientificName;
    const season = req.body.cropSeason;
    const category = req.body.cropCategory;
    const image = req.body.cropImage;

    const cropModel = new Crop(code, commonName, scientificName, season, category, image);

    try{
        await createCrop(cropModel);
        res.status(200).json();
    }catch(e){
        console.error('Error during registration:', e);
        res.status(500).json({ error: 'An error occurred during registration', details: e });
    }

})

router.put("/:id", async(req,res,next)=>{
    const code = req.body.cropCode;
    const commonName = req.body.commonName;
    const scientificName = req.body.scientificName;
    const season = req.body.season;
    const category = req.body.category;
    const image = req.body.image;

    const id = req.params.id

    const cropModel = new Crop(code, commonName, scientificName, season, category, image);

    try{
        await updateCrop(cropModel, id);
        res.status(200).json();
    }catch(e){
        console.error('Error during registration:', e);
        res.status(500).json({ error: 'An error occurred during registration', details: e });
    }

});

// router.delete("/:id", deleteCrop);

export default router;
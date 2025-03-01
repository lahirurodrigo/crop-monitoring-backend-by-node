import express from "express";
import { getFields, createField, updateField, deleteField } from "../controllers/fieldController";
import FieldModel from "../model/FieldModel"
import Crop from "../model/CropModel";
import {deleteCrop, updateCrop} from "../controllers/cropController";

const router = express.Router();

router.get("/", async(req,res,next)=>{
    try{
        const crops = await getFields()
        res.status(200).json(crops);
    }catch(e){
        res.status(500).json({ error: 'An error occurred during registration', details: e });
    }

});

router.post("/", async(req,res,next)=>{
    const fieldCode= req.body.fieldCode;
    const fieldName = req.body.fieldName;
    const fieldLocation = req.body.fieldLocation;
    const fieldSize = req.body.fieldSize;
    const cropCode = req.body.cropCode;
    const fieldImage01 = req.body.image;
    const fieldImage02 = req.body.image;

    const fieldModel = new FieldModel(fieldCode, fieldName,fieldLocation,fieldSize,cropCode,fieldImage01,fieldImage02);

    try{
        await createField(fieldModel);
        res.status(200).json();
    }catch(e){
        console.error('Error during registration:', e);
        res.status(500).json({ error: 'An error occurred during registration', details: e });
    }

});

router.put("/:id", async(req,res,next)=>{
    const fieldCode= req.body.fieldCode;
    const fieldName = req.body.fieldName;
    const fieldLocation = req.body.fieldLocation;
    const fieldSize = req.body.fieldSize;
    const cropCode = req.body.cropCode;
    const fieldImage01 = req.body.image;
    const fieldImage02 = req.body.image;

    const fieldModel = new FieldModel(fieldCode, fieldName,fieldLocation,fieldSize,cropCode,fieldImage01,fieldImage02);

    const id = req.params.id;

    try{
        await updateField(fieldModel, id);
        res.status(200).json();
    }catch(e){
        console.error('Error during registration:', e);
        res.status(500).json({ error: 'An error occurred during registration', details: e });
    }

});
router.delete("/:id", async(req,res,next)=>{

    const id = req.params.id

    try{
        const response = await deleteField(id);
        res.status(200).json();
    }catch(e){
        console.error(e);
    }

});

export default router;

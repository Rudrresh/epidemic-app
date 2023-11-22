import express from "express";
import jwt from 'jsonwebtoken'
import { dengueModel, malariaModel, chikungunyaModel } from "../models/disease-data.js";


const router = express.Router()

router.post("/", async (req, res) => {
    const { disease, state, year } = req.body;
    console.log(state, year)
    console.log("disease selected: ", disease)
    console.log({state_id: state, year: year})
    if (disease == "Dengue") {
        const cdData = await dengueModel.findOne({state_id: state, year: year})
        console.log(cdData)
        res.json(cdData)
    }
    else if (disease == "Malaria") {
        const cdData = await malariaModel.findOne({state_id: state, year: year})
        console.log(cdData)
        res.json(cdData)
    }
    else if (disease == "Chikungunya") {
        const cdData = await chikungunyaModel.findOne({state_id: state, year: year})
        console.log(cdData)
        res.json(cdData)
    }
    else if (disease == "Disease") {
        const dengueTotal = await dengueModel.aggregate([{
            $group: {
                _id: null,
                total_cases: {$sum: "$cases"},
                total_deaths: {$sum: "$deaths"}
            }
        }]) 
        console.log(dengueTotal)
        const malariaTotal = await malariaModel.aggregate([{
            $group: {
                _id: null,
                total_cases: {$sum: "$cases"},
                total_deaths: {$sum: "$deaths"}
            }
        }]) 
        console.log(malariaTotal)
        const chikungunyaTotal = await dengueModel.aggregate([{
            $group: {
                _id: null,
                total_cases: {$sum: "$cases"},
                total_deaths: {$sum: "$deaths"}
            }
        }]) 

        const cdData = {cases: dengueTotal[0].total_cases+ malariaTotal[0].total_cases + chikungunyaTotal[0].total_cases,
            deaths: dengueTotal[0].total_deaths + malariaTotal[0].total_deaths + chikungunyaTotal[0].total_deaths
        }
        
        console.log(cdData)
        res.json(cdData)
    }
    else {
        console.log("Disease not found")
        res.json({alert: true})
    }

  });

export {router as displayRouter} ;
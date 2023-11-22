import express from "express";
import jwt from 'jsonwebtoken'
import mongoose from "mongoose"
import { verifyToken } from "./user.js";

import { dengueModel, malariaModel, chikungunyaModel } from "../models/disease-data.js";
const router = express.Router()

router.post("/", verifyToken, async (req, res) => {
    const { disease, state, year,cases, deaths } = req.body;
    const header = req.headers

    console.log(disease, state, year)
    const filter = {state_id: state, year: year}
    console.log("disease", disease)
    if (disease == "Dengue") {
      const years = await dengueModel.distinct("year");
      console.log(years)
      if (years.includes(year)) {
        try {
          const currentData = await dengueModel.findOne(filter)
          const update = {cases: Number(cases) + Number(currentData.cases) , deaths: Number(deaths) + Number(currentData.deaths)}
          const updatedData = await dengueModel.findOneAndUpdate(filter, update)
          res.json({alert: true})
        }
        catch (err) {
          res.json({alert: false})
          console.log(err)
        }
      }
    }

    else if (disease == "Malaria") {
      const years = await malariaModel.distinct("year");
      if (years.includes(year)) {
        try {
          const currentData = await malariaModel.findOne(filter)
          
          const update = {cases: Number(cases) + Number(currentData.cases) , deaths: Number(deaths) + Number(currentData.deaths)}
          const updatedData = await malariaModel.findOneAndUpdate(filter, update)
          console.log(await malariaModel.findOne(filter))
          res.json({alert: true})
        }
        catch (err) {
          res.json({alert: false})
          console.log(err)
        }
      }
    }

    else if (disease == "Chikungunya") {
      const years = await chikungunyaModel.distinct("year");
      console.log(years)
      console.log(typeof(cases))
      if (years.includes(year)) {
        try {
          const currentData = await chikungunyaModel.findOne(filter)
          console.log(typeof(currentData.cases))
          const update = {cases: Number(cases) + Number(currentData.cases) , deaths: Number(deaths) + Number(currentData.deaths)}
          const updatedData = await chikungunyaModel.findOneAndUpdate(filter, update)
          console.log(await chikungunyaModel.findOne(filter))
          res.json({alert: true})
        }
        catch (err) {
          res.json({alert: false})
          console.log(err)
        }
      }
    }

    else {
      res(404).json("Select an disease, year, state out of those")
    }

    console.log(res)
  });

export {router as updateRouter};
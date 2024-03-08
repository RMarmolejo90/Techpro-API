import mongoose from "mongoose";

const { Schema } = mongoose;

const customerSchema = new Schema ({
  company: String,
  city: String,
  address: String,
  equipment: {
    filters: [{size: String, quantity: Number}],
    belts: [{size: String, quantity: Number}],
    system: [{type: String, name: String, model: String, serial: String, notes: [{note: String, date: Date}]}]
  },
  notes: [{note: String, date: Date}]
})



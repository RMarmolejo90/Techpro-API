import mongoose from "mongoose";

const { Schema } = mongoose;

const customerSchema = new Schema ({
  customerName: {type: String, index: true},
  city: {type: String, index: true},
  address: {type: String, index: true},
  equipment: {
    system: [{
      name: String, 
      type: String, 
      filters: {size: String, quantity: Number},
      belts: {size: String, quantity: Number},
      model: String,
      serial: String,
      installDate: Date,
      equipmentNotes: [{note: String, date: Date}]}]
  },
  locationNotes: [{note: String, date: Date}]
})

export const Customer = mongoose.model('Customer', customerSchema);



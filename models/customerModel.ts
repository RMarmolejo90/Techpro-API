import mongoose from "mongoose";

const { Schema } = mongoose;

const EquipmentSchema = new Schema({
  name: String, 
      type: String, 
      filters: {size: String, quantity: Number},
      belts: {size: String, quantity: Number},
      model: String,
      serial: String,
      installDate: Date,
      equipmentNotes: [{note: String, date: Date}]
  }, {_id: true}
);

const customerSchema = new Schema ({
  customerName: {type: String, index: true},
  city: {type: String, index: true},
  address: {type: String, index: true},
  equipment: [EquipmentSchema], 
  locationNotes: [{note: String, date: Date}]
})

export const Customer = mongoose.model('Customer', customerSchema);



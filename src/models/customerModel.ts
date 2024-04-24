import mongoose from "mongoose";

const { Schema } = mongoose;

const NoteSchema = new Schema({
  note: {type: String, required: true},
  date: {type: Date, required: true},
})

const EquipmentSchema = new Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  filters: {type: {size: String, quantity: Number}, required: false},
  belts: {type: {size: String, quantity: Number}, required: false},
  model: {type: String, required: false},
  serial: {type: String, required: false},
  installDate: {type: Date, required: false},
  equipmentNotes: {type:[NoteSchema], required: false}
  }, {_id: true, index: true}
);

const CustomerSchema = new Schema ({
  name: {type: String, index: true, required: true},
  city: {type: String, index: true, required: true},
  address: {type: String, index: true, required: true},
  zip: {type: Number, index: true, required: true},
  equipment: {type:[EquipmentSchema], required: false}, 
  locationNotes: {type:[NoteSchema], required: false}
})

const Customer = mongoose.model('Customer', CustomerSchema);

export { Customer }



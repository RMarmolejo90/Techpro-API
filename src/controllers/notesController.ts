import { Request, Response } from "express";
import { Customer } from '../models/customerModel.js';


const addEquipmentNote = async (req: Request, res: Response) => {
  try {
    const {note, date} = req.body;
    const {customerId, equipmentId} = req.params;
    const customer = await Customer.findById(customerId);
    const equipment = customer?.equipment?.id(equipmentId);
    equipment?.equipmentNotes?.push(note);
    await equipment?.save();
    res.status(201).send('Equipment Note Saved') 
  } catch (error) {
    throw new Error(`Error saving equipment note: ${error}`);
  }
}

const deleteEquipmentNote = async (req:Request, res: Response) => {
  const noteId = req.body;
  const {customerId, equipmentId} = req.params;
  try {
    const customer =  await Customer.findById(customerId);
    const equipment = customer?.equipment?.id(equipmentId);
    //const note = equipment?.equipmentNotes?.id(noteId);
    equipment?.equipmentNotes?.id(noteId)?.deleteOne();
    await customer?.save();
    res.status(200).send('Equipment deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting equipment');
  }
}

export {
  addEquipmentNote,
  deleteEquipmentNote
}
import { Request, Response } from "express";
import { Customer } from '../models/customerModel.js';

interface Note {
  note: string,
  date: Date
}

const addEquipmentNote = async (req: Request, res: Response) => {
  try {
    const note: Note = req.body;
    const {customerId, equipmentId} = req.params;
    console.info(`note: ${note}, cust: ${customerId}, eq: ${equipmentId}`);

    const customer = await Customer.findById(customerId);
    if (!customer) {res.status(404).send('Customer not found')}

    const equipment = customer?.equipment?.id(equipmentId);
    if (!equipment) {res.status(404).send('Equipment not found')}

    equipment?.equipmentNotes.push(note);
    await customer!.save();
    res.status(201).send('Saved'); 
  } catch (error) {
    throw new Error(`Error saving equipment note: ${error}`);
  }
}

const deleteEquipmentNote = async (req:Request, res: Response) => {
  const noteId = req.body;
  const {customerId, equipmentId} = req.params;
  try {
    const customer =  await Customer.findById(customerId);
    if (!customer) {res.status(404).send('Customer not found')}
    const equipment = customer?.equipment?.id(equipmentId);
    if (!equipment) {res.status(404).send('Equipment not found')}
    equipment?.equipmentNotes?.id(noteId)?.deleteOne();
    await customer?.save();
    res.status(200).send('Successfully deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error, could not delete the note');
  }
}

const addLocationNote = async (req: Request, res: Response) => {
  try {
    const note: Note = req.body;
    const {customerId} = req.params;

    const customer = await Customer.findById(customerId);
    if (!customer) {res.status(404).send('Customer not found')}

    customer!.locationNotes?.push(note);
    await customer!.save();
    res.status(201).send('Saved'); 
  } catch (error) {
    throw new Error(`Error saving note: ${error}`);
  }
}

const deleteLocationNote = async (req:Request, res: Response) => {
  const noteId = req.body;
  const {customerId} = req.params;
  try {
    const customer =  await Customer.findById(customerId);
    if (!customer) {res.status(404).send('Customer not found')}

    customer!.locationNotes?.id(noteId)?.deleteOne();
    await customer?.save();
    res.status(200).send('Successfully deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error, could not delete the note');
  }
}

export {
  addEquipmentNote,
  deleteEquipmentNote,
  addLocationNote,
  deleteLocationNote
}
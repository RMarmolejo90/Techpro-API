import { Request, Response } from "express";
import { Customer } from '../models/customerModel.js';

interface Equipment {
name: string,
type: string,
filters: Filters[] | undefined,
belts: Belts[] | undefined,
model: string | undefined,
serial: string | undefined,
installDate: string | undefined,
equipmentNotes: Notes[] | undefined,
_id: string
}
interface Filters {
size: string, 
quantity: number
}

interface Belts {
size: string, 
quantity: number
}
interface Notes {
note: string, 
date: Date
}

// Fetch Equipment Details using Equipment Id

const fetchEquipment = async (req: Request, res: Response) => {
  try {
    const { customerId, equipmentId } = req.params;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).send("Customer not found"); // Customer not found
    }
    if (!customer.equipment) {
      return res.status(404).send("Equipment not found"); // Equipment not found
    }
    const equipment = customer.equipment.id(equipmentId);
    res.status(200).json(equipment); // Return equipment details
  } catch (error) {
    console.error("Error fetching equipment details:", error);
    res.status(500).send(`Error fetching equipment details ${error}`);
  }
}


// Updates the properties of existing equipment
const updateEquipment = async (req: Request, res: Response) => {

try {
  const { customerId, equipmentId } = req.params;
  const customer = await Customer.findById(customerId);
  const equipmentUpdates = req.body.editedEquipment;

  if (!customer) {
    res.status(404).send('Customer not found');
  } else {
    await Customer.findOneAndUpdate(
      { 'equipment._id': equipmentId },
      { $set: {
          'equipment.$.name': equipmentUpdates.name,
          'equipment.$.type': equipmentUpdates.type,
          'equipment.$.model': equipmentUpdates.model,
          'equipment.$.serial': equipmentUpdates.serial,
          'equipment.$.installDate': equipmentUpdates.installDate,
        }
      },     
      { new: true }
    );

    res.status(200).send('Equipment Updated');
  }
} catch (error) {
  console.error(error);
  res.status(500).send('Error updating data');
}
}


// Add a new piece of equipment to an existing customer
const addEquipment = async (req: Request, res: Response) => {
  try {
    const customerId = req.body.customerId;
    const equipmentDetails = req.body.equipment;
    await Customer.findByIdAndUpdate(
      customerId,
      { $push: {equipment: equipmentDetails} },
      { new: true, safe: true, upsert: false }
    )
    res.status(201).send('Success');
  } catch (error) {
    console.log(error)
    res.status(500).send('Error adding equipment details');
  }
}

// Delete existing equipment
const deleteEquipment = async (req: Request, res: Response) => {
  const { customerId, equipmentId } = req.params;
  try {
    await Customer.findByIdAndUpdate(customerId,
      { $pull: { equipment: { _id: equipmentId } } },
      { new: true }
    );
    res.status(200).send('Equipment deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting equipment');
  }
}


const addFilter = async (req: Request, res: Response) => {
  try {
    const filterSize = req.body.filter.size;
    const filterQty = req.body.filter.quantity;
    const {customerId, equipmentId} = req.params;

    const customer = await Customer.findById(customerId);
    if (!customer) {res.status(404).send('Customer not found')}
      else {
        const equipment = customer?.equipment?.id(equipmentId);
        if (!equipment) {res.status(404).send('Equipment not found')}
          else {
            const filter = {
              size: filterSize,
              quantity: filterQty
            }
            equipment?.filters.push(filter);
            await customer!.save();
            res.status(201).send('Saved'); 
        }
      }
  } catch (error) {
    throw new Error(`Error saving info: ${error}`);
  }
}

const deleteFilter = async (req:Request, res: Response) => {
  const filterId = req.body;
  const {customerId, equipmentId} = req.params;
  try {
    const customer =  await Customer.findById(customerId);
    if (!customer) {res.status(404).send('Customer not found')}
    const equipment = customer?.equipment?.id(equipmentId);
    if (!equipment) {res.status(404).send('Equipment not found')}
    equipment?.filters.id(filterId)?.deleteOne();
    await customer?.save();
    res.status(200).send('Successfully deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error, could not delete the filter');
  }
}

const addBelt = async (req: Request, res: Response) => {
  try {
    const beltSize = req.body.belt.size;
    const beltQty = req.body.belt.quantity;
    const {customerId, equipmentId} = req.params;
    const customer = await Customer.findById(customerId);
    if (!customer) {res.status(404).send('Customer not found')}
      else {
        const equipment = customer?.equipment?.id(equipmentId);
        if (!equipment) {res.status(404).send('Equipment not found')}
          else {
            const belt = {
              size: beltSize,
              quantity: beltQty
            }
            equipment?.belts.push(belt);
            await customer!.save();
            res.status(201).send('Saved'); 
        }
      }
  } catch (error) {
    throw new Error(`Error saving info: ${error}`);
  }
}

const deleteBelt = async (req:Request, res: Response) => {
  const beltId = req.body;
  const {customerId, equipmentId} = req.params;
  try {
    const customer =  await Customer.findById(customerId);
    if (!customer) {res.status(404).send('Customer not found')}
    const equipment = customer?.equipment?.id(equipmentId);
    if (!equipment) {res.status(404).send('Equipment not found')}
    equipment?.filters.id(beltId)?.deleteOne();
    await customer?.save();
    res.status(200).send('Successfully deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error, could not delete the belt');
  }
}

export {
  fetchEquipment,
  updateEquipment,
  addEquipment,
  deleteEquipment,
  addFilter,
  deleteFilter,
  addBelt,
  deleteBelt
}

import { Request, Response } from "express";
import { Customer } from '../models/customerModel.js';

interface Filter {
  size: string,
  quantity: number
}
interface Belt {
  size: string,
  quantity: number
}

// Fetch Equipment Details using Equipment Id

const fetchEquipment = async (req: Request, res: Response) => {
  try {
    const { customerId, equipmentId } = req.params;
    console.log(`customer: ${customerId}, equipment: ${equipmentId}`)
    const customer = await Customer.findById(customerId);
    if (!customer) {
      console.log(customerId);
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
  try {const { equipmentId } = req.params;
    const equipmentUpdates: string = req.body;
    await Customer.findOneAndUpdate({_id: equipmentId},
      { $set: {"equipment.$": equipmentUpdates } }, { new: true }
    );
    res.status(200).send('Equipment Updated');
  } 
  catch {
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
    const filter: Filter = req.body;
    const {customerId, equipmentId} = req.params;

    const customer = await Customer.findById(customerId);
    if (!customer) {res.status(404).send('Customer not found')}

    const equipment = customer?.equipment?.id(equipmentId);
    if (!equipment) {res.status(404).send('Equipment not found')}

    equipment?.filters.push(filter);
    await customer!.save();
    res.status(201).send('Saved'); 
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
    const belt: Belt = req.body;
    const {customerId, equipmentId} = req.params;

    const customer = await Customer.findById(customerId);
    if (!customer) {res.status(404).send('Customer not found')}

    const equipment = customer?.equipment?.id(equipmentId);
    if (!equipment) {res.status(404).send('Equipment not found')}

    equipment?.filters.push(belt);
    await customer!.save();
    res.status(201).send('Saved'); 
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

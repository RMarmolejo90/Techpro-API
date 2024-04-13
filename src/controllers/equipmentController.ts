import { Request, Response } from "express";
import { Customer } from '../models/customerModel.js';

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
  const customerId = req.params.customerId;
  const equipmentDetails = req.body;
  try {
    await Customer.findByIdAndUpdate(
      customerId,
      { $push: {equipment: equipmentDetails} },
      { new: true, safe: true, upsert: false }
    )
  } catch (error) {
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

export {
  updateEquipment,
  addEquipment,
  deleteEquipment
}

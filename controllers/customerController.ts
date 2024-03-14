import { Customer, Equipment } from "../models/customerModel.js";
import { formatString } from "../utils/format.js";
import { Request, Response } from "express";

 // I need to create a global interface for Address
interface CustomerData {
  customerName: string,
  city: string,
  address: string,
}


const createCustomer =  async (req: Request, res: Response) => {
  try {
    const {customerName, city, address}: CustomerData = req.body
    const formattedCustomerName = formatString(customerName)
    const formattedCity = formatString(city)
    const formattedAddress = formatString(address)
    const newCustomer = new Customer({
        customerName: formattedCustomerName,
        city: formattedCity,
        address: formattedAddress,
      });

    // check db for street address
    const customerExists: boolean = (await Customer.exists({city: formattedCity, address: formattedAddress})) !== null;
    
    // if address not in db - create new customer
    if (!customerExists){
      await newCustomer.save();
      res.status(201).send('New customer was created')
    } else {
      console.log('customer already exists');}
    }
  catch (error) { 
    console.error(error);
    res.status(500).send('An error occurred while creating the customer'); 
  }
}


// accepts city and address, returns the customer object data
const fetchCustomer = async (req: Request, res: Response) => {
  try {  
    const { address, city } = req.body;
    const formattedAddress: string = formatString(address);
    const formattedCity: string = formatString(city);
    const data = await Customer.findOne({city: formattedCity, address: formattedAddress});
    res.json(data);
  } 
  catch {
    res.status(500).send('Error fetching customer data');
  }
}


// updates properties for existing equipment
const updateEquipment = async (req: Request, res: Response) => {
  try {const { customerId, equipmentId } = req.params;
    const equipmentUpdates: string = req.body;
    await Customer.findOneAndUpdate({_id: customerId, "equipment._id": equipmentId},
      { $set: {"equipment.$": equipmentUpdates } }, { new: true }
    );
    res.status(200).send('Equipment Updated');
  } 
  catch {
      res.status(500).send('Error updating data');
    }
}


// adds a new piece of equipment to the customer document
// This should be updated to accept a "NewEquipment" type, with required and nullible values
const addEquipment = async (req: Request, res: Response) => {
  const customerId = req.params;
  const equipmentDetails = req.body;
  const newEquipment = new Equipment({equipmentDetails});
  try {
    await Customer.findByIdAndUpdate({equipment: newEquipment})
  } catch (error) {
    
  }
}


// deletes the customer permanently
const deleteCustomer = async (req: Request, res: Response) => {
  const customerId = req.params; 
  // check db for street address
  const customerExists: boolean = (await Customer.exists({_id: customerId})) !== null;
  if (!customerExists) {res.status(404).send('customer does not exist')}
  else {
    try{
      await Customer.findByIdAndDelete({_id: customerId})
      res.send('Successfully Deleted');
    }
    catch {
      res.status(500).send('Delete attempt was unsuccessful - Server side error');
    }
  }
}


module.exports = {
  createCustomer,
  fetchCustomer,
  updateEquipment,
  deleteCustomer,
  addEquipment
}


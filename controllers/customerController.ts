import { Customer } from "../models/customerModel.js";
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
    // check db for street address
    const customerExists: boolean = (await Customer.exists({city: formattedCity, address: formattedAddress})) !== null;
    // if address not in db - create new customer
      if (!customerExists){
        console.log('customer does not exist');
        console.log('save to database');
      } else {
        console.log('customer already exists');
      }}
  catch 
    { throw new Error('error checking for duplicates in database') }
}


const fetchCustomer = async (req: Request, res: Response) => {
  try {  
    const { address, city } = req.body;
    const formattedAddress: string = formatString(address);
    const formattedCity: string = formatString(city);
    const data = await Customer.findOne({city: formattedCity, address: formattedAddress});
    return data;
  } 
  catch {
    res.status(500).send('Error fetching customer data');
  }
}


const updateEquipment = async (req: Request, res: Response) => {
  try {const { customerId, equipmentId } = req.params;
    const equipmentUpdates: string = req.body;
    const update = await Customer.findOneAndUpdate({_id: customerId, "equipment._id": equipmentId},
      { $set: {"equipment.$": equipmentUpdates } }, { new: true }
    );
  } 
  catch {
      res.status(500).send('Error updating data');
    }
}


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
  deleteCustomer
}


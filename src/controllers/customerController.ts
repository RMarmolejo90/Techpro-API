import { Customer, Equipment } from "../models/customerModel.js";
import { formatString } from "../utils/format.js";
import { Request, Response } from "express";

 // I need to create a global interface for Address
interface CustomerData {
  customerName: string,
  city: string,
  address: string,
  zip: number
}


// Create new customer
const createCustomer =  async (req: Request, res: Response) => {
  const {customerName, city, address, zip}: CustomerData = req.body
  const formattedCustomerName = formatString(customerName)
  const formattedCity = formatString(city)
  const formattedAddress = formatString(address)
  if (zip.toLocaleString.length === 5) {
    const formattedZip = zip
    try {
      const newCustomer = new Customer({
          customerName: formattedCustomerName,
          city: formattedCity,
          address: formattedAddress,
          zip: formattedZip,
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
  } else {
    res.status(400).send('incorrect zip code format')
  }
}


// Get customer data
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



// Updates the properties of existing equipment
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


// delete the customer permanently
const deleteCustomer = async (req: Request, res: Response) => {
  const customerId = req.params.customerId; 
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
  addEquipment,
  deleteEquipment,
}


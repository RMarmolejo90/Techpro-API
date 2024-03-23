import { Customer } from "../models/customerModel.js";
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
  if (!zip) {return res.status(400).send({ error: "Missing required 'zip' field." });}
  else { 
      // reduce the chance of duplicate entries by checking the db for existing addresses
    if (await Customer.exists({address: formattedAddress, zip: zip}))
      { res.status(400).send({ error: "Customer already exists" })}
    else if (zip.toString().length === 5) {
      const formattedZip = zip
      try {
        const newCustomer = new Customer({
            customerName: formattedCustomerName,
            city: formattedCity,
            address: formattedAddress,
            zip: formattedZip,
          });
    
        await newCustomer.save();
        res.status(201).send('New customer was created')
        }
      catch (error) { 
        console.error(error);
        res.status(500).send('An error occurred while creating the customer'); 
      }
    } else {
    res.status(400).send('incorrect zip code format')
    }
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

// Update existing customer details
const updateCustomer = async (req: Request, res: Response) => {
  const { customerId } = req.params;
  const updateData = req.body;

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return res.status(404).send('Customer not found');
    }

    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).send('An error occurred while updating the customer');
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


export {
  createCustomer,
  fetchCustomer,
  updateCustomer,
  deleteCustomer
}


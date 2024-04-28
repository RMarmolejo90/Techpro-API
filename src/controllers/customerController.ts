import { Customer } from "../models/customerModel.js";
import { formatString } from "../utils/format.js";
import { Request, Response } from "express";

type CustomerData = {
  name: string;
  city: string;
  address: string;
  zip: number;
}

interface SearchRequest {
  searchType: "name" | "city" | "address" | "zip",
  searchText: string;
}


// Create new customer
const createCustomer =  async (req: Request, res: Response) => {
  const {name, city, address, zip}: CustomerData = req.body
  console.log(`Express server - ${name}, ${city}, ${address}, ${zip}`)
  const formattedName = formatString(name)
  const formattedCity = formatString(city)
  const formattedAddress = formatString(address)
  if (!zip || (zip <= 0) || (zip > 99999)) {return res.status(400).send({ error: "Please enter a valid zip code" });}
  else { 
    console.log(name, city, address, zip, "processing");
      // reduce the chance of duplicate entries by checking the db for existing addresses
    if (await Customer.exists({address: formattedAddress, zip: zip}))
      { res.status(400).send({ error: "Customer already exists" })}
    else if (zip.toString().length === 5) {
      const formattedZip = zip
      try {
        const newCustomer = new Customer({
            name: formattedName,
            city: formattedCity,
            address: formattedAddress,
            zip: formattedZip,
          });
    
        const saved = await newCustomer.save();
        res.status(201).send({ message: 'New customer was created', customerId: saved._id });        }
      
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
const searchCustomers = async (req: Request, res: Response): Promise<void> => {
  try { 
    const { searchType, searchText }: SearchRequest = req.body;

    if (!searchType || !searchText) {
      res.json('insufficient request data');
      return;
    }

    const formattedText = formatString(searchText);
    
    // Construct the query object with $regex based on searchType
    const query: Record<string, any> = {}; // Define query object
    query[searchType] = { $regex: formattedText, $options: 'i' }; // Construct regex query based on searchType

    const data = await Customer.find(query); // Find customers matching the dynamic query
    res.json(data);
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching customer data');
  }
}


// Fetch a specific customers data
const fetchCustomer = async (req: Request, res: Response) => {
  try { 
    const id = req.params.id; 
    const data = await Customer.findById(id);
    return res.json(data);
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
  searchCustomers,
  updateCustomer,
  deleteCustomer,
  fetchCustomer
}


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
  const customerExists: boolean = (await Customer.exists({city: city, address: address})) !== null;
  // if address not in db - create new customer
    if (!customerExists){
      console.log('customer does not exist');
      console.log('save to database');
    } else {
      console.log('customer already exists');
    }}
    // if address is in db - respond ('customer already exists');
    catch 
      { throw new Error('error checking for duplicates in database') }
}

const fetchCustomer = async (req: Request, res: Response) => {
  try {  
    const address :string = req.body;
    const data = await Customer.findOne({address: address});
    return data;
  } catch (error) {
    res.status(500).send('Error fetching customer data');
  }

}

const updateCustomer = async (req: Request, res: Response) => {}

const deleteCustomer = async (req: Request, res: Response) => {}

module.exports = {
  createCustomer,
  fetchCustomer,
  updateCustomer,
  deleteCustomer
}


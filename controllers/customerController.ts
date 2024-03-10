import { Customer } from "../models/customerModel";
import { formatString } from "../utils/format";
// I need to create a global interface for Address
interface CustomerData {
  customerName: string,
  city: string,
  address: string,
}

const createCustomer = async (customerData: CustomerData) => {
  // format address
  const customerName = formatString(customerData.customerName)
  const city = formatString(customerData.city)
  const address = formatString(customerData.address)
  // check db for street address
  const customerExists: boolean = (await Customer.exists({city: city, address: address})) !== null;
  // if address not in db - create new customer
  try {
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

const fetchCustomer = async () => {}

const updateCustomer = async () => {}

const deleteCustomer = async () => {}

module.exports = {
  createCustomer,
  fetchCustomer,
  updateCustomer,
  deleteCustomer
}


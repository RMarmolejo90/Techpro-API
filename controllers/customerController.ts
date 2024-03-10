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
  const customerExists: boolean = (await Customer.exists({city: city, address: address})) === null;
  // if address not in db - create new customer

  // if address is in db - respond ('customer already exists');
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


import { Customer } from "../models/customerModel";

// I need to create a global interface for Address
interface Address {
    company: string,
    city: string,
    address: string,
}

const createCustomer = async (address: Address) => {
  // format address
  // check db for street address
  // if adress not in db - create new customer
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


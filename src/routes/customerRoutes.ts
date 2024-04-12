import express from "express";

// customer route imports
import {
  createCustomer,
  searchCustomers, 
  fetchCustomer,
  updateCustomer, 
  deleteCustomer,
} from '../controllers/customerController.js'

// equipment route imports
import {
  updateEquipment,
  addEquipment,
  deleteEquipment
} from '../controllers/equipmentController.js'

// use express router
const router = express.Router();

// use json format
router.use(express.json());


// API routes
router.post('/', createCustomer);
router.get('/', searchCustomers);
router.patch('/', updateCustomer);
router.delete('/', deleteCustomer);
router.get('/customer', fetchCustomer);
router.patch('/equipment', updateEquipment);
router.post('/equipment', addEquipment);
router.delete('/equipment', deleteEquipment);

export default router;
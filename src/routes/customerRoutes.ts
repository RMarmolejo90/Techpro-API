import express from "express";

// customer route imports
import {
  createCustomer,
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
router.get('/', fetchCustomer);
router.patch('/', updateCustomer);
router.delete('/', deleteCustomer);
router.patch('/equipment', updateEquipment);
router.post('/equipment', addEquipment);
router.delete('/equipment', deleteEquipment);

export default router;
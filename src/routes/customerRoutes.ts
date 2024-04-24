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
  fetchEquipment,
  updateEquipment,
  addEquipment,
  deleteEquipment
} from '../controllers/equipmentController.js'

import {
  addEquipmentNote,
  deleteEquipmentNote
} from '../controllers/notesController.js'

// use express router
const router = express.Router();

// use json format
router.use(express.json());


// API routes
router.post('/', createCustomer);
router.get('/search', searchCustomers);
router.patch('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);
router.get('/:id', fetchCustomer);
router.get('/:customerId/equipment/:equipmentId', fetchEquipment);
router.patch('/equipment/:id', updateEquipment);
router.post('/equipment', addEquipment);
router.delete('/equipment/:id', deleteEquipment);
router.post(':customerId/:equipmentId/notes', addEquipmentNote);
router.delete(':customerId/:equipmentId/notes', deleteEquipmentNote);

export default router;
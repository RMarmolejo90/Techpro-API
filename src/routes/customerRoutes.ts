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
  deleteEquipment,
  addFilter,
  deleteFilter,
  addBelt,
  deleteBelt
} from '../controllers/equipmentController.js'

import {
  addEquipmentNote,
  deleteEquipmentNote,
  addLocationNote,
  deleteLocationNote
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
router.patch('/:customerId/equipment/:equipmentId', updateEquipment);
router.post('/equipment', addEquipment);
router.delete('/:customerId/equipment/:equipmentId', deleteEquipment);
router.post('/:customerId/equipment/:equipmentId/notes', addEquipmentNote);
router.delete('/:customerId/equipment/:equipmentId/notes', deleteEquipmentNote);
router.post('/:customerId/notes', addLocationNote);
router.delete('/:customerId/notes', deleteLocationNote);
router.post('/:customerId/equipment/:equipmentId/filters', addFilter);
router.delete('/:customerId/equipment/:equipmentId/filters', deleteFilter);
router.post('/:customerId/equipment/:equipmentId/belts', addBelt);
router.delete('/:customerId/equipment/:equipmentId/belts', deleteBelt);

export default router;
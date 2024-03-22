import express from "express";
import {
  createCustomer,
  fetchCustomer, 
  updateCustomer, 
  deleteCustomer,
  updateEquipment,
  addEquipment,
  deleteEquipment
} from '../controllers/customerController.js'
const router = express.Router();
router.use(express.json());

router.post('/', createCustomer);
router.get('/', fetchCustomer);
router.patch('/', updateCustomer);
router.delete('/', deleteCustomer);
router.patch('/equipment', updateEquipment);
router.post('/equipment', addEquipment);
router.delete('/equipment', deleteEquipment);

export default router;
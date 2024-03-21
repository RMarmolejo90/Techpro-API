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

router.post('/customer', createCustomer);
router.get('/customer', fetchCustomer);
router.patch('/customer', updateCustomer);
router.delete('/customer', deleteCustomer);
router.patch('customer/equipment', updateEquipment);
router.post('customer/equipment', addEquipment);
router.delete('customer/equipment', deleteEquipment);

export default router;
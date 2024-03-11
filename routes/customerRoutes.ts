import { createCustomer, fetchCustomer, updateCustomer, deleteCustomer } from '../controllers/customerController'
import express  from 'express'
const router = express.Router();

router.post('/customer', createCustomer);
router.get('/customer', fetchCustomer);
router.put('/customer', updateCustomer);
router.delete('/customer', deleteCustomer);



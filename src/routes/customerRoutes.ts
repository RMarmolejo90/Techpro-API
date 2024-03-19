import express from "express";

const { createCust, fetchCust, updateCust, deleteCust } = require('../controllers/customerController');

const router = express.Router();
router.use(express.json());

router.post('/customer', createCust);
router.get('/customer', fetchCust);
router.patch('/customer', updateCust);
router.delete('/customer', deleteCust);

export default router;
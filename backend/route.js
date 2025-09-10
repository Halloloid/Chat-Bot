const express = require('express');
const { ansme, getChartHistory } = require('./controller');
const router = express.Router();

router.post('/',ansme);
router.get('/',getChartHistory);

module.exports = router;
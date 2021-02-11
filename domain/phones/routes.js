const express = require('express');

const { INTERNAL_SERVER_ERROR, CREATED } = require('http-status-codes');

const logger = require('../../components/logger')({});
const db = require('../../db');
const createPhonesService = require('./service');

const phonesService = createPhonesService({ db });

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const phones = await phonesService.findAll();
    return res.json(phones);
  } catch (err) {
    logger.error(err);
    return res.status(INTERNAL_SERVER_ERROR).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const phone = await phonesService.findById({ id: parseInt(id, 10) });
    return res.json(phone);
  } catch (err) {
    logger.error(err);
    return res.status(INTERNAL_SERVER_ERROR).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const { body } = req;
    const phone = await phonesService.create({ phone: body });
    return res.status(CREATED).json(phone);
  } catch (err) {
    logger.error(err);
    return res.status(INTERNAL_SERVER_ERROR).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const phone = await phonesService.update({ id: parseInt(id, 10), phone: body });
    return res.json(phone);
  } catch (err) {
    logger.error(err);
    return res.status(INTERNAL_SERVER_ERROR).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteResponse = await phonesService.remove({ id: parseInt(id, 10) });
    return res.json(deleteResponse);
  } catch (err) {
    logger.error(err);
    return res.status(INTERNAL_SERVER_ERROR).json(err);
  }
});

module.exports = router;

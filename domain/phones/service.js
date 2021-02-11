const Sequelize = require('sequelize');

const logger = require('../../components/logger')({});
const db = require('../../db');
const { Op } = Sequelize;

module.exports = () => {
  const findAll = async () => {
    try {
      const phones = await db.Phone.findAll({
      });
      return phones;
    } catch (err) {
      const error = {
        code: 'phones.findById',
        message: `Error while finding phone ${err}`,
      };
      throw error;
    }
  };

  const findById = async ({ id }) => {
    try {
      const phone = await db.Phone.findOne({
        where: { id },
      });

      if (!phone) {
        throw Error(`This phone was deleted or does not exists: ${id}`);
      }

      return phone;
    } catch (err) {
      const error = {
        code: 'phones.findById',
        message: `Error while finding phone ${err}`,
      };
      throw error;
    }
  };

  const create = async ({ phone }) => {
    try {
      const newPhone = await db.Phone.create(phone);
      return newPhone;
    } catch (err) {
      const error = {
        code: 'phone.create.error',
        message: err,
      };
      throw error;
    }
  };

  const update = async ({ id, phone }) => {
    try {
      const foundPhone = await db.Phone.findOne({
        where: { id },
      });
      const updated = await foundPhone.update(phone);
      return updated;
    } catch (err) {
      const error = {
        code: 'phone.update',
        message: `Error while updating phones ${err}`,
      };
      throw error;
    }
  };

  const remove = async ({ id }) => {
    try {
      const deletedPhone = await db.Phone.destroy({
        where: { id },
      });

      if (deletedPhone) {
        return {
          phoneId: id,
          deleted: true,
        };
      }
      return {};
    } catch (err) {
      const error = {
        code: 'phones.delete',
        message: err,
      };
      throw error;
    }
  };

  return {
    findById,
    create,
    findAll,
    update,
    remove,
  };
};

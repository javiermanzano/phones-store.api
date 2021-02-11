module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'phones',
    [
      { "id": 101, "vendor": "Acer", "model": "beTouch E110", "image": "http:image.com", "createdAt": new Date(), "updatedAt": new Date() },
      { "id": 102, "vendor": "Acer", "model": "beTouch E120", "image": "http:image.com", "createdAt": new Date(), "updatedAt": new Date() },
      { "id": 103, "vendor": "Acer", "model": "beTouch E130", "image": "http:image.com", "createdAt": new Date(), "updatedAt": new Date() },
      { "id": 104, "vendor": "Acer", "model": "beTouch E140", "image": "http:image.com", "createdAt": new Date(), "updatedAt": new Date() },
      { "id": 105, "vendor": "Acer", "model": "beTouch E200", "image": "http:image.com", "createdAt": new Date(), "updatedAt": new Date() },
      { "id": 106, "vendor": "Acer", "model": "beTouch E400", "image": "http:image.com", "createdAt": new Date(), "updatedAt": new Date() },
      { "id": 107, "vendor": "Acer", "model": "Liquid", "image": "http:image.com", "createdAt": new Date(), "updatedAt": new Date() },
      { "id": 108, "vendor": "Acer", "model": "Liquid E", "image": "http:image.com", "createdAt": new Date(), "updatedAt": new Date() },
    ],
    {},
  ),

  down: (queryInterface) => queryInterface.bulkDelete('phones', null, {}),
};
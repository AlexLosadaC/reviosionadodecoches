"use strict";

const cars = [
  {
    id: 1,
    brand: "Seat",
    model: "Ibiza",
    year: 2019,
    engine: "diesel",
    cv: 60,
  },
  {
    id: 2,
    brand: "Seat",
    model: "Toledo",
    year: 1999,
    engine: "diesel",
    cv: 120,
  },
];

function findAllCars() {
  //const sql=SELECT * FROM car;
  return cars;
}

function findCarById(id) {
  return cars.find((car) => car.id === +id);
}
module.exports = {
  findAllCars,
  findCarById,
};

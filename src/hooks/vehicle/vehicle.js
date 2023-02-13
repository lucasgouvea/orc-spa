export class Vehicle {
  constructor({ id, model, license_plate }) {
    this.id = id;
    this.model = model;
    this.licensePlate = license_plate;
  }

  toRow() {
    return [this.model, this.licensePlate];
  }
}

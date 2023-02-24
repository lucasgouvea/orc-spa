export class Vehicle {
  constructor({ id, model_description, license_plate }) {
    this.id = id;
    this.model = model_description;
    this.licensePlate = license_plate;
  }

  toRow() {
    return [this.model, this.licensePlate];
  }
}

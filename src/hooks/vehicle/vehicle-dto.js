export class VehiclePostDTO {
  constructor({ model, licensePlate }) {
    this.model = model;
    this.license_plate = licensePlate;
  }
}

export class VehiclePatchDTO {
  constructor({ model, licensePlate }) {
    this.model = model;
    this.license_plate = licensePlate;
  }
}

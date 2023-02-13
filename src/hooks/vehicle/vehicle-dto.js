export class VehiclePostDTO {
  constructor({ model, license_plate }) {
    this.model = model;
    this.license_plate = license_plate;
  }
}

export class VehiclePatchDTO {
  constructor({ model, licensePlate }) {
    this.model = model;
    this.license_plate = licensePlate;
  }
}

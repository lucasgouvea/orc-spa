export class DriverDTO {
  constructor({ age, createdAt, id, licenseA, licenseB, licenseC, licenseD, licenseE, name }) {
    this.age = age;
    this.created_at = createdAt;
    this.id = id;
    this.license_a = licenseA;
    this.license_b = licenseB;
    this.license_c = licenseC;
    this.license_d = licenseD;
    this.license_e = licenseE;
    this.name = name;
  }
}

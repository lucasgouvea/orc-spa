export class DriverPostDTO {
  constructor({ age, licenseA, licenseB, licenseC, licenseD, licenseE, name }) {
    this.age = age;
    this.license_a = licenseA;
    this.license_b = licenseB;
    this.license_c = licenseC;
    this.license_d = licenseD;
    this.license_e = licenseE;
    this.name = name;
  }
}

export class DriverPatchDTO {
  constructor({ age, licenseA, licenseB, licenseC, licenseD, licenseE, name }) {
    this.age = age;
    this.license_a = licenseA;
    this.license_b = licenseB;
    this.license_c = licenseC;
    this.license_d = licenseD;
    this.license_e = licenseE;
    this.name = name;
  }
}

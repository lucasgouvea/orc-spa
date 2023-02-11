export class Driver {
  constructor({
    age,
    created_at,
    id,
    license_a,
    license_b,
    license_c,
    license_d,
    license_e,
    name
  }) {
    this.age = age;
    this.createdAt = created_at;
    this.id = id;
    this.licenses = "";
    this.licenseA = license_a;
    this.licenseB = license_b;
    this.licenseC = license_c;
    this.licenseD = license_d;
    this.licenseE = license_e;
    this.name = name;
    this.setLicenses();
  }

  setLicenses() {
    const licenses = [];
    if (this.licenseA) {
      licenses.push("A");
    }
    if (this.licenseB) {
      licenses.push("B");
    }
    if (this.licenseC) {
      licenses.push("C");
    }
    if (this.licenseD) {
      licenses.push("D");
    }

    this.licenses = licenses.join(",");
  }

  toRow() {
    return [this.name, this.licenses, this.age];
  }
}

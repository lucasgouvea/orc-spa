export const COMPANY_TYPE = {
  CONTRACT: "Contrato",
  AGGREGATE: "Agregado"
};

export class Company {
  constructor({ id, name, type }) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.#setTypeDescription(type);
  }

  #setTypeDescription(type) {
    this.typeDescription = COMPANY_TYPE[type];
  }

  toRow() {
    return [this.name, this.typeDescription];
  }
}

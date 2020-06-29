export class Base {
  id: string;
  name: string;
  url?: string;

  constructor(base: Base) {
    this.id = base.id;
    this.name = base.name;
    this.url = base.url;
  }
}

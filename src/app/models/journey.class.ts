import { Flight } from './flight.class';

export class Journey {
  constructor(
    public flights:Flight[],
    public origin:string,
    public destination:string,
    public price:number) { }
}

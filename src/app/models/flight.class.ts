import { Transport } from './transport.class';

export class Flight {
  constructor(
    public transport:Transport,
    public origin:string,
    public destination:string,
    public price:number) { }
}

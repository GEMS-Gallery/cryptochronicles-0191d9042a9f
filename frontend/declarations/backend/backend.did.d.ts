import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Invoice {
  'id' : bigint,
  'clientName' : string,
  'colorTheme' : string,
  'logo' : [] | [string],
  'clientEmail' : string,
  'companyEmail' : string,
  'clientAddress' : string,
  'timestamp' : Time,
  'companyName' : string,
  'items' : Array<InvoiceItem>,
  'companyAddress' : string,
}
export interface InvoiceItem {
  'description' : string,
  'quantity' : number,
  'price' : number,
}
export type Time = bigint;
export interface _SERVICE {
  'createInvoice' : ActorMethod<
    [
      string,
      string,
      string,
      string,
      string,
      string,
      Array<InvoiceItem>,
      string,
      [] | [string],
    ],
    bigint
  >,
  'getAllInvoices' : ActorMethod<[], Array<Invoice>>,
  'getInvoice' : ActorMethod<[bigint], [] | [Invoice]>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];

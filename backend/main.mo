import Bool "mo:base/Bool";
import Nat "mo:base/Nat";

import Array "mo:base/Array";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Float "mo:base/Float";

actor {
  type InvoiceItem = {
    description: Text;
    quantity: Float;
    price: Float;
  };

  type Invoice = {
    id: Nat;
    companyName: Text;
    companyAddress: Text;
    companyEmail: Text;
    clientName: Text;
    clientAddress: Text;
    clientEmail: Text;
    items: [InvoiceItem];
    colorTheme: Text;
    logo: ?Text;
    timestamp: Time.Time;
  };

  stable var nextId: Nat = 0;
  stable var invoices: [Invoice] = [];

  public func createInvoice(companyName: Text, companyAddress: Text, companyEmail: Text,
                            clientName: Text, clientAddress: Text, clientEmail: Text,
                            items: [InvoiceItem], colorTheme: Text, logo: ?Text) : async Nat {
    let id = nextId;
    nextId += 1;

    let invoice: Invoice = {
      id = id;
      companyName = companyName;
      companyAddress = companyAddress;
      companyEmail = companyEmail;
      clientName = clientName;
      clientAddress = clientAddress;
      clientEmail = clientEmail;
      items = items;
      colorTheme = colorTheme;
      logo = logo;
      timestamp = Time.now();
    };

    invoices := Array.append(invoices, [invoice]);
    id
  };

  public query func getInvoice(id: Nat) : async ?Invoice {
    Array.find(invoices, func(inv: Invoice) : Bool { inv.id == id })
  };

  public query func getAllInvoices() : async [Invoice] {
    invoices
  };
}

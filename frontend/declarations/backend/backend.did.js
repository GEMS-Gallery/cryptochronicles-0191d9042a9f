export const idlFactory = ({ IDL }) => {
  const InvoiceItem = IDL.Record({
    'description' : IDL.Text,
    'quantity' : IDL.Float64,
    'price' : IDL.Float64,
  });
  const Time = IDL.Int;
  const Invoice = IDL.Record({
    'id' : IDL.Nat,
    'clientName' : IDL.Text,
    'colorTheme' : IDL.Text,
    'logo' : IDL.Opt(IDL.Text),
    'clientEmail' : IDL.Text,
    'companyEmail' : IDL.Text,
    'clientAddress' : IDL.Text,
    'timestamp' : Time,
    'companyName' : IDL.Text,
    'items' : IDL.Vec(InvoiceItem),
    'companyAddress' : IDL.Text,
  });
  return IDL.Service({
    'createInvoice' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Vec(InvoiceItem),
          IDL.Text,
          IDL.Opt(IDL.Text),
        ],
        [IDL.Nat],
        [],
      ),
    'getAllInvoices' : IDL.Func([], [IDL.Vec(Invoice)], ['query']),
    'getInvoice' : IDL.Func([IDL.Nat], [IDL.Opt(Invoice)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };

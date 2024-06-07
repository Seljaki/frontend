import { SERVER_URL } from "../../constants/http";

export async function setInvoiceIsPaid(invoiceId, isPaid = true, authToken) {
  const data = await fetch(SERVER_URL + `/invoices/${invoiceId}`, {
    method: 'PUT',
    headers: {
      "x-auth-token": authToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isPaid: isPaid
    })
  });
  if (data.status < 300) {
    const json = await data.json();
    return json.invoice;
  }
  return null
}
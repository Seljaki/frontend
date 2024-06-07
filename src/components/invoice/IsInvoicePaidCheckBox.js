import Checkbox from '@mui/material/Checkbox';
import { setInvoiceIsPaid } from '../../util/http/invoices';

function IsInvoicePaidCheckBox({isPaid = false, token, invoiceId, setIsPaid = (isPaid) => {}}) {

  return (
    <Checkbox checked={isPaid} onClick={async () => {
      const invoice = await setInvoiceIsPaid(invoiceId, !isPaid, token)
      if(invoice)
        setIsPaid(invoice.isPaid)
    }} />
  )
}

export default IsInvoicePaidCheckBox
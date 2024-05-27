
function JobRow({job, onEdit = () => {}, onDelete = () => {}}) {
  const { id, quantity, price, totalPrice, timeTaken, invoice_id, jobtype_id } = job
  return (
    <div>
      {quantity}
    </div>
  )
}

export default JobRow
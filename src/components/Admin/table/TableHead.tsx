
const TableHead = () => {
  const Heading = ["Card ID", "Date", "Name", "Contact", "Status", "Guests", "Seats", "Fila", "Gele", "Message", "Actions"];

  return (
    <thead className="bg-gray-50 whitespace-nowrap">
      <tr>
        {
          Heading.map((head) => (
            <th 
            key={head}
            className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{head}</th>
          ))
        }
      </tr>
    </thead>
  )
}

export default TableHead;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid'
import Toast from "../Toast/Toast";
import TableActionsButtons from "../TableActionButtons/TableActionsButtons";

const CustomerTable = () => {
  const [customers, setCustomers] = useState([])
  const [selectedCustomers, setSelectedCustomers] = useState([])
  const [tstMsg, setTstMsg] = useState('')

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    setTstMsg('')
    try {
      const fetch = await axios.get(`/api/customers/`)
      setCustomers(fetch.data)
    } catch (err) {
      console.log(err)
      setTstMsg('Cannot fetch customers from DB.')
    }
  }

  const deleteCustomers = async () => {
    try {
      setTstMsg('')
      const data = { selectedCustomers }
      await axios.delete('/api/customers/', { data })
      setTstMsg('Customer(s) deleted.')
      fetchCustomers()
    } catch (err) {
      console.log(err)
      setTstMsg('Cannot delete customers.')
    }
  }

  const updatedSelectedCustomers = (selection) => {
    // Filter customers by only currently selected rows by id
    const result = customers.filter(({ id }) => selection.includes(id));
    setSelectedCustomers(result)
  }

  const columns = [
    { field: 'id', headerName: 'ID', flex: 'shrink' },
    { field: 'firstName', headerName: 'First Name', flex: 1, minWidth: 150 },
    { field: 'lastName', headerName: 'Last Name', flex: 1, minWidth: 150 },
    { field: 'lastOrderDate', headerName: 'Last Order Date', flex: 1, type: 'date', minWidth: 150 },
    { field: 'lastOrderPrice', headerName: 'Last Order Price', flex: 1, type: 'number', minWidth: 150 }

  ]

  // Render Table Component
  return (
    <>
      <div style={{ height: 'auto', width: '100%' }}>
        <div style={{ display: 'flex', height: '60vh' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              checkboxSelection
              rows={customers}
              columns={columns}
              onSelectionModelChange={updatedSelectedCustomers}
            />
          </div>
        </div>

        {/* Table Action Buttons */}
        <TableActionsButtons selectedCustomers={selectedCustomers} deleteCustomers={deleteCustomers} />
        {/* Toast Notificaiotn on customer delete */}
        {tstMsg.length > 0 ? <Toast message={tstMsg} isOpen={tstMsg.length > 0} /> : null}
      </div>
    </>
  )
}

export default CustomerTable;
import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { RegistrationForm } from './feature/registrationForm.tsx';
import { ModalHOC } from './common/modal.tsx';
import { useAppSelector } from './hooks.ts'
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Box } from '@mui/material';
import { useAppDispatch } from './hooks.ts'
import { addBulk, deleteItem } from './feature/reducer/registration.tsx';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function App() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users?.users || []);
  const [showForm, setShowForm] = useState(true);
  const [showEditing, setEditing] = useState(false);
  const [rowToDelete, setRowForDelete] = useState({});

  const [formValues, setFormValues] = useState({});
  const [open, setOpen] = React.useState(false);
  const [storedData, setStoredData] = useState(localStorage.getItem('userData'));
  const ref = useRef(0);

  // useEffect(() => {
  //   ref.current = 0;
  //   console.log(ref.current);
  //   console.log(users);
  //   if (users.find(x => x.id === 999 || x.id === 998)?.length > 0) {
  //     console.log('yes');
  //     if (ref.current === 1) {
  //       console.log(ref.current)
  //       ref.current.value = 2;
  //       dispatch(deleteItem(-999)); dispatch(deleteItem(-998))
  //     } else if (ref.current = 0) {
  //       ref.current.value = 1;
  //     }
  //   }
  // }, [users])

  useEffect(() => {
    dispatch(addBulk([{ id: 999, 'name': 'Try 1!', age: '87' }, { id: 998, 'age': 'Try 1! NAN!!!', age: '95' }]));
    setTimeout(() => {
      console.log(storedData)
      let a = JSON.parse(storedData)
      console.log(a);
      Array.isArray(a) && dispatch(addBulk([...a]));
    }, 555)
    return () => {
      localStorage.setItem("userData", JSON.stringify(users));
      setStoredData(JSON.stringify(users))
    }
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      accessorKey: 'name', //simple recommended way to define a column
      header: 'Name',
      muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
      enableHiding: false, //disable a feature for this column
    },
    {
      accessorKey: 'email', //simple recommended way to define a column
      header: 'Email',
      muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
      enableHiding: false, //disable a feature for this column
    },
    {
      accessorFn: (originalRow) => parseInt(originalRow.age), //alternate way
      id: 'age', //id required if you use accessorFn instead of accessorKey
      header: 'Age',
      Header: <i style={{ color: 'red' }}>Age</i>, //optional custom markup
      Cell: ({ cell }) => <i>{cell.getValue().toLocaleString()}</i>, //optional custom cell render
    },
    {
      accessorKey: 'address', //simple recommended way to define a column
      header: 'Address',
      muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
      enableHiding: false, //disable a feature for this column
    },

  ]

  //pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data: users, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowSelection: true, //enable some features
    enableColumnOrdering: true, //enable a feature for all columns
    enableGlobalFilter: false, //turn off a feature,
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <Box>
        <IconButton onClick={() => { setFormValues(row?.original); setShowForm(true); setEditing(true); }}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => { setRowForDelete(row); handleClickOpen() }}>
          <DeleteIcon />
        </IconButton>
      </Box>
    )
  });

  useEffect(() => {
    users.length === 0 && setShowForm(true);
  }, [users])

  const WithModal = ModalHOC(RegistrationForm);
  return (
    <div className="App">
      <div className="App-Center">
        <WithModal show={showForm} setShowForm={setShowForm} values={formValues} showEditing={showEditing} setEditing={setEditing} />
        {users.length > 0 && <div className="App-header">
          <button onClick={() => { setShowForm(true) }}>Add Another!
          </button>

          <div
            className="ag-theme-quartz" // applying the grid theme
            style={{ height: 500, width: "100%", marginTop: '17px' }} // the grid will fill the size of the parent container
          >
            <MaterialReactTable table={table} />;
          </div>
        </div>}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete The Selected Record?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to DELETE the selected record!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={() => { dispatch(deleteItem(rowToDelete?.original?.id)); handleClose() }} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div >
  );
}

export default App;

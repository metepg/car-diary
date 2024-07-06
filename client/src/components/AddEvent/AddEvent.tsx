import { ChangeEvent, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';

type Row = {
  id: number;
  date: Date;
  area: string;
  kilometers: number;
};

type EditRowData = {
  id: number | null;
  date: string;
  area: string;
  kilometers: string | number;
};

const initialEditRowData: EditRowData = {id: null, date: '', area: '', kilometers: ''};

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const AddEvent = () => {
  const [rows] = useState<Row[]>([
    {id: 1, date: new Date(), area: 'Tikkurila-Helsinki', kilometers: 28},
    {id: 2, date: new Date(), area: 'Vantaa-Helsinki', kilometers: 34},
    {id: 3, date: new Date(), area: 'Helsinki-Vantaa', kilometers: 45},
  ]);

  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editRowData, setEditRowData] = useState<EditRowData>(initialEditRowData);

  const handleEditClick = (row: Row): void => {
    setEditRowId(row.id);
    setEditRowData({
      id: row.id,
      date: formatDate(row.date),
      area: row.area,
      kilometers: row.kilometers,
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const {name, value} = e.target;
    setEditRowData({...editRowData, [name]: value});
  };

  // const handleSaveClick = (): void => {
  //   if (editRowId !== null) {
  //     const updatedRows = rows.map((row: Row) =>
  //       row.id === editRowId
  //         ? {
  //           ...row,
  //           ...editRowData,
  //           date: new Date(`${new Date().getFullYear()}-${editRowData.date.split('.')[1]}-${editRowData.date.split('.')[0]}`),
  //           kilometers: Number(editRowData.kilometers),
  //         }
  //         : row
  //     );
  //     setRows(updatedRows);
  //     setEditRowId(null);
  //     setEditRowData(initialEditRowData);
  //   }
  // };

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{width: '33%'}}>PVM</TableCell>
            <TableCell style={{width: '33%'}}>ALUE</TableCell>
            <TableCell style={{width: '33%'}}>KM</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} onClick={() => handleEditClick(row)} hover>
              <TableCell style={{width: '33%'}}>
                {editRowId === row.id ? (
                  <TextField
                    name="date"
                    value={editRowData.date}
                    onChange={handleInputChange}
                    fullWidth
                    size="small"
                    margin="dense"
                  />
                ) : (
                  formatDate(row.date)
                )}
              </TableCell>
              <TableCell style={{width: '33%'}}>
                {editRowId === row.id ? (
                  <TextField
                    name="area"
                    value={editRowData.area}
                    onChange={handleInputChange}
                    fullWidth
                    size="small"
                    margin="dense"
                  />
                ) : (
                  row.area
                )}
              </TableCell>
              <TableCell style={{width: '33%'}}>
                {editRowId === row.id ? (
                  <TextField
                    name="kilometers"
                    value={editRowData.kilometers}
                    onChange={handleInputChange}
                    fullWidth
                    size="small"
                    margin="dense"
                  />
                ) : (
                  row.kilometers
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AddEvent;
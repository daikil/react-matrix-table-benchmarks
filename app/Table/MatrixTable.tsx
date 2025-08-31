import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { ChcekboxCell } from '~/CheckboxCell/CheckboxCell';

const createColumns = (count: number) =>
  Array.from({ length: count }, (_, i) => `column ${i + 1}`);

const createRows = (count: number) =>
  Array.from({ length: count }, (_, i) => `row ${i + 1}`);

const columns = createColumns(30);
const rows = createRows(50);

export const MatrixTable = () => {
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const onChange = (selectedKey: string) => {
    console.log(selectedKey);

    setSelected((prev) => ({
      ...prev,
      [selectedKey]: !prev[selectedKey],
    }));
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {columns.map((col, index) => (
              <TableCell key={index}>{col}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow key={row}>
                <TableCell>{row}</TableCell>
                {columns.map((col) => (
                  <ChcekboxCell
                    key={`${row}_${col}`}
                    selectedKey={`${row}_${col}`}
                    selected={!!selected[`${row}_${col}`]}
                    setSelected={onChange}
                  />
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

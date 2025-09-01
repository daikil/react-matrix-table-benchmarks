import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ChcekboxCell } from '~/CheckboxCell/CheckboxCell';
import { checkboxAtomsAtom, useCheckboxAtoms } from '~/atom';
import { useAtomValue } from 'jotai';

const createColumns = (count: number) =>
  Array.from({ length: count }, (_, i) => `column ${i + 1}`);

const createRows = (count: number) =>
  Array.from({ length: count }, (_, i) => `row ${i + 1}`);

const columns = createColumns(30);
const rows = createRows(50);

export const MatrixTable = () => {
  const { loading } = useCheckboxAtoms();

  const list = useAtomValue(checkboxAtomsAtom);
  console.log(loading, list);
  if (loading) {
    return;
  }

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

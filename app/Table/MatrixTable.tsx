import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { ChcekboxCell } from '~/CheckboxCell/CheckboxCell';
import { TableVirtuoso } from 'react-virtuoso';

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

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props: any) => (
      <Table {...props} sx={{ minWidth: 650 }} size="small" />
    ),
    TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableHead {...props} ref={ref} />
    )),
    TableRow,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  const FixedHeaderContent = () => {
    return (
      <TableRow>
        <TableCell></TableCell>
        {columns.map((col, index) => (
          <TableCell key={index}>{col}</TableCell>
        ))}
      </TableRow>
    );
  };

  const RowContent = (_index: number, row: string) => {
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
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <Paper style={{ height: '100vh', width: '100%' }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={FixedHeaderContent}
        itemContent={RowContent}
      />
    </Paper>
  );
};

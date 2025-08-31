import React from 'react';
import { ToggleButton, TableCell } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

type Props = {
  selectedKey: string;
  selected: boolean;
  setSelected: (selectedKey: string) => void;
};

const CheckboxCellInner = ({ selectedKey, selected, setSelected }: Props) => {
  return (
    <TableCell>
      <ToggleButton
        value={selectedKey}
        selected={selected}
        onChange={(ev, value) => setSelected(value)}
      >
        <CheckIcon />
      </ToggleButton>
    </TableCell>
  );
};

// React.memo で包む。デフォルトの浅い比較でも問題ないが、明示的に比較関数を渡す例。
export const CheckboxCell = React.memo(
  CheckboxCellInner,
  (prevProps, nextProps) =>
    prevProps.selected === nextProps.selected &&
    prevProps.selectedKey === nextProps.selectedKey &&
    prevProps.setSelected === nextProps.setSelected
);

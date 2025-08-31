import { ToggleButton, TableCell } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

type Props = {
  selectedKey: string;
  selected: boolean;
  setSelected: (selectedKey: string) => void;
};
export const ChcekboxCell = ({ selectedKey, selected, setSelected }: Props) => {
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

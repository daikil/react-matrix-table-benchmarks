import { ToggleButton, TableCell } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { atom, useAtom } from 'jotai';
import { useEffect, useMemo } from 'react';
import { checkboxAtomsAtom } from '~/atom';

type Props = {
  selectedKey: string;
};

export const ChcekboxCell = ({ selectedKey }: Props) => {
  // checkboxAtoms の参照と setter を取得（Provider 内で動作している前提）
  const [checkboxAtoms, setCheckboxAtoms] = useAtom(checkboxAtomsAtom);

  // このコンポーネント専用のローカル atom（安定）
  const localAtom = useMemo(() => atom<boolean>(false), []);

  // 実際に useAtom で使う atom（既に登録されていればそれを使う）
  const atomToUse = checkboxAtoms[selectedKey] ?? localAtom;

  // 登録がまだなら副作用で checkboxAtomsAtom に登録する（レンダー中に set しない）
  useEffect(() => {
    if (!checkboxAtoms[selectedKey]) {
      setCheckboxAtoms((prev) =>
        prev[selectedKey] ? prev : { ...prev, [selectedKey]: localAtom }
      );
    }
    // checkboxAtoms を依存に含めることで map が更新されたら再評価される
  }, [checkboxAtoms, selectedKey, setCheckboxAtoms, localAtom]);

  const [state, setState] = useAtom(atomToUse);

  return (
    <TableCell>
      <ToggleButton
        value={selectedKey}
        selected={state}
        onChange={() => setState(!state)}
      >
        <CheckIcon />
      </ToggleButton>
    </TableCell>
  );
};

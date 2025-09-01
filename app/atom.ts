// src/features/misc/atoms/counterAtoms.ts
import { atom, useAtom, type PrimitiveAtom } from 'jotai';
import { useEffect, useState } from 'react';

const initialState = false;
// selectedKey -> アトムのマップ
export const checkboxAtomsAtom = atom<Record<string, PrimitiveAtom<boolean>>>(
  {}
);

/**
 * パネルIDに基づいてアトムを取得または作成するファクトリ関数
 */
export const getCheckboxAtom = (
  selectedKey: string
): PrimitiveAtom<boolean> => {
  const [checkboxAtoms, setCheckboxAtoms] = useAtom(checkboxAtomsAtom);

  const existing = checkboxAtoms[selectedKey];
  if (existing) return existing;

  const newAtom = atom<boolean>(initialState);
  setCheckboxAtoms((prev) => {
    return { ...prev, [selectedKey]: newAtom };
  });

  return newAtom;
};

export const useCheckboxAtoms = () => {
  const [_, setCheckboxAtoms] = useAtom(checkboxAtomsAtom);
  const [state, setState] = useState<{ loading: boolean; error: unknown }>({
    loading: false,
    error: null,
  });

  const fetchData = async () => {
    setState({ loading: true, error: null });

    try {
      const res = await fetch('http://localhost:3000/data');
      const data: { row: string; col: string }[] = await res.json();
      console.log(data);

      setCheckboxAtoms(
        data.reduce(
          (obj, d) => ({
            ...obj,
            [`${d.row}_${d.col}`]: atom<boolean>(true),
          }),
          {}
        )
      );
      setState({ loading: false, error: null });
    } catch (err) {
      setState({ loading: false, error: (err as Error).message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return state;
};

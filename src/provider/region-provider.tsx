import {
  createContext,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type ReactNode,
  type SetStateAction,
} from 'react';

export type RegionContextValue = {
  region: string;
  setRegion: Dispatch<SetStateAction<string>>;
};

const INITIAL_REGION = '서울특별시 중구 신당동';

export const RegionContext = createContext<RegionContextValue | null>(null);

export default function RegionProvider({
  children,
}: PropsWithChildren): ReactNode {
  const [region, setRegion] = useState(INITIAL_REGION);

  return (
    <RegionContext value={{ region, setRegion }}>{children}</RegionContext>
  );
}

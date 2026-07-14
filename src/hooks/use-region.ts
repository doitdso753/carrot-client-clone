import { useContext } from 'react';
import {
  RegionContext,
  type RegionContextValue,
} from '@/provider/region-provider.tsx';

export default function useRegion(): RegionContextValue {
  const context = useContext(RegionContext);

  if (!context) {
    throw new Error('useRegion은 RegionProvider 내부에서 사용해야 합니다.');
  }

  return context;
}

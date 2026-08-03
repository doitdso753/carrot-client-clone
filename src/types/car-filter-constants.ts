export const CAR_BRANDS = [
  { code: 'hyundai', label: '현대' },
  { code: 'kia', label: '기아' },
  { code: 'genesis', label: '제네시스' },
  { code: 'mercedesBenz', label: '벤츠' },
  { code: 'bmw', label: 'BMW' },
  { code: 'audi', label: '아우디' },
  { code: 'mini', label: '미니' },
  { code: 'lexus', label: '렉서스' },
  { code: 'landRover', label: '랜드로버' },
  { code: 'volkswagen', label: '폭스바겐' },
  { code: 'chevrolet', label: '쉐보레' },
  { code: 'renault', label: '르노코리아' },
  { code: 'kgMobility', label: 'KG모빌리티' },
  { code: 'tesla', label: '테슬라' },
] as const;

export const CAR_BRAND_ICONS: Readonly<Record<string, string>> = {
  audi: AudiIcon,
  bmw: BmwIcon,
  chevrolet: ChevroletIcon,
  genesis: GenesisIcon,
  hyundai: HyundaiIcon,
  kgMobility: KgMobilityIcon,
  kia: KiaIcon,
  landRover: LandRoverIcon,
  lexus: LexusIcon,
  mercedesBenz: MercedesBenzIcon,
  mini: MiniIcon,
  renault: RenaultIcon,
  tesla: TeslaIcon,
  volkswagen: VolkswagenIcon,
};

export const CAR_TYPES = [
  { code: 'compact', label: '경차/소형차' },
  { code: 'midSize', label: '준중형차' },
  { code: 'large', label: '준/대형차' },
  { code: 'suv', label: 'SUV/RV' },
  { code: 'van', label: '승합/화물차' },
  { code: 'etc', label: '기타' },
] as const;

export const CAR_FUEL_TYPES = [
  { code: 'gasoline', label: '가솔린 (휘발유)' },
  { code: 'gasolineHybrid', label: '하이브리드 (가솔린+전기)' },
  { code: 'diesel', label: '디젤 (경유)' },
  { code: 'dieselHybrid', label: '하이브리드 (디젤+전기)' },
  { code: 'lpg', label: 'LPG' },
  { code: 'lpgGasoline', label: '하이브리드 (LPG+가솔린)' },
  { code: 'lpgElectric', label: '하이브리드 (LPG+전기)' },
  { code: 'cng', label: 'CNG (천연가스)' },
  { code: 'electric', label: '전기' },
  { code: 'solar', label: '태양열' },
  { code: 'hybrid', label: '하이브리드' },
  { code: 'hydrogen', label: '수소전기' },
] as const;

export const CAR_TRANSMISSIONS = [
  { code: 'automatic', label: '자동 (A/T)' },
  { code: 'manual', label: '수동 (M/T)' },
] as const;

export const CAR_SALE_TYPES = [
  { code: 'general', label: '일반' },
  { code: 'lease', label: '리스 승계' },
  { code: 'rent', label: '렌트' },
] as const;
import {
  AudiIcon,
  BmwIcon,
  ChevroletIcon,
  GenesisIcon,
  HyundaiIcon,
  KgMobilityIcon,
  KiaIcon,
  LandRoverIcon,
  LexusIcon,
  MercedesBenzIcon,
  MiniIcon,
  RenaultIcon,
  TeslaIcon,
  VolkswagenIcon,
} from '@/assets/icons/car-brand-icons/index.ts';

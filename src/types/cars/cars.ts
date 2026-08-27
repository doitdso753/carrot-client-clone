import type { ReactNode } from 'react';

export type CarListItemStatus = 'reserved' | 'sold';

export type CarDetailInfoRow = {
  id?: string;
  label: ReactNode;
  value: ReactNode;
};

export type CarDetailOption = {
  code: 'singleOwner' | 'key';
  label: string;
};

export type CarLeaseInfo = {
  remainingMonths: number;
  totalMonthlyPayment: string;
  acquisitionPayment: string;
  maturityAmount: string;
  earlyTerminationAmount: string;
  totalAcquisitionCost: string;
};

export type CarSaleInfo = {
  registrationCost: string;
  directTradeSavings: string;
};

export type CarVehicleInfo = {
  bodyType: string;
  registrationDate: string;
  displacement: string;
  fuel: string;
  transmission: string;
};

export type CarInsuranceInfo = {
  ownCarDamage: string;
  ownerChanges: string;
  usage: string;
  totalLossOrFlooding: string;
};

type CarListItemBase = {
  id: number;
  title: string;
  status?: CarListItemStatus;
  priceText: string;
  modelYearText: string;
  mileageText: string;
  location: string;
  address: string;
  createdAt: string;
  commentCount: number;
  favoriteCount: number;
  viewCount: number;
  description: string;
  thumbnailImageUrl: string;
  imageUrls: string[];
  detailOptions: CarDetailOption[];
  vehicleInfo: CarVehicleInfo;
  insuranceInfo: CarInsuranceInfo;
};

type CarSaleListItem = CarListItemBase & {
  transactionType: 'sale';
  saleInfo: CarSaleInfo;
  leaseInfo?: never;
};

type CarLeaseListItem = CarListItemBase & {
  transactionType: 'lease';
  saleInfo?: never;
  leaseInfo: CarLeaseInfo;
};

export type CarListItem = CarSaleListItem | CarLeaseListItem;

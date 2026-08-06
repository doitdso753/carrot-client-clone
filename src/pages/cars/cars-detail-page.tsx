import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router';
import CarDetail from '@/components/cars/car-detail';
import HeaderWithSearch from '@/layouts/header-with-search/header-with-search';
import RootLayout from '@/layouts/root-layout';
import { CAR_LIST_ITEMS } from '@/types/car-list-constants';

export default function CarsDetailPage(): ReactNode {
  const { itemId } = useParams();
  const item = CAR_LIST_ITEMS.find(({ id }) => id === Number(itemId));

  return (
    <RootLayout>
      <div className="flex min-h-screen flex-col">
        <HeaderWithSearch />
        {item ? (
          <CarDetail item={item} />
        ) : (
          <main className="detail-page-wrapper flex flex-col items-center gap-6">
            <h1 className="text-2xl font-bold">차량을 찾을 수 없습니다.</h1>
            <Link
              className="text-base text-(--color-palette-gray-700) underline"
              to="/cars"
            >
              중고차 목록으로 돌아가기
            </Link>
          </main>
        )}
      </div>
    </RootLayout>
  );
}

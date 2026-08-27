import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router';
import BuySellDetail from '@/components/buy-sell/buy-sell-detail';
import HeaderWithSearch from '@/layouts/header-with-search/header-with-search';
import RootLayout from '@/layouts/root-layout';
import { BUY_SELL_ITEMS } from '@/types/buy-sell';

export default function BuySellDetailPage(): ReactNode {
  const { itemId } = useParams();
  const item = BUY_SELL_ITEMS.find(({ id }) => id === Number(itemId));

  return (
    <RootLayout>
      <div className="flex min-h-screen flex-col">
        <HeaderWithSearch />
        {item ? (
          <BuySellDetail item={item} />
        ) : (
          <main className="detail-page-wrapper flex flex-col items-center gap-6">
            <h1 className="text-2xl font-bold">상품을 찾을 수 없습니다.</h1>
            <Link
              className="text-base text-(--color-palette-gray-700) underline"
              to="/buy-sell"
            >
              중고거래 목록으로 돌아가기
            </Link>
          </main>
        )}
      </div>
    </RootLayout>
  );
}

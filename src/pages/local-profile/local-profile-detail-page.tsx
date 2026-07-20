import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router';
import LocalProfileDetail from '@/components/local-profile/local-profile-detail.tsx';
import HeaderWithSearch from '@/layouts/header-with-search/header-with-search.tsx';
import RootLayout from '@/layouts/root-layout.tsx';
import { LOCAL_PROFILE_ITEMS } from '@/types/local-profile-constants.ts';

export default function LocalProfileDetailPage(): ReactNode {
  const { itemId } = useParams();
  const item = LOCAL_PROFILE_ITEMS.find(({ id }) => id === Number(itemId));

  return (
    <RootLayout>
      <div className="flex min-h-screen flex-col">
        <HeaderWithSearch activeCategoryCode="localProfile" />
        {item ? (
          <LocalProfileDetail item={item} />
        ) : (
          <main className="local-profile-detail-wrapper flex flex-col items-center gap-6">
            <h1 className="text-2xl font-bold">업체를 찾을 수 없습니다.</h1>
            <Link
              className="text-base text-(--color-palette-gray-700) underline"
              to="/local-profile"
            >
              동네업체 목록으로 돌아가기
            </Link>
          </main>
        )}
      </div>
    </RootLayout>
  );
}

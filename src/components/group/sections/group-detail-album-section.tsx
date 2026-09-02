import type { ReactNode } from 'react';
import SimpleImageGridSlider from '@/components/ui/image/simple-image-grid-slider.tsx';
import type { GroupItem } from '@/types/group';
import GroupDetailSection from '../group-detail-section.tsx';

type GroupDetailAlbumSectionProps = {
  item: GroupItem;
};

export default function GroupDetailAlbumSection({
  item,
}: GroupDetailAlbumSectionProps): ReactNode {
  return (
    <GroupDetailSection title="앨범">
      <div className="group-detail-album">
        <SimpleImageGridSlider
          imageUrls={item.albumImageUrls}
          title={`${item.title} 앨범`}
        />
      </div>
    </GroupDetailSection>
  );
}

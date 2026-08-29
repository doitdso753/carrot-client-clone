import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { LocationIcon, MemberIcon } from '@/assets/icons';
import { formatThousandsBySuffix } from '@/lib/utils.ts';
import type { GroupItem } from '@/types/group';

type GroupListItemProps = {
  item: GroupItem;
};

export default function GroupListItem({ item }: GroupListItemProps): ReactNode {
  return (
    <li>
      <Link className="group-list-item" to={`/group/${item.id}`}>
        <div className="group-list-item-image">
          <img alt="" src={item.imageUrl} />
        </div>
        <div className="group-list-item-text">
          <h2>{item.title}</h2>
          <p className="group-list-item-description">{item.description}</p>
          <div className="group-list-item-metadata">
            <span className="group-list-item-metadata-item">
              <LocationIcon />
              {item.location}
            </span>
            <span aria-hidden="true">·</span>
            <span className="group-list-item-metadata-item">
              <MemberIcon />
              {formatThousandsBySuffix(item.memberCount, '')}
            </span>
            <span aria-hidden="true">·</span>
            <span>{item.category.categoryName}</span>
          </div>
        </div>
      </Link>
    </li>
  );
}

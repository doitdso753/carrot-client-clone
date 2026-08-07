import type { ReactNode } from 'react';
import { KeyIcon, PersonIcon } from '@/assets/icons';
import type { CarDetailOption } from '@/types/types';

type CarDetailOptionsSectionProps = {
  options: CarDetailOption[];
};

export default function CarDetailOptionsSection({
  options,
}: CarDetailOptionsSectionProps): ReactNode {
  if (options.length === 0) {
    return null;
  }

  return (
    <section className="car-detail-section">
      <h2>추가 옵션</h2>
      <ul className="car-detail-option-list">
        {options.map((option) => (
          <li className="car-detail-option" key={option.code}>
            {option.code === 'singleOwner' ? <PersonIcon /> : <KeyIcon />}
            <span>{option.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

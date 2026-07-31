import type { ReactNode } from 'react';
import { ChevronDownIcon } from '@/assets/icons';

export const DEFAULT_START_TIME = '00:00';
export const DEFAULT_END_TIME = '23:00';

const TIME_OPTIONS = Array.from({ length: 24 }, (_, hour) => {
  return `${hour.toString().padStart(2, '0')}:00`;
});

type TimeFilterSectionProps = {
  endTime: string;
  startTime: string;
  title: string;
  onEndTimeChange: (value: string) => void;
  onApply: () => void;
  onStartTimeChange: (value: string) => void;
};

export default function TimeFilterSection({
  endTime,
  startTime,
  title,
  onEndTimeChange,
  onApply,
  onStartTimeChange,
}: TimeFilterSectionProps): ReactNode {
  return (
    <section className="search-filter-section">
      <h3>{title}</h3>
      <div className="search-filter-time-range">
        <label>
          <span className="search-filter-time-label">시작</span>
          <span className="search-filter-time-select-box">
            <select
              className="common-number-input search-filter-time-select"
              value={startTime}
              onChange={(event) => onStartTimeChange(event.target.value)}
            >
              {TIME_OPTIONS.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            <ChevronDownIcon />
          </span>
        </label>
        <span aria-hidden="true">-</span>
        <label>
          <span className="search-filter-time-label">종료</span>
          <span className="search-filter-time-select-box">
            <select
              className="common-number-input search-filter-time-select"
              value={endTime}
              onChange={(event) => onEndTimeChange(event.target.value)}
            >
              {TIME_OPTIONS.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            <ChevronDownIcon />
          </span>
        </label>
      </div>
      <button
        className="search-filter-apply-button"
        type="button"
        onClick={onApply}
      >
        적용하기
      </button>
    </section>
  );
}

import type { ReactNode } from 'react';
import { ClockFillIcon, LockFillIcon, MemberGroupIcon } from '@/assets/icons';
import { getDateDayText, getMonthText } from '@/lib/date-utils.ts';
import { GROUP_SCHEDULE_STATUS_LABELS, type GroupItem } from '@/types/group';
import type { GroupSchedule } from '@/types/group';
import GroupDetailSection from '../group-detail-section.tsx';

type GroupDetailScheduleSectionProps = {
  item: GroupItem;
};

type GroupScheduleItemProps = {
  schedule: GroupSchedule;
};

const PRIVATE_GROUP_SCHEDULE_TITLE = '모임에만 공개된 일정이에요.';

function GroupScheduleItem({ schedule }: GroupScheduleItemProps): ReactNode {
  return (
    <li className="group-detail-schedule-item">
      <time className="group-detail-schedule-date" dateTime={schedule.date}>
        <span>{getMonthText(schedule.date)}</span>
        <strong>{getDateDayText(schedule.date)}</strong>
      </time>
      <div className="group-detail-schedule-text">
        <h3 className={schedule.isPublic ? undefined : 'is-private'}>
          {!schedule.isPublic && <LockFillIcon />}
          <span>
            {schedule.isPublic ? schedule.title : PRIVATE_GROUP_SCHEDULE_TITLE}
          </span>
        </h3>
        <p
          className={`group-detail-schedule-status group-detail-schedule-status--${schedule.status}`}
        >
          {GROUP_SCHEDULE_STATUS_LABELS[schedule.status]}
        </p>
        <div className="group-detail-schedule-meta">
          <span>
            <ClockFillIcon />
            {schedule.time}
          </span>
          <span>
            <MemberGroupIcon />
            {schedule.currentMemberCount}/{schedule.maximumMemberCount}명
          </span>
        </div>
      </div>
    </li>
  );
}

export default function GroupDetailScheduleSection({
  item,
}: GroupDetailScheduleSectionProps): ReactNode {
  return (
    <GroupDetailSection title={`일정 ${item.schedules.length}`}>
      <ul className="group-detail-schedule-list">
        {item.schedules.map((schedule) => (
          <GroupScheduleItem key={schedule.id} schedule={schedule} />
        ))}
      </ul>
    </GroupDetailSection>
  );
}

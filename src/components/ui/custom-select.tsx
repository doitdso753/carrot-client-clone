import {
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { ChevronDownThinIcon } from '@/assets/icons';

export type CustomSelectOption<TValue extends string> = {
  label: string;
  value: TValue;
};

type CustomSelectProps<TValue extends string> = {
  ariaLabel: string;
  options: readonly CustomSelectOption<TValue>[];
  value: TValue;
  onChange: (value: TValue) => void;
};

export default function CustomSelect<TValue extends string>({
  ariaLabel,
  options,
  value,
  onChange,
}: CustomSelectProps<TValue>): ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  const handleBlur = (event: FocusEvent<HTMLDivElement>): void => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelectOption = (optionValue: TValue): void => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div
      className="common-select"
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <button
        className="common-select-trigger"
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((currentIsOpen) => !currentIsOpen)}
      >
        <span>{selectedOption?.label}</span>
        <ChevronDownThinIcon />
      </button>

      {isOpen && (
        <ul className="common-select-options" role="listbox">
          {options.map((option) => (
            <li key={option.value}>
              <button
                className="common-select-option"
                type="button"
                role="option"
                aria-selected={option.value === value}
                onClick={() => handleSelectOption(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

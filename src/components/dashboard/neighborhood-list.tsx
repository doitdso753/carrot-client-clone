import type { ReactNode } from 'react';

type NeighborhoodListProps = {
  neighborhoods: readonly string[];
};

export default function NeighborhoodList({ neighborhoods }: NeighborhoodListProps): ReactNode {
  return (
    <section className="mt-14 flex w-full flex-wrap justify-start gap-5 pb-24">
      {neighborhoods.map((neighborhood) => (
        <a
          className="rounded-full bg-(--color-palette-gray-200) py-4 pr-7 pl-7 text-sm font-extrabold text-(--color-palette-gray-900) transition hover:bg-(--color-palette-gray-300)"
          href="/"
          key={neighborhood}
        >
          {neighborhood}
        </a>
      ))}
    </section>
  );
}

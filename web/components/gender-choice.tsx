"use client";

import { Mars, Venus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GENDERS } from "@/lib/schemas/visit";
import { useT } from "@/lib/i18n/client";

const STYLE: Record<
  (typeof GENDERS)[number],
  { icon: LucideIcon; checked: string }
> = {
  lk: {
    icon: Mars,
    checked:
      "peer-checked:border-[#1d4ed8] peer-checked:bg-[#eff6ff] peer-checked:text-[#1d4ed8]",
  },
  pr: {
    icon: Venus,
    checked:
      "peer-checked:border-[#db2777] peer-checked:bg-[#fdf2f8] peer-checked:text-[#db2777]",
  },
};

export function GenderChoice({
  name = "gender",
  value,
  onChange,
  invalid,
  describedBy,
}: {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  invalid?: boolean;
  describedBy?: string;
}) {
  const t = useT();
  const controlled = value !== undefined;

  return (
    <div className="flex flex-wrap gap-sm">
      {GENDERS.map((gender) => {
        const { icon: Icon, checked } = STYLE[gender];
        return (
          <label key={gender} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={gender}
              className="peer sr-only"
              {...(controlled
                ? {
                    checked: value === gender,
                    onChange: () => onChange?.(gender),
                  }
                : {})}
              aria-invalid={invalid}
              aria-describedby={describedBy}
            />
            <span
              className={`gender-pill flex min-h-[48px] items-center gap-xs rounded-lg border
                          border-border-strong px-lg text-body-sm text-ink-muted
                          transition-colors duration-150
                          peer-focus-visible:ring-2 peer-focus-visible:ring-primary/20
                          peer-focus-visible:ring-offset-2 ${checked}`}>
              <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
              {t(gender === "lk" ? "gender.lk" : "gender.pr")}
            </span>
          </label>
        );
      })}
    </div>
  );
}

import "server-only";
import { prisma } from "@/lib/prisma";
import { shouldAutoReopen } from "@/lib/settings-rules";

export type SettingRow = Awaited<ReturnType<typeof readSetting>>;

export async function readSetting() {
  return prisma.setting.findUnique({ where: { id: 1 } });
}

export async function ensureAutoReopen() {
  const setting = await readSetting();
  if (!setting) return null;
  if (!shouldAutoReopen(setting)) return setting;

  return prisma.setting.update({
    where: { id: 1 },
    data: { isOpen: true, closedReason: null, reopenAt: null },
  });
}

import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

/** Formato persistido localmente quando DATABASE_URL não está configurada. */
export type LocalEventRecord = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  city: string;
  startAt: Date;
  endAt: Date | null;
  status: string;
  public: boolean;
  featured: boolean;
  category: string;
  region: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type StoredEvent = Omit<LocalEventRecord, "startAt" | "endAt" | "createdAt" | "updatedAt"> & {
  startAt: string;
  endAt: string | null;
  createdAt: string;
  updatedAt?: string;
};

const DATA_DIR = path.join(process.cwd(), ".data");
const FILE = path.join(DATA_DIR, "events.json");

function revive(row: StoredEvent): LocalEventRecord {
  const createdAt = new Date(row.createdAt);
  return {
    ...row,
    startAt: new Date(row.startAt),
    endAt: row.endAt ? new Date(row.endAt) : null,
    createdAt,
    updatedAt: row.updatedAt ? new Date(row.updatedAt) : createdAt,
  };
}

async function readAll(): Promise<LocalEventRecord[]> {
  try {
    const raw = await readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as StoredEvent[];
    return parsed.map(revive);
  } catch {
    return [];
  }
}

async function writeAll(rows: LocalEventRecord[]) {
  await mkdir(DATA_DIR, { recursive: true });
  const payload: StoredEvent[] = rows.map((row) => ({
    ...row,
    startAt: row.startAt.toISOString(),
    endAt: row.endAt ? row.endAt.toISOString() : null,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }));
  await writeFile(FILE, JSON.stringify(payload, null, 2), "utf8");
}

export async function listLocalEvents(): Promise<LocalEventRecord[]> {
  const rows = await readAll();
  return rows.sort((a, b) => a.startAt.getTime() - b.startAt.getTime());
}

export async function insertLocalEvent(
  input: Omit<LocalEventRecord, "id" | "createdAt" | "updatedAt"> & { id?: string },
): Promise<LocalEventRecord> {
  const rows = await readAll();
  const now = new Date();
  const row: LocalEventRecord = {
    id: input.id ?? randomUUID(),
    title: input.title,
    description: input.description,
    location: input.location,
    city: input.city,
    startAt: input.startAt,
    endAt: input.endAt,
    status: input.status,
    public: input.public,
    featured: input.featured,
    category: input.category,
    region: input.region,
    createdAt: now,
    updatedAt: now,
  };
  rows.push(row);
  await writeAll(rows);
  return row;
}

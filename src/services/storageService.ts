import type { InterviewRecord } from '../types';

const STORAGE_KEY = 'mmjd-interview-records';

export function loadRecords(): InterviewRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveRecords(records: InterviewRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch { /* ignore */ }
}

export function addRecord(record: InterviewRecord): void {
  const records = loadRecords();
  records.unshift(record);
  saveRecords(records);
}

export function getRecordById(id: string): InterviewRecord | undefined {
  const records = loadRecords();
  return records.find((r) => r.id === id);
}

export function deleteRecord(id: string): void {
  const records = loadRecords().filter((r) => r.id !== id);
  saveRecords(records);
}

export function generateId(): string {
  return `rec-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

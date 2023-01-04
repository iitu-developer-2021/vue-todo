import type { TaskItemColorKeys } from '@/constants/taskItemColors';

export interface Task {
  id: string;
  name: string;
  color: TaskItemColorKeys;
}

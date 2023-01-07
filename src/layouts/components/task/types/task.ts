import type { TaskItemColorKeys } from '@/layouts/components/task/consts/taskItemColors';

export interface Task {
  id: string;
  name: string;
  color: TaskItemColorKeys;
}

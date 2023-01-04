import type { TaskItemColorKeys } from '@/layouts/layout-parts/components/task/consts/taskItemColors';

export interface Task {
  id: string;
  name: string;
  color: TaskItemColorKeys;
}

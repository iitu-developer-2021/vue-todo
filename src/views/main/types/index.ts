import type { Task } from '@/layouts/components/task/types/task';

interface TaskItem {
  text: string;
  done: boolean;
  id: string;
  taskId: string;
}

export interface TaskDetail extends Task {
  taskItems: Array<TaskItem>;
}

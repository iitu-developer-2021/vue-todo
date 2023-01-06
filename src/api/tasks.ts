import type { Task } from '@/layouts/layout-parts/components/task/types/task';

export const getTasks = () => {
  return new Promise<{ data: { tasks: Task[] } }>((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          tasks: [
            {
              id: '1',
              color: 'red',
              name: 'Frontend development',
            },
            {
              id: '1',
              color: 'pink',
              name: 'Frontend development and test',
            },
          ],
        },
      });
    }, 5000);
  });
};

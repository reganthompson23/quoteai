import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { Job } from '../types';
import { useAuthStore } from '../store/auth';

const DEMO_JOBS: Job[] = [
  {
    id: '1',
    businessId: 'demo-user',
    title: 'Two-Story House Exterior Paint',
    description: 'Complete exterior painting of a large two-story house. Required scaffolding and special equipment for high areas. House had detailed trim work and required extensive prep due to old paint peeling. Used premium weather-resistant paint. Total area approximately 3000 sq ft.',
    price: 4500,
    createdAt: '2024-03-10',
  },
  {
    id: '2',
    businessId: 'demo-user',
    title: 'Interior Apartment Renovation',
    description: 'Full interior painting of a 3-bedroom apartment. Walls needed repair and patching before painting. Used premium low-VOC paint for all rooms. Included detailed trim work and ceiling painting. Completed over 4 days with 2 painters.',
    price: 2800,
    createdAt: '2024-03-08',
  },
];

export function useJobs() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const jobs = useQuery({
    queryKey: ['jobs'],
    queryFn: () => {
      if (user?.id === 'demo-user') {
        return Promise.resolve(DEMO_JOBS);
      }
      return api.getJobs();
    },
  });

  const createJob = useMutation({
    mutationFn: (job: Partial<Job>) => {
      if (user?.id === 'demo-user') {
        const newJob: Job = {
          id: crypto.randomUUID(),
          businessId: 'demo-user',
          createdAt: new Date().toISOString(),
          title: job.title || '',
          description: job.description || '',
          price: job.price || 0,
        };
        DEMO_JOBS.unshift(newJob);
        return Promise.resolve(newJob);
      }
      return api.createJob(job);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });

  const updateJob = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Job> }) => {
      if (user?.id === 'demo-user') {
        const jobIndex = DEMO_JOBS.findIndex(job => job.id === id);
        if (jobIndex !== -1) {
          const updatedJob: Job = {
            ...DEMO_JOBS[jobIndex],
            ...data,
            id: DEMO_JOBS[jobIndex].id,
            businessId: DEMO_JOBS[jobIndex].businessId,
            createdAt: DEMO_JOBS[jobIndex].createdAt,
          };
          DEMO_JOBS[jobIndex] = updatedJob;
          return Promise.resolve(updatedJob);
        }
        return Promise.reject(new Error('Job not found'));
      }
      return api.updateJob(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });

  return {
    jobs,
    createJob,
    updateJob,
  };
}
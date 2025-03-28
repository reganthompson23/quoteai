import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Job } from '../types';
import { useAuth } from '../contexts/AuthContext';

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
  const { user } = useAuth();

  const jobs = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      if (user?.id === 'demo-user') {
        return DEMO_JOBS;
      }
      
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(job => ({
        ...job,
        id: job.id,
        businessId: job.business_id,
        createdAt: job.created_at,
      }));
    },
  });

  const createJob = useMutation({
    mutationFn: async (job: Partial<Job>) => {
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
        return newJob;
      }

      const { data, error } = await supabase
        .from('jobs')
        .insert([{
          business_id: user?.id,
          title: job.title,
          description: job.description,
          price: job.price,
        }])
        .select()
        .single();

      if (error) throw error;

      return {
        ...data,
        id: data.id,
        businessId: data.business_id,
        createdAt: data.created_at,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });

  const updateJob = useMutation({
    mutationFn: async ({ id, data: job }: { id: string; data: Partial<Job> }) => {
      if (user?.id === 'demo-user') {
        const jobIndex = DEMO_JOBS.findIndex(j => j.id === id);
        if (jobIndex !== -1) {
          const updatedJob: Job = {
            ...DEMO_JOBS[jobIndex],
            ...job,
            id: DEMO_JOBS[jobIndex].id,
            businessId: DEMO_JOBS[jobIndex].businessId,
            createdAt: DEMO_JOBS[jobIndex].createdAt,
          };
          DEMO_JOBS[jobIndex] = updatedJob;
          return updatedJob;
        }
        throw new Error('Job not found');
      }

      const { data: updatedJob, error } = await supabase
        .from('jobs')
        .update({
          title: job.title,
          description: job.description,
          price: job.price,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return {
        ...updatedJob,
        id: updatedJob.id,
        businessId: updatedJob.business_id,
        createdAt: updatedJob.created_at,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });

  const deleteJob = useMutation({
    mutationFn: async (jobId: string) => {
      if (user?.id === 'demo-user') {
        const jobIndex = DEMO_JOBS.findIndex(j => j.id === jobId);
        if (jobIndex !== -1) {
          DEMO_JOBS.splice(jobIndex, 1);
          return true;
        }
        throw new Error('Job not found');
      }

      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', jobId);

      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });

  return {
    jobs,
    createJob,
    updateJob,
    deleteJob,
  };
}
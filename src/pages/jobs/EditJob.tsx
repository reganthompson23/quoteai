import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useJobs } from '../../hooks/useJobs';
import { JobForm } from '../../components/jobs/JobForm';
import { Job } from '../../types';

export function EditJob() {
  const { id } = useParams<{ id: string }>();
  const { jobs } = useJobs();

  if (!id) {
    return <Navigate to="/dashboard/jobs" replace />;
  }

  if (jobs.isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const job = jobs.data?.find((j: Job) => j.id === id);

  if (!job) {
    return <Navigate to="/dashboard/jobs" replace />;
  }

  return <JobForm initialData={job} />;
} 
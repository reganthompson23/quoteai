import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useJobs } from '../../hooks/useJobs';
import { Job } from '../../types';

export function JobList() {
  const { jobs, deleteJob } = useJobs();
  const [deleteConfirmId, setDeleteConfirmId] = React.useState<string | null>(null);

  const truncateDescription = (description: string) => {
    return description.length > 100 ? `${description.slice(0, 100)}...` : description;
  };

  const handleDelete = async (jobId: string) => {
    try {
      await deleteJob.mutateAsync(jobId);
      setDeleteConfirmId(null);
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  return (
    <div className="px-6 pr-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Jobs</h1>
          <p className="text-sm text-gray-600 mt-1">
            Track and manage your completed jobs
          </p>
        </div>
        <Link
          to="/dashboard/jobs/new"
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          <span>Add Job</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {jobs.data?.map((job: Job) => (
              <tr key={job.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(job.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {job.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="max-w-md">
                    {truncateDescription(job.description)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${job.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center space-x-4">
                    <Link 
                      to={`/dashboard/jobs/${job.id}/edit`} 
                      className="text-blue-600 hover:text-blue-900 hover:underline"
                    >
                      Edit
                    </Link>
                    {deleteConfirmId === job.id ? (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleDelete(job.id)}
                          className="text-red-600 hover:text-red-900 font-medium"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmId(job.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
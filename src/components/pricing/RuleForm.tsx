import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRules } from '../../hooks/useRules';
import { Rule } from '../../types';

interface RuleFormProps {
  initialData?: Rule;
}

export function RuleForm({ initialData }: RuleFormProps) {
  const navigate = useNavigate();
  const { createRule, updateRule } = useRules();
  const [title, setTitle] = React.useState(initialData?.title || '');
  const [description, setDescription] = React.useState(initialData?.description || '');
  const [isActive, setIsActive] = React.useState(initialData?.isActive ?? true);
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError(null);

      const ruleData = {
        title,
        description,
        isActive,
      };

      console.log('Submitting rule:', initialData ? 'update' : 'create', ruleData);

      if (initialData) {
        // Update existing rule
        await updateRule.mutateAsync({
          id: initialData.id,
          ...ruleData,
          businessId: initialData.businessId,
        });
        console.log('Rule updated successfully');
      } else {
        // Create new rule
        await createRule.mutateAsync(ruleData);
        console.log('Rule created successfully');
      }

      navigate('/dashboard/pricing');
    } catch (err) {
      console.error('Failed to save rule:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setError('Network error: Please check your connection and try again');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold mb-6">
          {initialData ? 'Edit Rule' : 'Create New Rule'}
        </h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Rule Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Rule Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isActive"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            disabled={isSubmitting}
          />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
            Rule is active
          </label>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Inactive rules won't affect price calculations
        </p>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting 
            ? (initialData ? 'Saving Changes...' : 'Creating Rule...')
            : (initialData ? 'Save Changes' : 'Create Rule')
          }
        </button>
        <button
          type="button"
          onClick={() => navigate('/dashboard/pricing')}
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useRules } from '../../hooks/useRules';

const ruleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Rule description is required'),
});

type RuleFormData = z.infer<typeof ruleSchema>;

export function RuleForm() {
  const navigate = useNavigate();
  const { createRule } = useRules();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RuleFormData>({
    resolver: zodResolver(ruleSchema),
  });

  const onSubmit = async (data: RuleFormData) => {
    try {
      await createRule.mutateAsync({
        ...data,
        isActive: true,
      });
      navigate('/dashboard/pricing');
    } catch (error) {
      console.error('Failed to create rule:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            to="/dashboard/pricing"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Rules
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Add New Rule</h1>
          <p className="mt-2 text-sm text-gray-600">
            Create a new pricing rule to help the AI generate more accurate quotes
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
            <div className="px-4 py-6 sm:p-8">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="title"
                      {...register('title')}
                      placeholder="e.g., Two-Story Premium"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                    {errors.title && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Rule Description
                  </label>
                  <p className="mt-1 text-sm text-gray-500">
                    Describe how this rule should affect pricing based on job characteristics
                  </p>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      rows={5}
                      {...register('description')}
                      placeholder="e.g., Increase the price by 20% for every story the house has IF it is an exterior job"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                    {errors.description && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <Link
                to="/dashboard/pricing"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : 'Save Rule'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
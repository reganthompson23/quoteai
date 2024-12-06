import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useRules } from '../../hooks/useRules';
import { RuleForm } from './RuleForm';
import { Rule } from '../../types';

export function EditRule() {
  const { id } = useParams<{ id: string }>();
  const { rules } = useRules();

  if (!id) {
    return <Navigate to="/dashboard/pricing" replace />;
  }

  if (rules.isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const rule = rules.data?.find((r: Rule) => r.id === id);

  if (!rule) {
    return <Navigate to="/dashboard/pricing" replace />;
  }

  return <RuleForm initialData={rule} />;
} 
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { Rule } from '../types';
import { useAuthStore } from '../store/auth';

export function useRules() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const rules = useQuery({
    queryKey: ['rules'],
    queryFn: () => api.getRules(),
  });

  const createRule = useMutation({
    mutationFn: (rule: Partial<Rule>) => api.createRule(rule),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rules'] });
    },
  });

  const updateRule = useMutation({
    mutationFn: (rule: Rule) => api.updateRule(rule.id, rule),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rules'] });
    },
  });

  return {
    rules,
    createRule,
    updateRule,
  };
}
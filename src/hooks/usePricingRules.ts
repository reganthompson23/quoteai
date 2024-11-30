import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { PricingRule } from '../types';

export function usePricingRules() {
  const queryClient = useQueryClient();

  const rules = useQuery({
    queryKey: ['rules'],
    queryFn: api.getRules,
  });

  const createRule = useMutation({
    mutationFn: api.createRule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rules'] });
    },
  });

  const updateRule = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PricingRule> }) =>
      api.updateRule(id, data),
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
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { Rule } from '../types';
import { useAuthStore } from '../store/auth';

const DEMO_RULES = [
  {
    id: '1',
    businessId: 'demo-user',
    title: 'Two-Story Premium',
    description: 'Increase the price by 20% for every story the house has IF it is an exterior job',
    isActive: true,
  },
  {
    id: '2',
    businessId: 'demo-user',
    title: 'Heritage Building Care',
    description: 'Add 30% to the base price for heritage-listed buildings due to extra care and specialized materials required',
    isActive: true,
  },
];

export function useRules() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const rules = useQuery({
    queryKey: ['rules'],
    queryFn: () => {
      if (user?.id === 'demo-user') {
        return Promise.resolve(DEMO_RULES);
      }
      return api.getRules();
    },
  });

  const createRule = useMutation({
    mutationFn: (rule: Partial<Rule>) => {
      if (user?.id === 'demo-user') {
        const newRule = {
          id: crypto.randomUUID(),
          businessId: 'demo-user',
          ...rule,
        };
        DEMO_RULES.push(newRule as Rule);
        return Promise.resolve(newRule);
      }
      return api.createRule(rule);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rules'] });
    },
  });

  return {
    rules,
    createRule,
  };
}
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { Rule } from '../types';
import { useAuthStore } from '../store/auth';

const DEMO_RULES: Rule[] = [
  {
    id: '1',
    businessId: 'demo-user',
    title: 'Heritage Listed Building',
    description: 'Additional care and specialized materials required for heritage properties',
    isActive: true,
  },
  {
    id: '2',
    businessId: 'demo-user',
    title: 'Multi-Story External',
    description: 'Additional cost for external painting of multi-story buildings',
    isActive: true,
  },
  {
    id: '3',
    businessId: 'demo-user',
    title: 'Premium Finishes',
    description: 'High-end paint and materials for luxury finishes',
    isActive: false,
  }
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
        const newRule: Rule = {
          id: crypto.randomUUID(),
          businessId: 'demo-user',
          title: rule.title || '',
          description: rule.description || '',
          isActive: rule.isActive ?? true,
        };
        DEMO_RULES.unshift(newRule);
        return Promise.resolve(newRule);
      }
      return api.createRule(rule);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rules'] });
    },
  });

  const updateRule = useMutation({
    mutationFn: (rule: Rule) => {
      if (user?.id === 'demo-user') {
        const ruleIndex = DEMO_RULES.findIndex(r => r.id === rule.id);
        if (ruleIndex !== -1) {
          DEMO_RULES[ruleIndex] = rule;
          return Promise.resolve(rule);
        }
        return Promise.reject(new Error('Rule not found'));
      }
      return api.updateRule(rule.id, rule);
    },
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
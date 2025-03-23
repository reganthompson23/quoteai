import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
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
];

export function useRules() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const rules = useQuery({
    queryKey: ['rules'],
    queryFn: async () => {
      if (user?.id === 'demo-user') {
        return DEMO_RULES;
      }

      const { data, error } = await supabase
        .from('pricing_rules')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(rule => ({
        ...rule,
        id: rule.id,
        businessId: rule.business_id,
        isActive: rule.is_active,
      }));
    },
  });

  const createRule = useMutation({
    mutationFn: async (rule: Partial<Rule>) => {
      if (user?.id === 'demo-user') {
        const newRule: Rule = {
          id: crypto.randomUUID(),
          businessId: 'demo-user',
          title: rule.title || '',
          description: rule.description || '',
          isActive: rule.isActive ?? true,
        };
        DEMO_RULES.unshift(newRule);
        return newRule;
      }

      const { data, error } = await supabase
        .from('pricing_rules')
        .insert([{
          business_id: user?.id,
          title: rule.title,
          description: rule.description,
          is_active: rule.isActive ?? true,
        }])
        .select()
        .single();

      if (error) throw error;

      return {
        ...data,
        id: data.id,
        businessId: data.business_id,
        isActive: data.is_active,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rules'] });
    },
  });

  const updateRule = useMutation({
    mutationFn: async (rule: Rule) => {
      if (user?.id === 'demo-user') {
        const ruleIndex = DEMO_RULES.findIndex(r => r.id === rule.id);
        if (ruleIndex !== -1) {
          const updatedRule: Rule = {
            ...DEMO_RULES[ruleIndex],
            ...rule,
            id: DEMO_RULES[ruleIndex].id,
            businessId: DEMO_RULES[ruleIndex].businessId,
          };
          DEMO_RULES[ruleIndex] = updatedRule;
          return updatedRule;
        }
        throw new Error('Rule not found');
      }

      const { data: updatedRule, error } = await supabase
        .from('pricing_rules')
        .update({
          title: rule.title,
          description: rule.description,
          is_active: rule.isActive,
        })
        .eq('id', rule.id)
        .select()
        .single();

      if (error) throw error;

      return {
        ...updatedRule,
        id: updatedRule.id,
        businessId: updatedRule.business_id,
        isActive: updatedRule.is_active,
      };
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
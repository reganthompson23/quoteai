import React from 'react';
import { Info } from 'lucide-react';

interface Rule {
  id: number;
  name: string;
  description: string;
  adjustment: string;
  type: 'percentage' | 'percentage_per_unit';
  value: number;
}

const DEMO_RULES: Rule[] = [
  {
    id: 1,
    name: 'Heritage Listed Building',
    description: 'Additional care and specialized materials required for heritage properties',
    adjustment: '20% increase to base price',
    type: 'percentage',
    value: 20
  },
  {
    id: 2,
    name: 'Multi-Story External',
    description: 'Additional cost for external painting of multi-story buildings',
    adjustment: '10% increase per story above ground level',
    type: 'percentage_per_unit',
    value: 10
  },
  {
    id: 3,
    name: 'Premium Finishes',
    description: 'High-end paint and materials for luxury finishes',
    adjustment: '15% increase to base price',
    type: 'percentage',
    value: 15
  },
  {
    id: 4,
    name: 'Difficult Access',
    description: 'Areas requiring special equipment or challenging access',
    adjustment: '25% increase to affected areas',
    type: 'percentage',
    value: 25
  }
];

interface PricingRulesProps {
  rules?: Rule[];
}

export function PricingRules({ rules = DEMO_RULES }: PricingRulesProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6 border-b">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Pricing Rules</h3>
        <p className="mt-1 text-sm text-gray-500">
          Rules that affect how estimates are calculated based on project characteristics
        </p>
      </div>
      <ul className="divide-y divide-gray-200">
        {rules.map((rule) => (
          <li key={rule.id} className="px-4 py-4 sm:px-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">{rule.name}</h4>
                <p className="mt-1 text-sm text-gray-500">{rule.description}</p>
                <p className="mt-1 text-sm font-medium text-blue-600">
                  {rule.adjustment}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 
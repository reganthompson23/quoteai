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

interface PricingRulesProps {
  rules: Rule[];
}

export function PricingRules({ rules }: PricingRulesProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6 border-b">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Pricing Rules</h3>
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
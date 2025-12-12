import React from 'react';
import { Check, School, Briefcase, User } from 'lucide-react';

const Pricing = () => {
    const plans = [
        {
            name: 'Basic',
            price: '$5',
            period: '/month',
            description: 'Perfect for students and first-time job seekers.',
            icon: User,
            features: [
                '10 Resume Analyses per month',
                'Basic Match Score',
                '3 Improvement Suggestions',
                'Email Support'
            ],
            cta: 'Start Basic',
            popular: false
        },
        {
            name: 'Premium',
            price: '$20',
            period: '/month',
            description: 'For serious job seekers who want to land their dream job.',
            icon: Briefcase,
            features: [
                'Unlimited Resume Analyses',
                'Detailed Deep-Dive Analysis',
                'Advanced ATS Optimization',
                'Cover Letter Generator',
                'Priority Support'
            ],
            cta: 'Get Premium',
            popular: true
        },
        {
            name: 'Institutional',
            price: '$100',
            period: '/month',
            description: 'Empower your students with AI-driven career tools.',
            icon: School,
            features: [
                'Unlimited Student Accounts',
                'Bulk Resume Uploads',
                'Admin Dashboard',
                'API Access',
                'Dedicated Account Manager'
            ],
            cta: 'Contact Sales',
            popular: false
        }
    ];

    return (
        <section className="py-20 bg-gray-900" id="pricing">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-lg text-gray-400">
                        Choose the plan that fits your needs. Whether you're a student, a professional, or an educational institution, we have you covered.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`
                relative bg-gray-800 rounded-2xl shadow-sm border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col
                ${plan.popular ? 'border-primary-500 ring-2 ring-primary-500 ring-opacity-50 z-10' : 'border-gray-700'}
              `}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <span className="bg-primary-600 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full shadow-sm">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="p-8 flex-grow">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`p-3 rounded-lg ${plan.popular ? 'bg-primary-900/50 text-primary-400' : 'bg-gray-700 text-gray-300'}`}>
                                        <plan.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                                </div>

                                <div className="flex items-baseline mb-6">
                                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                                    <span className="text-gray-400 ml-2">{plan.period}</span>
                                </div>

                                <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                                    {plan.description}
                                </p>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <Check className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-primary-400' : 'text-gray-500'}`} />
                                            <span className="text-gray-300 text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-8 pt-0 mt-auto">
                                <button
                                    className={`
                    w-full py-3 px-6 rounded-xl font-semibold transition-colors duration-200
                    ${plan.popular
                                            ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg'
                                            : 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600'
                                        }
                  `}
                                >
                                    {plan.cta}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;

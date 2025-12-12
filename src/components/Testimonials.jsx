import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
    {
        name: "Sarah Chen",
        role: "Software Engineer at Google",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        content: "I was struggling to get past the resume screening at FAANG companies. After using ResumeAI, I optimized my keywords and formatting. Two weeks later, I got an interview at Google and landed the job!"
    },
    {
        name: "Michael Ross",
        role: "Junior Developer",
        image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        content: "As a fresh grad, I had no idea how to present my projects. This app helped me highlight my internships and skills perfectly. Landed my first developer role at a startup within a month."
    },
    {
        name: "Priya Patel",
        role: "Senior Product Manager",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        content: "Switching industries is hard, but ResumeAI identified exactly what transferable skills I needed to emphasize. I successfully pivoted from Marketing to Product Management with a 40% salary hike."
    },
    {
        name: "David Kim",
        role: "Frontend Dev at Meta",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        content: "The ATS optimization tips are a game changer. I didn't realize my fancy resume layout was getting rejected by bots. Switched to the suggested format and my callback rate tripled."
    },
    {
        name: "Emily Davis",
        role: "Data Scientist",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        content: "Used the Premium plan for the deep-dive analysis. It caught subtle errors and suggested powerful action verbs I hadn't thought of. Highly recommend for anyone aiming for top-tier tech jobs."
    }
];

const Testimonials = () => {
    return (
        <section className="py-20 bg-gray-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                    Success Stories
                </h2>
                <p className="mt-4 text-lg text-gray-400">
                    Join thousands of professionals who have accelerated their careers.
                </p>
            </div>

            <div className="relative w-full">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>

                <div className="flex animate-scroll hover:pause gap-8 w-max px-4">
                    {[...reviews, ...reviews].map((review, index) => (
                        <div
                            key={index}
                            className="w-[400px] flex-shrink-0 bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-700"
                                />
                                <div>
                                    <h4 className="font-bold text-white">{review.name}</h4>
                                    <p className="text-sm text-primary-400 font-medium">{review.role}</p>
                                </div>
                            </div>
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                ))}
                            </div>
                            <p className="text-gray-300 leading-relaxed italic">
                                "{review.content}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

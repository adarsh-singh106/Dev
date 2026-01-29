import React from 'react';
import { Shield, Zap } from 'lucide-react';

const Features = () => {
  const benefits = [
    {
      title: "Lightning Fast",
      desc: "Add and find friends instantly with our optimized search.",
      icon: <Zap className="h-6 w-6" />,
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    {
      title: "Private & Secure",
      desc: "Your data is yours. We prioritize local privacy.",
      icon: <Shield className="h-6 w-6" />,
      color: "text-green-600",
      bg: "bg-green-100"
    }
  ];

  return (
    <section className="px-4 py-8 bg-white">
      <h2 className="text-2xl font-bold text-center mb-8">Why use Mittr?</h2>
      <div className="flex flex-col gap-6 md:flex-row max-w-4xl mx-auto justify-center">
        {benefits.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center p-4 border rounded-xl flex-1">
            <div className={`${item.bg} p-3 rounded-full ${item.color} mb-3`}>
              {item.icon}
            </div>
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-gray-500 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
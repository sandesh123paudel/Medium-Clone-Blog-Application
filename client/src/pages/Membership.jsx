// src/pages/Membership.jsx
import React from "react";
import DocumentTitle from "../services/DocumentTitle";

const Membership = () => {
  DocumentTitle("Membership: Medium");
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for casual readers",
      features: [
        "3 free articles per month",
        "Access to public stories",
        "Basic community features",
        "Weekly newsletter",
      ],
      buttonText: "Get Started",
      buttonStyle: "bg-gray-600 hover:bg-gray-700",
      popular: false,
    },
    {
      name: "Premium",
      price: "$8",
      period: "per month",
      description: "For the dedicated reader",
      features: [
        "Unlimited article access",
        "Exclusive member-only content",
        "Ad-free reading experience",
        "Priority customer support",
        "Advanced bookmarking",
        "Offline reading mode",
      ],
      buttonText: "Start Free Trial",
      buttonStyle: "bg-green-600 hover:bg-green-700",
      popular: true,
    },
    {
      name: "Creator",
      price: "$15",
      period: "per month",
      description: "For writers and publishers",
      features: [
        "Everything in Premium",
        "Publish unlimited stories",
        "Advanced analytics",
        "Custom author profile",
        "Revenue sharing program",
        "Priority story promotion",
        "Direct reader messaging",
      ],
      buttonText: "Become a Creator",
      buttonStyle: "bg-purple-600 hover:bg-purple-700",
      popular: false,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      content:
        "The quality of stories here is exceptional. I've discovered so many new perspectives that have changed how I think about my work and life.",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      content:
        "As a creator, the platform has been incredible. The analytics help me understand my audience, and the community is genuinely supportive.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Emma Rodriguez",
      role: "Freelance Writer",
      content:
        "The ad-free reading experience is a game-changer. I can focus entirely on the content without distractions.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-l from-gray-600 to-green-600 pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-serif text-white mb-6">
            Join Our Community
          </h1>
          <p className="text-lg md:text-xl text-white max-w-3xl mx-auto mb-8">
            Unlock unlimited access to thought-provoking stories, connect with
            writers, and become part of a community that values quality content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 text-white px-8 py-3 rounded-full font-medium hover:bg-green-700 transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-green-600 text-white px-8 py-3 rounded-full font-medium hover:bg-green-50  hover:text-green-600 transition-colors">
              View Plans
            </button>
          </div>
        </div>
      </section>
      <hr className="bg-gray-600 h-0.5" />

      {/* Pricing Plans */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-800 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-gray-600">
              Select the perfect plan for your reading and writing journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl p-8 border-2 transition-all hover:shadow-xl ${
                  plan.popular
                    ? "border-green-500 shadow-lg transform scale-105"
                    : "border-gray-200 hover:border-green-300"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-800">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-600 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-full font-medium text-white transition-colors ${plan.buttonStyle}`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <hr className="bg-gray-600 h-0.5" />

      {/* Features Showcase */}
      <section className=" py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-800 mb-4">
              Why Choose Premium?
            </h2>
            <p className="text-lg text-gray-600">
              Discover the benefits that come with membership
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Unlimited Reading
              </h3>
              <p className="text-gray-600">
                Access thousands of premium articles and stories without any
                limits
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Exclusive Content
              </h3>
              <p className="text-gray-600">
                Get early access to new stories and member-only content from top
                writers
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Community Access
              </h3>
              <p className="text-gray-600">
                Connect with writers and readers in our exclusive community
                forums
              </p>
            </div>
          </div>
        </div>
      </section>
      <hr className="bg-gray-600 h-0.5" />

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-gray-800 mb-4">
              What Our Members Say
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of satisfied readers and writers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <hr className="bg-gray-600 h-0.5" />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-gray-600 to-green-600 py-20 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join our community today and discover stories that will inspire,
            educate, and entertain you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
              Start Your Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Membership;

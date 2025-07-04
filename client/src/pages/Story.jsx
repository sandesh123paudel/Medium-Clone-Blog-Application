// src/pages/Stories.jsx
import React from "react";

const Stories = () => {
  const featuredStories = [
    {
      id: 1,
      title: "The Art of Mindful Living in a Digital World",
      author: "Sarah Chen",
      readTime: "8 min read",
      category: "Life & Philosophy",
      excerpt:
        "Discovering balance between our digital lives and authentic human connections in an increasingly connected world.",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
      featured: true,
    },
    {
      id: 2,
      title: "Innovation in Sustainable Architecture",
      author: "Marcus Rodriguez",
      readTime: "12 min read",
      category: "Design & Tech",
      excerpt:
        "How modern architects are reshaping our cities with eco-friendly designs that prioritize both beauty and sustainability.",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=300&fit=crop",
    },
    {
      id: 3,
      title: "The Science of Creative Thinking",
      author: "Dr. Elena Vasquez",
      readTime: "15 min read",
      category: "Psychology & Science",
      excerpt:
        "Understanding the neurological processes behind creativity and how we can harness them for innovation.",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop",
    },
    {
      id: 4,
      title: "Reimagining Work in the Post-Pandemic Era",
      author: "James Thompson",
      readTime: "10 min read",
      category: "Business & Culture",
      excerpt:
        "How companies and individuals are adapting to new models of work that prioritize flexibility and well-being.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop",
    },
    {
      id: 5,
      title: "The Power of Storytelling in Human Connection",
      author: "Amara Williams",
      readTime: "7 min read",
      category: "Communication & Arts",
      excerpt:
        "Exploring how stories shape our understanding of ourselves and create bridges between different communities.",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=300&fit=crop",
    },
    {
      id: 6,
      title: "Climate Change and the Future of Food",
      author: "Dr. Rafael Santos",
      readTime: "11 min read",
      category: "Environment & Health",
      excerpt:
        "Examining innovative solutions for sustainable food production in an era of environmental challenges.",
      image:
        "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&h=300&fit=crop",
    },
  ];

  const categories = [
    "All",
    "Life & Philosophy",
    "Design & Tech",
    "Psychology & Science",
    "Business & Culture",
    "Communication & Arts",
    "Environment & Health",
  ];

  return (
    <div className="min-h-screen ">
      {/* Header Section */}
      <section className="bg-gradient-to-l from-gray-600 to-green-600 pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-serif text-white mb-6">
            Stories that Matter
          </h1>
          <p className="text-lg md:text-xl text-white max-w-3xl mx-auto">
            Discover thought-provoking articles, insights, and narratives from
            voices around the world
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === "All"
                    ? "bg-green-600 text-white"
                    : "bg-black text-white hover:bg-green-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Story */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl overflow-hidden text-white">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12">
                <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Featured Story
                </span>
                <h2 className="text-2xl md:text-4xl font-bold font-serif mb-4">
                  {featuredStories[0].title}
                </h2>
                <p className="text-lg opacity-90 mb-6">
                  {featuredStories[0].excerpt}
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-medium">
                    {featuredStories[0].author}
                  </span>
                  <span className="opacity-75">•</span>
                  <span className="opacity-75">
                    {featuredStories[0].readTime}
                  </span>
                </div>
                <button className="bg-white text-purple-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                  Read Story
                </button>
              </div>
              <div className="md:w-1/2">
                <img
                  src={featuredStories[0].image}
                  alt={featuredStories[0].title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredStories.slice(1).map((story) => (
              <article
                key={story.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                      {story.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold font-serif text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {story.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-800">
                        {story.author}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {story.readTime}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Load More */}
      <section className="py-12 px-4 text-center">
        <button className="bg-green-600 text-white px-8 py-3 rounded-full font-medium hover:bg-green-700 transition-colors">
          Load More Stories
        </button>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gradient-to-l from-green-600 to-gray-600 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-4">
            Never Miss a Story
          </h2>
          <p className="text-lg text-white mb-8">
            Get the best stories delivered to your inbox weekly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-600 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Stories;

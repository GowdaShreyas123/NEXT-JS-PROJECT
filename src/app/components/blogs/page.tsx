"use client";
import React, { useState, useEffect } from 'react';
import { Search, User, Plus, Heart, MessageCircle, Share2, Sun, Moon } from 'lucide-react';

const BlogPlatform = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: "Exploring the Ancient Ruins of Rome",
            author: "Alex Chen",
            category: "TRAVEL",
            readTime: "8 min read",
            likes: 124,
            comments: 18,
            image: "/api/placeholder/300/200",
            content: "Rome is a city steeped in history, offering a mesmerizing journey through ancient civilizations. From the colossal grandeur of the Colosseum to the intricate carvings of the Roman Forum, every corner tells a story. Wander through the Pantheon, marvel at its engineering, and toss a coin into the Trevi Fountain to ensure your return. The Vatican City, with St. Peter's Basilica and the Sistine Chapel, offers unparalleled artistic and spiritual experiences. Don't forget to savor authentic Italian pasta and gelato while exploring the charming cobblestone streets. Rome is truly an open-air museum, a must-visit for history buffs and casual tourists alike."
        },
        {
            id: 2,
            title: "Top 10 Must-See Movies of the Decade",
            author: "Sarah Johnson",
            category: "MOVIES",
            readTime: "6 min read",
            likes: 89,
            comments: 12,
            image: "/api/placeholder/300/200",
            content: "The past decade has been a cinematic feast, delivering groundbreaking narratives and unforgettable performances. From mind-bending sci-fi epics to intimate dramas, the variety has been astounding. 'Parasite' redefined thriller genres with its sharp social commentary, while 'La La Land' captivated with its musical charm. 'Blade Runner 2049' pushed visual boundaries, and 'Arrival' offered a deeply thought-provoking alien encounter. Superheroes continued to dominate, but films like 'Manchester by the Sea' reminded us of the power of raw human emotion. These films, among others, have not only entertained but also pushed the boundaries of storytelling."
        },
        {
            id: 3,
            title: "Mastering the Art of Home Cooking",
            author: "Mike Rodriguez",
            category: "COOKING",
            readTime: "10 min read",
            likes: 156,
            comments: 24,
            image: "/api/placeholder/300/200",
            content: "Home cooking is more than just sustenance; it's an art, a science, and a source of immense pleasure. Starting with fresh, high-quality ingredients is paramount. Learn basic knife skills – they'll save you time and make cooking safer. Don't be afraid to experiment with spices and herbs; they can transform a dish. Master a few core recipes like a classic roast chicken or a versatile pasta sauce, and then build from there. Embrace imperfections; every cooking journey has its mishaps. Most importantly, cook with love and enjoy the process of creating delicious meals for yourself and your loved ones."
        },
        {
            id: 4,
            title: "The Benefits of Daily Meditation",
            author: "Emma Davis",
            category: "WELLNESS",
            readTime: "12 min read",
            likes: 203,
            comments: 31,
            image: "/api/placeholder/300/200",
            content: "In our fast-paced world, daily meditation offers a sanctuary for the mind and body. Just a few minutes a day can significantly reduce stress and anxiety by calming the nervous system. Regular practice enhances focus and concentration, making you more productive and present in your daily tasks. It also improves emotional regulation, helping you respond to challenges with greater calm and clarity. Physically, meditation can lower blood pressure and improve sleep quality. Begin with short sessions, focusing on your breath, and gradually increase duration as you feel comfortable. The profound benefits make it a worthwhile addition to any daily routine."
        },
        {
            id: 5,
            title: "Understanding the Basics of Personal Finance",
            author: "David Kim",
            category: "FINANCE",
            readTime: "7 min read",
            likes: 178,
            comments: 22,
            image: "/api/placeholder/300/200",
            content: "Taking control of your personal finances is a cornerstone of financial well-being. Start by creating a budget to track your income and expenses; this reveals where your money goes. Build an emergency fund—three to six months' worth of living expenses—to act as a safety net. Understand the difference between good debt (like a mortgage) and bad debt (like high-interest credit card debt) and prioritize paying off the latter. Begin investing early, even small amounts, leveraging the power of compound interest. Educate yourself about different investment vehicles and set clear financial goals to guide your decisions."
        },
        {
            id: 6,
            title: "Gardening for Beginners: Growing Your Own Herbs",
            author: "Lisa Wang",
            category: "GARDENING",
            readTime: "9 min read",
            likes: 134,
            comments: 19,
            image: "/api/placeholder/300/200",
            content: "Gardening can be a deeply rewarding hobby, and growing your own herbs is a fantastic starting point for beginners. Herbs like basil, mint, parsley, and rosemary are relatively easy to cultivate, even in small spaces or pots. Ensure they receive adequate sunlight—most herbs need at least 6 hours a day. Use well-draining soil and water consistently, but avoid overwatering. Harvesting regularly encourages bushier growth. Not only will you have fresh, flavorful additions to your cooking, but the act of nurturing plants can also be incredibly therapeutic. Happy gardening!"
        }
    ]);
    const [showPostForm, setShowPostForm] = useState(false);
    const [expandedPosts, setExpandedPosts] = useState(new Set());
    const [newPost, setNewPost] = useState({
        title: '',
        author: 'Current User',
        category: 'TRAVEL',
        content: '',
    });
    const [activeFilter, setActiveFilter] = useState('ALL');
    const categories = ['ALL', 'TRAVEL', 'MOVIES', 'COOKING', 'WELLNESS', 'FINANCE', 'GARDENING', 'BOOKS'];
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const handleSubmitPost = () => {
        if (newPost.title.trim() === '' || newPost.content.trim() === '') {
            alert('Please fill in all required fields (Title, Content).');
            return;
        }
        const post = {
            id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
            ...newPost,
            readTime: `${Math.ceil(newPost.content.length / 200)} min read`,
            likes: 0,
            comments: 0,
            image: "/api/placeholder/300/200"
        };
        setPosts([post, ...posts]);
        setNewPost({
            title: '',
            author: 'Current User',
            category: 'TRAVEL',
            content: '',
        });
        setShowPostForm(false);
    };

    const handleLike = (id) => {
        setPosts(posts.map(post =>
            post.id === id ? { ...post, likes: post.likes + 1 } : post
        ));
    };

    const handleComment = (id) => {
        setPosts(posts.map(post =>
            post.id === id ? { ...post, comments: post.comments + 1 } : post
        ));
        alert('Commenting feature coming soon!');
    };

    const handleShare = (id) => {
        const postToShare = posts.find(post => post.id === id);
        if (postToShare) {
            console.log(`Sharing post: "${postToShare.title}" by ${postToShare.author}`);
            alert(`Sharing "${postToShare.title}"! (Check console for details)`);
        }
    };

    const toggleReadMore = (id) => {
        setExpandedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const getPreviewText = (content, limit = 150) => {
        if (content.length <= limit) return content;
        return content.substring(0, limit);
    };

    const filteredPosts = activeFilter === 'ALL' ? posts : posts.filter(post => post.category === activeFilter);

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
            <header className={`sticky top-0 z-40 ${isDarkMode ? 'bg-gray-800/80 border-gray-700/50' : 'bg-white/80 border-gray-200/50'} backdrop-blur-lg shadow-lg`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center space-x-12">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">B</span>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-900 via-purple-800 to-blue-800 bg-clip-text text-transparent">
                                        MyBlog
                                    </h1>
                                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-medium`}>Community for all</p>
                                </div>
                            </div>
                            <nav className="hidden lg:flex space-x-8">
                                <a href="#" onClick={() => window.open('https://dribbble.com/search/blog', '_blank')} className={`${isDarkMode ? 'text-gray-300 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'} text-sm font-medium transition-colors duration-200 relative group`}>
                                    ARTICLES
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
                                </a>
                                <a href="#" onClick={() => window.open('https://www.godaddy.com/resources/skills/how-to-start-a-blog', '_blank')} className={`${isDarkMode ? 'text-gray-300 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'} text-sm font-medium transition-colors duration-200 relative group`}>
                                    TUTORIALS
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
                                </a>
                                <a href="#" onClick={() => window.open('https://problogger.com/recommended-blogging-resources/', '_blank')} className={`${isDarkMode ? 'text-gray-300 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'} text-sm font-medium transition-colors duration-200 relative group`}>
                                    RESOURCES
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
                                </a>
                                <a href="#" onClick={() => window.open('https://support.google.com/blogger/community?hl=en', '_blank')} className={`${isDarkMode ? 'text-gray-300 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'} text-sm font-medium transition-colors duration-200 relative group`}>
                                    COMMUNITY
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
                                </a>
                            </nav>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="hidden md:flex items-center space-x-3">
                                <button onClick={() => window.open('https:/github.com/GowdaShreyas123', '_blank')} className={`${isDarkMode ? 'text-gray-300 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'} text-sm font-medium transition-colors duration-200`}>
                                    GitHub
                                </button>
                                <button onClick={() => window.open('https://x.com/', '_blank')} className={`${isDarkMode ? 'text-gray-300 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'} text-sm font-medium transition-colors duration-200`}>
                                    Twitter
                                </button>
                            </div>
                           
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow duration-200">
                                <User size={16} className="text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className={`relative py-20 overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30'}`}>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/20 to-blue-600/20"></div>
                    <svg className="absolute top-0 right-0 w-96 h-96 transform translate-x-16 -translate-y-8" viewBox="0 0 100 100">
                        <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                            </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#grid)" className={`${isDarkMode ? 'text-gray-700' : 'text-gray-200'}`} />
                    </svg>
                </div>
                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className={`inline-flex items-center space-x-2 rounded-full px-4 py-2 mb-6 border ${isDarkMode ? 'bg-gray-700/60 border-gray-600/50' : 'bg-white/60 border-gray-200/50'} backdrop-blur-sm`}>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Live Developer Blog</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-blue-900 via-purple-800 to-blue-800 bg-clip-text text-transparent">
                            Frontend
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Our Community Hub
                        </span>
                    </h1>
                    <p className={`text-lg md:text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto mb-8 leading-relaxed`}>
                        Explore captivating articles, discover new hobbies, and gain fresh perspectives from a vibrant community passionate about diverse topics. Share your stories and connect with others.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button
                            onClick={() => setShowPostForm(true)}
                            className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-200" />
                            <span className="font-semibold">Post a Blog</span>
                        </button>
                    </div>
                    <div className={`flex justify-center items-center space-x-8 mt-12 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                            <span>{posts.length} Articles</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span>Active Community</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span>Daily Updates</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row justify-between items-center mb-12 space-y-6 lg:space-y-0 lg:space-x-4">
                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveFilter(category)}
                                className={`px-6 py-3 text-sm font-semibold rounded-full transition-all duration-200 transform hover:scale- ${
                                    activeFilter === category
                                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                                        : `${isDarkMode ? 'bg-gray-800 text-gray-300 hover:text-purple-400 border border-gray-700 hover:border-purple-500 hover:bg-gray-700' : 'bg-white text-gray-600 hover:text-purple-600 border border-gray-200 hover:border-purple-300 hover:bg-purple-50'}`
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
                        <div
                            key={post.id}
                            className={`card-3d group rounded-2xl shadow-xl transition-all duration-300 overflow-hidden ${isDarkMode ? 'bg-gray-800 border border-gray-700 hover:border-purple-600' : 'bg-white border border-gray-100 hover:border-purple-600'}`}
                        >
                            <div className="relative overflow-hidden">
                                <div className="absolute top-4 left-4">
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full text-white backdrop-blur-sm ${
                                        post.category === 'TRAVEL' ? 'bg-blue-500/90' :
                                        post.category === 'MOVIES' ? 'bg-purple-500/90' :
                                        post.category === 'COOKING' ? 'bg-yellow-500/90' :
                                        post.category === 'WELLNESS' ? 'bg-green-500/90' :
                                        post.category === 'FINANCE' ? 'bg-red-500/90' :
                                        post.category === 'GARDENING' ? 'bg-lime-500/90' :
                                        'bg-gradient-to-r from-purple-500/90 to-blue-500/90'
                                    }`}>
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className={`text-xl font-bold mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors duration-200 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                    {post.title}
                                </h3>
                                <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm mb-4`}>
                                    {expandedPosts.has(post.id) ? (
                                        <div>
                                            <p className="leading-relaxed">{post.content}</p>
                                            <button
                                                onClick={() => toggleReadMore(post.id)}
                                                className="text-purple-600 hover:text-purple-800 font-medium mt-2 transition-colors duration-200"
                                            >
                                                Read less
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="leading-relaxed line-clamp-3">
                                                {getPreviewText(post.content)}
                                                {post.content.length > 150 && '...'}
                                            </p>
                                            {post.content.length > 150 && (
                                                <button
                                                    onClick={() => toggleReadMore(post.id)}
                                                    className="text-purple-600 hover:text-purple-800 font-medium mt-2 transition-colors duration-200"
                                                >
                                                    Read more
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center border-green-500 text-gray-500 text-xs font-semibold">
                                            {post.author.charAt(0)}
                                        </div>
                                        <div>
                                            <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} hover:text-red-400`}>{post.author}</p>
                                            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{post.readTime}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`flex items-center justify-between pt-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-100'} border-t`}>
                                    <div className="flex items-center space-x-6">
                                        <button
                                            onClick={() => handleLike(post.id)}
                                            className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-300 hover:text-red-400' : 'text-gray-500 hover:text-red-500'} transition-colors duration-200 group/like`}>
                                            <Heart size={18} className="group-hover/like:scale-110 transition-transform duration-200" />
                                            <span className="text-sm font-medium">{post.likes}</span>
                                        </button>
                                        <button
                                            onClick={() => handleComment(post.id)}
                                            className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-500 hover:text-blue-500'} transition-colors duration-200 group/comment`}>
                                            <MessageCircle size={18} className="group-hover/comment:scale-110 transition-transform duration-200" />
                                            <span className="text-sm font-medium">{post.comments}</span>
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => handleShare(post.id)}
                                        className={`${isDarkMode ? 'text-gray-300 hover:text-purple-400 hover:bg-gray-700' : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50'} transition-colors duration-200 p-2 rounded-lg`}>
                                        <Share2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showPostForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className={`rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                        Post a Blog
                                    </h2>
                                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>Create an article to share with the developer community</p>
                                </div>
                                <button
                                    onClick={() => setShowPostForm(false)}
                                    className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'} p-2 rounded-lg transition-colors duration-200`}
                                >
                                    <span className="text-2xl">×</span>
                                </button>
                            </div>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Article Title *</label>
                                        <input
                                            type="text"
                                            value={newPost.title}
                                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'border-gray-200 placeholder-gray-500'}`}
                                            placeholder="Enter your article title..."
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Category</label>
                                        <select
                                            value={newPost.category}
                                            onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'border-gray-200'}`}
                                        >
                                            {categories.slice(1).map((cat) => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Publisher Name</label>
                                    <input
                                        type="text"
                                        value={newPost.author}
                                        onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'border-gray-200 placeholder-gray-500'}`}
                                        placeholder="Enter your name..."
                                    />
                                </div>
                                <div>
                                    <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Article Content *</label>
                                    <textarea
                                        value={newPost.content}
                                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                        rows={8}
                                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'border-gray-200 placeholder-gray-500'}`}
                                        placeholder="Write your full article content here..."
                                        required
                                    />
                                </div>
                                <div className={`flex justify-end space-x-4 pt-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-t`}>
                                    <button
                                        onClick={() => setShowPostForm(false)}
                                        className={`px-6 py-3 rounded-xl transition-colors duration-200 font-semibold ${isDarkMode ? 'text-gray-300 bg-gray-700 hover:bg-gray-600' : 'text-gray-700 bg-gray-100 hover:bg-gray-200'}`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmitPost}
                                        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                                    >
                                        Publish Article
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogPlatform;
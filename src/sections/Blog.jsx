import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Calendar,
  User,
  Clock,
  ArrowRight,
  Bookmark,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useModal } from "../contexts/ModalContext";
import { blogPosts } from "../Assets/Data"; // {blogPosts}

// const blogPosts = [
//   {
//     id: 1,
//     title: 'How Location Impacts Property Value: A Complete Guide for Plot & Individual House Buyers',
//     excerpt: 'Strategic location boosts connectivity, amenities, demand, appreciation, and long-term property value.',
//     content: 'Location is paramount in real estate investment. A strategically chosen location offers connectivity to essential services, access to quality amenities, and strong long-term value appreciation. Properties in well-planned communities with proper infrastructure, proximity to schools, hospitals, and shopping centers tend to appreciate faster than those in isolated areas. Additionally, upcoming infrastructure projects, metro connectivity, and commercial establishments in nearby areas can significantly boost property value. Investors who prioritize location often see better rental yields and capital appreciation. At SSR, our properties are carefully selected in high-growth areas with strong fundamentals and development potential.',
//     image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774846011/SSR_Villa_zay5vn.png',
//     author: 'Mr.Surendra',
//     date: 'Feb 27, 2026',
//     readTime: '1 min read',
//     category: 'Investment',
//     featured: true,
//   },
//   {
//     id: 2,
//     title: 'The Future of Plotted Developments : Why Investors Prefer Land Over Apartments ?',
//     excerpt: 'High Appreciation, Low Maintenance, Flexible Usage, Safer Investment, Long-Term Wealth Creation.',
//     content: 'Plotted developments represent the future of real estate investment in India. Unlike apartment complexes, land parcels offer complete ownership and flexible development options. Investors can customize their properties, add value through construction, and benefit from maximum appreciation potential. Plotted communities provide a sense of space, privacy, and better lifestyle compared to high-rise apartments. The demand for individual plots is rising as families seek spacious living with direct land ownership. SSR\'s plotted developments combine prime locations with modern infrastructure, making them ideal for both living and investment purposes.',
//     image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774846011/SSR_FarmLands_ne05hu.png',
//     author: 'Mr.Surendra',
//     date: 'Feb 27, 2026',
//     readTime: '1 min read',
//     category: 'Trends',
//     featured: false,
//   },
//   {
//     id: 3,
//     title: 'How Infrastructure Development Impacts Property Prices Across India?',
//     excerpt: 'Infrastructure Boosts Connectivity, Driving Higher Property Values Across India.',
//     content: 'Infrastructure development is a key driver of property appreciation. When roads, bridges, airports, and public transportation systems are developed in an area, property values surge. Buyers prefer locations with easy accessibility and reduced commute times. Metro connectivity, highway access, and proximity to commercial hubs significantly impact property pricing. Our analysis shows that properties near upcoming infrastructure projects appreciate 25-40% faster than those in stagnant areas. Smart investors identify emerging infrastructure corridors and invest early to benefit from exponential growth. SSR focuses on properties in areas with confirmed infrastructure pipeline.',
//     image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774871825/p2_jhhrym.png',
//     author: 'Mr.Surendra',
//     date: 'Feb 21, 2026',
//     readTime: '1 min read',
//     category: 'Analysis',
//     featured: false,
//   },
//   {
//     id: 4,
//     title: 'The Future of Indian Real Estate in 2026: Trends, Growth Areas & Investment Opportunities',
//     excerpt: 'India’s 2026 Real Estate: Growth Corridors, Smart Cities, Strong Returns.',
//     content: '2026 brings exciting opportunities in the real estate sector. Key trends include: rising demand for sustainable homes, growth in tier-2 cities, premium lifestyle communities, and tech-enabled properties. Investors are increasingly looking beyond metros, finding better ROI in emerging cities. Green building practices and smart home features are becoming standard expectations. The shift towards work-from-home has increased demand for larger spaces with home office facilities. Digital real estate marketing and virtual tours are transforming property discovery. Early adopters of these trends are positioning themselves for significant returns.',
//     image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774871825/p2_jhhrym.png',
//     author: 'Mr.Surendra',
//     date: 'Feb 27, 2026',
//     readTime: '2 min read',
//     category: 'Trends',
//     featured: false,
//   },
//   {
//     id: 5,
//     title: 'Why Gated Community Plots Are the Future of Bangalore Real Estate',
//     excerpt: 'Security, Amenities, Appreciation, Community Living Make Gated Plots Bangalore’s Future.',
//     content: 'Investing in the right location is crucial for success. Our research identifies the best investment-ready cities: Bangalore leads in IT hub growth, Pune in infrastructure development, Hyderabad in affordable luxury, and NCR in commercial expansion. Secondary cities like Jaipur, Lucknow, and Indore offer exceptional value with strong growth trajectories. Each city has unique characteristics—tech jobs in Bangalore, industrial growth in Pune, affordable living in tier-2 cities. Diversifying across multiple locations reduces risk while maximizing returns. SSR operates in premium locations with proven fundamentals and strong appreciation potential.',
//     image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774809091/Signature_Gardenia_SSR_uueh2e.jpg',
//     author: 'Mr.Surendra',
//     date: 'Feb 13, 2026',
//     readTime: '1 min read',
//     category: 'Investment',
//     featured: false,
//   },
//   {
//     id: 6,
//     title: 'North Bangalore vs East Bangalore: Where Should You Buy Land?',
//     excerpt: 'Connectivity, Budget, Growth Prospects, Infrastructure Decide Best Land Investment Choice.',
//     content: 'The villa versus apartment debate depends on your investment goals and lifestyle preferences. Villas offer: complete ownership, larger land area, flexibility to modify, better appreciation in growth corridors, and premium living experience. Apartments provide: lower entry cost, better maintenance, community amenities, easier resale, and convenience for first-time buyers. For long-term wealth creation, villas typically outperform in emerging areas. For quick liquidity, apartments win in established neighborhoods. The ideal choice aligns with your financial capacity, location preference, and investment horizon. SSR offers both villas and apartments to cater to diverse investor needs.',
//     image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1775014603/h1_cpugkd.png',
//     author: 'Mr.Surendra',
//     date: 'Feb 13, 2026',
//     readTime: '1 min read',
//     category: 'Guide',
//     featured: false,
//   },
//   {
//     id: 7,
//     title: 'Why Bangalore Is Still India’s Top Real Estate Destination ?',
//     excerpt: 'Strong Jobs, Infrastructure Growth, High Returns Make Bangalore India’s Top Real Estate Hub.',
//     content: 'Land is the most fundamental form of real estate investment. Unlike structures that depreciate, land appreciates indefinitely. Key advantages: minimal maintenance costs, maximum appreciation potential, complete ownership rights, flexibility in development, and strong collateral for loans. Before investing, verify: clear title, registration, municipal approvals, infrastructure timeline, and surrounding development. Emerging areas with confirmed infrastructure pipelines offer the best returns. Land banking—holding land for future development—is a proven wealth-building strategy. Early investors in now-thriving neighborhoods achieved 300-500% returns. Smart investors recognize that land investment is long-term wealth creation.',
//     image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774871825/p2_jhhrym.png',
//     author: 'Mr.Surendra',
//     date: 'Feb 6, 2026',
//     readTime: '1 min read',
//     category: 'Investment',
//     featured: false,
//   },
//   {
//     id: 8,
//     title: 'Apartment vs Villa vs Plot — What’s Best in Bangalore Right Now?',
//     excerpt: 'Compare Apartments, Villas, And Plots to Choose Bangalore’s Smartest Property Investment.',
//     content: 'Smart homes are revolutionizing modern living with AI-powered automation, IoT devices, and energy efficiency. Features like smart locks, automated lighting, temperature control, security systems, and voice assistants enhance convenience and security. Smart homes reduce energy consumption by 30-40%, attracting environmentally conscious buyers and reducing utility costs. Properties with smart home features command 10-15% premium in real estate markets. Integration of solar panels, smart thermostats, and water management systems appeals to eco-conscious investors. As technology adoption increases, smart homes transition from luxury to necessity. Properties with these features ensure future-readiness and sustained value appreciation.',
//     image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774952097/hhkhkj_g6cbxa.jpg',
//     author: 'Mr.Surendra',
//     date: 'Feb 6, 2026',
//     readTime: '1 min read',
//     category: 'Technology',
//     featured: false,
//   },
//   {
//     id: 9,
//     title: 'How Location, Connectivity, and Infrastructure Shape the Value of New Properties',
//     excerpt: 'Location, Connectivity, and Infrastructure Together Drive Demand, Livability, and Long-term Property Value.',
//     content: 'Affordable housing doesn\'t mean compromised quality. Strategic location selection and efficient construction reduce costs without sacrificing standards. Tier-2 cities offer spacious homes at fraction of metro prices. Government schemes like PMAY and tax benefits make homeownership accessible. Pre-launch properties offer 15-20% discounts compared to possession-stage pricing. Developers focusing on volume over margins create efficient designs that reduce per-unit costs. Raw land and semi-finished projects offer further discounts for buyer-driven completion. First-time homebuyers benefit from lower registration costs and stamp duties in developing areas. Affordable housing represents the biggest opportunity for middle-class wealth creation.',
//     image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774953723/h12_f9ozfd.png',
//     author: 'Mr.Surendra',
//     date: 'Jan 30, 2026',
//     readTime: '2 min read',
//     category: 'Guide',
//     featured: false,
//   },
//   {
//     id: 10,
//     title: 'North-Facing Homes & Vaastu in Modern Real Estate Projects: Myth or Smart Choice?',
//     excerpt: 'North-facing homes blend Vaastu beliefs with modern design practicality.',
//     content: 'Real estate rental income provides consistent passive cash flow with appreciation potential. Location selection is crucial—high-demand areas command premium rents and maintain high occupancy. Target tenant demographics: IT professionals near tech parks, students near universities, corporate professionals in business districts. Maintain properties to justify premium rents and attract quality tenants. Use property management services to reduce operational burden and ensure timely collections. Best practices: 8-10% annual rental yield is realistic, factor in 5% vacancy, plan for 10-15% annual maintenance. Tax benefits through depreciation and deductions improve net returns. Successful landlords reinvest rental income to build property portfolios, creating generational wealth.',
//     image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774953839/h11_jcygmg.jpg',
//     author: 'Mr.Surendra',
//     date: 'Jan 30, 2026',
//     readTime: '1 min read',
//     category: 'Investment',
//     featured: false,
//   },
//   {
//     id: 11,
//     title: 'How to Choose the Right Developer You Can Trust',
//     excerpt: 'Research reputation, verify approvals, assess quality, transparency, experience, and customer feedback.',
//     content: 'Commercial and residential investments serve different investor profiles. Commercial properties offer: 8-12% rental yields, longer lease terms, corporate-backed security, higher appreciation in job centers. Residential properties offer: easier financing, larger buyer pool, emotional attachment attracts steadier demand, tax incentives. Commercial leases provide stability with annual increases, while residential values appreciate faster in developing areas. Entry cost for commercial is higher, requiring larger capital and lower liquidity. Risk tolerance, capital availability, and investment horizon determine suitability. Smart investors diversify across both categories to balance yield and appreciation. Your strategy should align with financial goals and risk profile.',
//     image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774955524/h13_bfn1g7.png',
//     author: 'Mr.Surendra',
//     date: 'Jan 22, 2026',
//     readTime: '1 min read',
//     category: 'Analysis',
//     featured: false,
//   },
//   {
//     id: 12,
//     title: 'Myths vs Facts About Real Estate Investment',
//     excerpt: 'Myths busted, facts revealed: Real estate investment offers stable growth, security.',
//     content: 'Gated communities offer unparalleled security and lifestyle benefits that justify their premium pricing. 24/7 security, controlled access, CCTV surveillance, and professional management ensure resident safety. Common amenities—gyms, parks, swimming pools, community centers—enhance quality of life without individual expenses. Properties in gated communities appreciate faster due to perceived safety and exclusivity. They attract premium tenants, ensuring consistent rental income. Families prefer gated communities for children\'s safety and community environment. Social community events foster relationships among residents. These factors combined make gated communities the preferred choice for premium investments.',
//     image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774955522/h14_kfgsqw.jpg',
//     author: 'Mr.Surendra',
//     date: 'Jan 22, 2026',
//     readTime: '1 min read',
//     category: 'Lifestyle',
//     featured: false,
//   },
//    {
//     id: 13,
//     title: 'Advantages of Buying DC-Approved & E-Khata Properties in Bangalore',
//     excerpt: 'Legal clarity, easy registration, loan eligibility, higher resale value, and safe long-term investment.',
//     content: 'Location is paramount in real estate investment. A strategically chosen location offers connectivity to essential services, access to quality amenities, and strong long-term value appreciation. Properties in well-planned communities with proper infrastructure, proximity to schools, hospitals, and shopping centers tend to appreciate faster than those in isolated areas. Additionally, upcoming infrastructure projects, metro connectivity, and commercial establishments in nearby areas can significantly boost property value. Investors who prioritize location often see better rental yields and capital appreciation. At SSR, our properties are carefully selected in high-growth areas with strong fundamentals and development potential.',
//     image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774846012/SSR_Advam_Residency_rqkyxk.png',
//     author: 'Mr.Surendra',
//     date: 'Jan 8, 2026',
//     readTime: '1 min read',
//     category: 'Investment',
//     featured: false,
//   },
//   {
//     id: 14,
//     title: 'Why Gated Communities Are in High Demand in Bangalore?',
//     excerpt: 'Secure living, premium amenities, better infrastructure, community lifestyle, and strong investment value drive demand.',
//     content: 'Plotted developments represent the future of real estate investment in India. Unlike apartment complexes, land parcels offer complete ownership and flexible development options. Investors can customize their properties, add value through construction, and benefit from maximum appreciation potential. Plotted communities provide a sense of space, privacy, and better lifestyle compared to high-rise apartments. The demand for individual plots is rising as families seek spacious living with direct land ownership. SSR\'s plotted developments combine prime locations with modern infrastructure, making them ideal for both living and investment purposes.',
//     image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774953839/h11_jcygmg.jpg',
//     author: 'Mr.Surendra',
//     date: 'Jan 8, 2026',
//     readTime: '1 min read',
//     category: 'Trends',
//     featured: false,
//   },
//   {
//     id: 15,
//     title: 'Advantages of Owning an Independent House in Bangalore Over High-Rise Living',
//     excerpt: 'More privacy, land ownership, customization freedom, and long-term investment value',
//     content: 'Infrastructure development is a key driver of property appreciation. When roads, bridges, airports, and public transportation systems are developed in an area, property values surge. Buyers prefer locations with easy accessibility and reduced commute times. Metro connectivity, highway access, and proximity to commercial hubs significantly impact property pricing. Our analysis shows that properties near upcoming infrastructure projects appreciate 25-40% faster than those in stagnant areas. Smart investors identify emerging infrastructure corridors and invest early to benefit from exponential growth. SSR focuses on properties in areas with confirmed infrastructure pipeline.',
//     image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774809635/SSR_img_f98wby.jpg',
//     author: 'Mr.Surendra',
//     date: 'Dec 20, 2025',
//     readTime: '1 min read',
//     category: 'Analysis',
//     featured: false,
//   },
//   {
//     id: 16,
//     title: 'Plots vs Apartments in Bangalore: Which Offers Better Value and Flexibility?',
//     excerpt: 'Compare Investment Returns, Lifestyle Freedom, And Future Growth Potential in Bangalore',
//     content: '2026 brings exciting opportunities in the real estate sector. Key trends include: rising demand for sustainable homes, growth in tier-2 cities, premium lifestyle communities, and tech-enabled properties. Investors are increasingly looking beyond metros, finding better ROI in emerging cities. Green building practices and smart home features are becoming standard expectations. The shift towards work-from-home has increased demand for larger spaces with home office facilities. Digital real estate marketing and virtual tours are transforming property discovery. Early adopters of these trends are positioning themselves for significant returns.',
//     image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774843910/SSR_Villa_q25pqw.png',
//     author: 'Mr.Surendra',
//     date: 'Feb 27, 2025',
//     readTime: '2 min read',
//     category: 'Trends',
//     featured: false,
//   },
//   {
//     id: 17,
//     title: 'Step-By-Step Guide for First-Time Homebuyers – Your Journey with SSR Properties',
//     excerpt: 'Easy Home Buying Journey with Expert Support, Clear Steps, and Trusted Guidance',
//     content: 'Investing in the right location is crucial for success. Our research identifies the best investment-ready cities: Bangalore leads in IT hub growth, Pune in infrastructure development, Hyderabad in affordable luxury, and NCR in commercial expansion. Secondary cities like Jaipur, Lucknow, and Indore offer exceptional value with strong growth trajectories. Each city has unique characteristics—tech jobs in Bangalore, industrial growth in Pune, affordable living in tier-2 cities. Diversifying across multiple locations reduces risk while maximizing returns. SSR operates in premium locations with proven fundamentals and strong appreciation potential.',
//     image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80',
//     author: 'Mr.Surendra',
//     date: 'Dec 10, 2025',
//     readTime: '1 min read',
//     category: 'Investment',
//     featured: false,
//   },
//   {
//     id: 18,
//     title: 'Real Estate Market Trends to Watch in 2025 – Insights from SSR Properties',
//     excerpt: 'Smart homes, Green Spaces, Rising Investments, Strong Demand in 2025',
//     content: 'The villa versus apartment debate depends on your investment goals and lifestyle preferences. Villas offer: complete ownership, larger land area, flexibility to modify, better appreciation in growth corridors, and premium living experience. Apartments provide: lower entry cost, better maintenance, community amenities, easier resale, and convenience for first-time buyers. For long-term wealth creation, villas typically outperform in emerging areas. For quick liquidity, apartments win in established neighborhoods. The ideal choice aligns with your financial capacity, location preference, and investment horizon. SSR offers both villas and apartments to cater to diverse investor needs.',
//     image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80',
//     author: 'Mr.Surendra',
//     date: 'Dec 10, 2025',
//     readTime: '2 min read',
//     category: 'Guide',
//     featured: false,
//   },
//   {
//     id: 19,
//     title: 'The Future of Independent Living – Trending Designs in Bangalore Homes',
//     excerpt: 'Modern Innovations Are Transforming The Future of Independent Living in Bangalore Homes.',
//     content: 'Land is the most fundamental form of real estate investment. Unlike structures that depreciate, land appreciates indefinitely. Key advantages: minimal maintenance costs, maximum appreciation potential, complete ownership rights, flexibility in development, and strong collateral for loans. Before investing, verify: clear title, registration, municipal approvals, infrastructure timeline, and surrounding development. Emerging areas with confirmed infrastructure pipelines offer the best returns. Land banking—holding land for future development—is a proven wealth-building strategy. Early investors in now-thriving neighborhoods achieved 300-500% returns. Smart investors recognize that land investment is long-term wealth creation.',
//     image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774871826/24.jpg_2_ks6ipn.jpg',
//     author: 'Mr.Surendra',
//     date: 'Dec 3, 2025',
//     readTime: '2 min read',
//     category: 'Investment',
//     featured: false,
//   },
//   {
//     id: 20,
//     title: 'How to Choose the Right Individual House in East Bangalore – Expert Guide',
//     excerpt: 'Expert Guide To Choosing Your Perfect Individual House In East Bangalore',
//     content: 'Smart homes are revolutionizing modern living with AI-powered automation, IoT devices, and energy efficiency. Features like smart locks, automated lighting, temperature control, security systems, and voice assistants enhance convenience and security. Smart homes reduce energy consumption by 30-40%, attracting environmentally conscious buyers and reducing utility costs. Properties with smart home features command 10-15% premium in real estate markets. Integration of solar panels, smart thermostats, and water management systems appeals to eco-conscious investors. As technology adoption increases, smart homes transition from luxury to necessity. Properties with these features ensure future-readiness and sustained value appreciation.',
//     image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
//     author: 'Mr.Surendra',
//     date: 'Dec 3, 2025',
//     readTime: '2 min read',
//     category: 'Technology',
//     featured: false,
//   },
//   {
//     id: 21,
//     title: 'Best Emerging Locations for Property Investment in Bangalore',
//     excerpt: 'Top Growing Neighbourhoods in Bangalore offering High Returns, Fast Development, and Excellent Future Investment Potential.',
//     content: 'Affordable housing doesn\'t mean compromised quality. Strategic location selection and efficient construction reduce costs without sacrificing standards. Tier-2 cities offer spacious homes at fraction of metro prices. Government schemes like PMAY and tax benefits make homeownership accessible. Pre-launch properties offer 15-20% discounts compared to possession-stage pricing. Developers focusing on volume over margins create efficient designs that reduce per-unit costs. Raw land and semi-finished projects offer further discounts for buyer-driven completion. First-time homebuyers benefit from lower registration costs and stamp duties in developing areas. Affordable housing represents the biggest opportunity for middle-class wealth creation.',
//     image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774953723/h12_f9ozfd.png',
//     author: 'Mr.Surendra',
//     date: 'Nov 27, 2025',
//     readTime: '2 min read',
//     category: 'Guide',
//     featured: false,
//   },
//   {
//     id: 22,
//     title: 'Benefits of Living in a Gated Community',
//     excerpt: 'Enjoy Refined Luxury, Superior Comfort, Modern Amenities, and an Elevated Lifestyle at SSR Signature Gardenia Homes.',
//     content: 'Real estate rental income provides consistent passive cash flow with appreciation potential. Location selection is crucial—high-demand areas command premium rents and maintain high occupancy. Target tenant demographics: IT professionals near tech parks, students near universities, corporate professionals in business districts. Maintain properties to justify premium rents and attract quality tenants. Use property management services to reduce operational burden and ensure timely collections. Best practices: 8-10% annual rental yield is realistic, factor in 5% vacancy, plan for 10-15% annual maintenance. Tax benefits through depreciation and deductions improve net returns. Successful landlords reinvest rental income to build property portfolios, creating generational wealth.',
//     image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774871825/p2_jhhrym.png',
//     author: 'Mr.Surendra',
//     date: 'Nov 27, 2025',
//     readTime: '2 min read',
//     category: 'Investment',
//     featured: false,
//   },
//   {
//     id: 23,
//     title: 'SSR Signature Gardenia Houses',
//     excerpt: 'Explore the Luxury and Comfort of SSR Signature Gardenia Homes',
//     content: 'Commercial and residential investments serve different investor profiles. Commercial properties offer: 8-12% rental yields, longer lease terms, corporate-backed security, higher appreciation in job centers. Residential properties offer: easier financing, larger buyer pool, emotional attachment attracts steadier demand, tax incentives. Commercial leases provide stability with annual increases, while residential values appreciate faster in developing areas. Entry cost for commercial is higher, requiring larger capital and lower liquidity. Risk tolerance, capital availability, and investment horizon determine suitability. Smart investors diversify across both categories to balance yield and appreciation. Your strategy should align with financial goals and risk profile.',
//     image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774846011/SSR_Villa_zay5vn.png',
//     author: 'Mr. Amaresh Reddy',
//     date: 'Oct 18, 2024',
//     readTime: '2 min read',
//     category: 'Analysis',
//     featured: false,
//   },
//   {
//     id: 24,
//     title: 'SSR Signature Gardenia Sites & Plots',
//     excerpt: 'Discover the Details of SSR Signature Gardenia Sites & Plots',
//     content: 'Gated communities offer unparalleled security and lifestyle benefits that justify their premium pricing. 24/7 security, controlled access, CCTV surveillance, and professional management ensure resident safety. Common amenities—gyms, parks, swimming pools, community centers—enhance quality of life without individual expenses. Properties in gated communities appreciate faster due to perceived safety and exclusivity. They attract premium tenants, ensuring consistent rental income. Families prefer gated communities for children\'s safety and community environment. Social community events foster relationships among residents. These factors combined make gated communities the preferred choice for premium investments.',
//     image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774809091/Signature_Gardenia_SSR_uueh2e.jpg',
//     author: 'Mr. Amaresh Reddy',
//     date: 'Oct 14, 2024',
//     readTime: '1 min read',
//     category: 'Lifestyle',
//     featured: false,
//   },
//    {
//     id: 25,
//     title: 'About SSR Signature Gardenia',
//     excerpt: 'Take a closer look at SSR Signature Gardenia',
//     content: 'Gated communities offer unparalleled security and lifestyle benefits that justify their premium pricing. 24/7 security, controlled access, CCTV surveillance, and professional management ensure resident safety. Common amenities—gyms, parks, swimming pools, community centers—enhance quality of life without individual expenses. Properties in gated communities appreciate faster due to perceived safety and exclusivity. They attract premium tenants, ensuring consistent rental income. Families prefer gated communities for children\'s safety and community environment. Social community events foster relationships among residents. These factors combined make gated communities the preferred choice for premium investments.',
//     image: 'https://res.cloudinary.com/djuoignk5/image/upload/v1774809635/SSR_img_f98wby.jpg',
//     author: 'Mr.Surendra',
//     date: 'Oct 7, 2024',
//     readTime: '1 min read',
//     category: 'Lifestyle',
//     featured: false,
//   },
// ]

const POSTS_PER_PAGE = 6;

export default function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());
  const { openModal } = useModal();

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);
  const displayedPosts = regularPosts.slice(0, visiblePosts);
  const hasMore = visiblePosts < regularPosts.length;

  const loadMore = () => {
    setVisiblePosts((prev) =>
      Math.min(prev + POSTS_PER_PAGE, regularPosts.length),
    );
  };

  const toggleBookmark = (postId) => {
    setBookmarkedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
        toast.success("Removed from bookmarks");
      } else {
        newSet.add(postId);
        toast.success("Added to bookmarks");
      }
      return newSet;
    });
  };

  const sharePost = (post) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-[#c89b3c]/10 text-[#c89b3c] px-4 py-1 rounded-full text-sm font-medium mb-4">
            Latest Updates
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Real Estate Insights
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with trends in real estate, property investment advice,
            and SSR project news.
          </p>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
              <div className="grid lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <Badge className="absolute top-4 left-4 bg-[#c89b3c] text-white">
                    Featured
                  </Badge>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <Badge variant="outline" className="w-fit mb-4">
                    {featuredPost.category}
                  </Badge>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <Button
                      onClick={() => openModal("blogDetail", featuredPost)}
                      variant="ghost"
                      className="text-[#c89b3c]"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {displayedPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
              >
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => toggleBookmark(post.id)}
                      className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${bookmarkedPosts.has(post.id) ? "fill-[#c89b3c] text-[#c89b3c]" : "text-gray-600"}`}
                      />
                    </button>
                    <button
                      onClick={() => sharePost(post)}
                      className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <Share2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex-1">
                    <Badge variant="outline" className="mb-3">
                      {post.category}
                    </Badge>

                    <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-[#c89b3c] transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4 mt-auto">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                    </div>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <Button
                    onClick={() => openModal("blogDetail", post)}
                    className="w-full bg-[#c89b3c] text-white hover:bg-[#b8891e] font-semibold"
                  >
                    View Details
                  </Button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <Button
              onClick={loadMore}
              variant="outline"
              className="h-12 px-8 border-2 border-[#c89b3c] text-[#c89b3c] hover:bg-[#c89b3c] hover:text-white font-semibold rounded-full"
            >
              Load More Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

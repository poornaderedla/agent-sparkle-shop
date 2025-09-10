import { motion } from 'framer-motion';
import { Newspaper, ExternalLink, Calendar, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Press = () => {
  const pressReleases = [
    {
      title: 'EcoShop Raises $50M Series B to Accelerate AI-Powered E-Commerce Innovation',
      date: '2024-01-15',
      author: 'Sarah Johnson, CEO',
      summary: 'Funding will be used to expand AI capabilities, grow the team, and enhance sustainable shopping features.',
      category: 'Funding'
    },
    {
      title: 'EcoShop Launches Revolutionary AI Recommendation Engine',
      date: '2023-11-20',
      author: 'Michael Chen, CTO',
      summary: 'New AI technology provides personalized product recommendations with 95% accuracy.',
      category: 'Product'
    },
    {
      title: 'EcoShop Partners with 100+ Sustainable Brands',
      date: '2023-09-10',
      author: 'Emily Rodriguez, Head of Partnerships',
      summary: 'Expanding our marketplace with eco-friendly and sustainable product offerings.',
      category: 'Partnership'
    },
    {
      title: 'EcoShop Achieves Carbon Neutral Operations',
      date: '2023-07-05',
      author: 'David Kim, Head of Sustainability',
      summary: 'Company reaches major sustainability milestone with carbon-neutral shipping and operations.',
      category: 'Sustainability'
    }
  ];

  const mediaCoverage = [
    {
      title: 'How AI is Revolutionizing Online Shopping',
      publication: 'TechCrunch',
      date: '2024-01-20',
      author: 'Alex Thompson',
      summary: 'EcoShop\'s innovative approach to personalized e-commerce is changing the industry.',
      link: '#'
    },
    {
      title: 'The Future of Sustainable E-Commerce',
      publication: 'Forbes',
      date: '2023-12-15',
      author: 'Maria Garcia',
      summary: 'EcoShop leads the way in environmentally conscious online shopping.',
      link: '#'
    },
    {
      title: 'Startup Spotlight: EcoShop\'s Mission to Green E-Commerce',
      publication: 'VentureBeat',
      date: '2023-11-30',
      author: 'James Wilson',
      summary: 'An in-depth look at EcoShop\'s journey and impact on the e-commerce landscape.',
      link: '#'
    },
    {
      title: 'AI-Powered Shopping: The Next Big Thing',
      publication: 'Wired',
      date: '2023-10-18',
      author: 'Lisa Chen',
      summary: 'EcoShop\'s AI technology is setting new standards for online shopping experiences.',
      link: '#'
    }
  ];

  const awards = [
    {
      title: 'Best AI Innovation in E-Commerce',
      organization: 'Tech Innovation Awards 2024',
      date: '2024-02-01',
      description: 'Recognized for our groundbreaking AI recommendation system.'
    },
    {
      title: 'Sustainability Excellence Award',
      organization: 'Green Business Council 2023',
      date: '2023-12-10',
      description: 'Honored for our commitment to carbon-neutral operations.'
    },
    {
      title: 'Startup of the Year',
      organization: 'E-Commerce Innovation Summit 2023',
      date: '2023-11-15',
      description: 'Celebrated for our innovative approach to online shopping.'
    }
  ];

  const contactInfo = {
    name: 'Sarah Johnson',
    title: 'CEO & Co-Founder',
    email: 'press@ecoshop.com',
    phone: '+1 (555) 123-4567'
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemCount={0} />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <Newspaper className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold">Press & Media</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest news, press releases, and media coverage about EcoShop.
          </p>
        </motion.div>

        {/* Press Releases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8">Press Releases</h2>
          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="card-elegant">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{release.category}</Badge>
                        </div>
                        <CardTitle className="text-xl mb-3">{release.title}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(release.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                          <span className="mx-2">•</span>
                          <User className="h-4 w-4 mr-1" />
                          {release.author}
                        </div>
                        <p className="text-muted-foreground">{release.summary}</p>
                      </div>
                      <Button variant="outline" className="btn-ghost-primary">
                        Read More
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Media Coverage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8">Media Coverage</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {mediaCoverage.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className="card-elegant h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{article.publication}</Badge>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-lg mb-3">{article.title}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(article.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                      <span className="mx-2">•</span>
                      <User className="h-4 w-4 mr-1" />
                      {article.author}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{article.summary}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Awards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8">Awards & Recognition</h2>
          <div className="space-y-6">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <Card className="card-elegant">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{award.title}</h3>
                        <p className="text-primary font-medium mb-2">{award.organization}</p>
                        <p className="text-muted-foreground mb-3">{award.description}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(award.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Press Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="text-2xl">Press Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Media Inquiries</h3>
                  <p className="text-muted-foreground mb-4">
                    For press inquiries, interview requests, or media kit downloads, 
                    please contact our press team.
                  </p>
                  <div className="space-y-2">
                    <p><strong>Email:</strong> {contactInfo.email}</p>
                    <p><strong>Phone:</strong> {contactInfo.phone}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Press Kit</h3>
                  <p className="text-muted-foreground mb-4">
                    Download our press kit for logos, product images, and company information.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="btn-hero">
                      Download Press Kit
                    </Button>
                    <Button variant="outline" className="btn-ghost-primary">
                      Company Fact Sheet
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Press;

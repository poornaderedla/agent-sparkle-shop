import { motion } from 'framer-motion';
import { Briefcase, Users, MapPin, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Careers = () => {
  const benefits = [
    {
      icon: Users,
      title: 'Collaborative Culture',
      description: 'Work with talented, passionate people who share your values and drive for excellence.'
    },
    {
      icon: Briefcase,
      title: 'Growth Opportunities',
      description: 'Advance your career with mentorship, training programs, and challenging projects.'
    },
    {
      icon: MapPin,
      title: 'Flexible Work',
      description: 'Remote-friendly environment with flexible hours and work-life balance.'
    },
    {
      icon: Clock,
      title: 'Generous Benefits',
      description: 'Comprehensive health coverage, unlimited PTO, and competitive compensation.'
    }
  ];

  const openPositions = [
    {
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
      description: 'Build beautiful, responsive user interfaces using React, TypeScript, and modern web technologies.',
      requirements: [
        '5+ years of frontend development experience',
        'Expert knowledge of React and TypeScript',
        'Experience with modern CSS frameworks',
        'Strong understanding of web performance optimization'
      ]
    },
    {
      title: 'AI/ML Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
      description: 'Develop and improve our AI-powered recommendation systems and personalization algorithms.',
      requirements: [
        '3+ years of machine learning experience',
        'Proficiency in Python and ML frameworks',
        'Experience with recommendation systems',
        'Strong background in data science'
      ]
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
      description: 'Create intuitive and beautiful user experiences that delight our customers.',
      requirements: [
        '4+ years of product design experience',
        'Proficiency in Figma and design systems',
        'Strong portfolio of user-centered designs',
        'Experience with e-commerce platforms'
      ]
    },
    {
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
      description: 'Help our customers achieve their goals and ensure their success with our platform.',
      requirements: [
        '3+ years of customer success experience',
        'Excellent communication and problem-solving skills',
        'Experience with CRM systems',
        'Passion for helping customers succeed'
      ]
    }
  ];

  const companyValues = [
    'Innovation and creativity in everything we do',
    'Customer-first mindset in all decisions',
    'Sustainability and environmental responsibility',
    'Diversity, equity, and inclusion',
    'Continuous learning and growth',
    'Transparency and open communication'
  ];

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
            <Briefcase className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold">Join Our Team</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help us build the future of e-commerce. We're looking for passionate, talented individuals 
            who want to make a difference.
          </p>
        </motion.div>

        {/* Why Work With Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Why Work With Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="card-elegant h-full text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Open Positions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className="card-elegant">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-2xl mb-2">{position.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary">{position.department}</Badge>
                          <Badge variant="outline">{position.type}</Badge>
                        </div>
                        <p className="text-muted-foreground flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {position.location}
                        </p>
                      </div>
                      <Button className="btn-hero">
                        Apply Now
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{position.description}</p>
                    <div>
                      <h4 className="font-semibold mb-3">Requirements:</h4>
                      <ul className="space-y-2">
                        {position.requirements.map((requirement, reqIndex) => (
                          <li key={reqIndex} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Company Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Our Values</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {companyValues.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center"
                  >
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <span>{value}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Card className="card-elegant max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Don't See Your Role?</h3>
              <p className="text-muted-foreground mb-6">
                We're always looking for talented individuals to join our team. 
                Send us your resume and let us know how you'd like to contribute.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-hero">
                  Send Resume
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button variant="outline" className="btn-ghost-primary">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Careers;

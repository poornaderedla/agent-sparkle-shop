import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, Users, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy = () => {
  const privacyPrinciples = [
    {
      icon: Shield,
      title: 'Data Protection',
      description: 'We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure.'
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'We clearly explain what data we collect, how we use it, and who we share it with. No hidden practices or surprises.'
    },
    {
      icon: Lock,
      title: 'Your Control',
      description: 'You have the right to access, update, or delete your personal information at any time through your account settings.'
    },
    {
      icon: Database,
      title: 'Minimal Collection',
      description: 'We only collect the data necessary to provide our services and improve your shopping experience.'
    }
  ];

  const dataTypes = [
    {
      category: 'Account Information',
      data: ['Name', 'Email address', 'Phone number', 'Billing and shipping addresses', 'Payment information'],
      purpose: 'To create and manage your account, process orders, and provide customer support.'
    },
    {
      category: 'Usage Data',
      data: ['Pages visited', 'Products viewed', 'Search queries', 'Time spent on site', 'Device information'],
      purpose: 'To improve our website, personalize your experience, and provide relevant product recommendations.'
    },
    {
      category: 'Communication Data',
      data: ['Customer service interactions', 'Feedback and reviews', 'Marketing preferences'],
      purpose: 'To respond to your inquiries, improve our services, and send relevant communications.'
    }
  ];

  const rights = [
    'Access your personal data',
    'Correct inaccurate information',
    'Delete your account and data',
    'Export your data',
    'Opt out of marketing communications',
    'Object to certain data processing'
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
            <Shield className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <Badge variant="secondary" className="mt-4">
            Last updated: January 15, 2024
          </Badge>
        </motion.div>

        {/* Privacy Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Our Privacy Principles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {privacyPrinciples.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="card-elegant h-full text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <principle.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{principle.title}</h3>
                    <p className="text-muted-foreground">{principle.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Information We Collect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8">Information We Collect</h2>
          <div className="space-y-6">
            {dataTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className="card-elegant">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Database className="h-5 w-5 mr-2" />
                      {type.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Data Collected:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {type.data.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-muted-foreground">{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Purpose:</h4>
                        <p className="text-muted-foreground">{type.purpose}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* How We Use Your Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8">How We Use Your Information</h2>
            <Card className="card-elegant">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Service Delivery</h4>
                    <p className="text-muted-foreground text-sm">
                      Process orders, manage your account, and provide customer support.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Personalization</h4>
                    <p className="text-muted-foreground text-sm">
                      Provide personalized product recommendations and shopping experiences.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Communication</h4>
                    <p className="text-muted-foreground text-sm">
                      Send order updates, promotional offers, and important service notifications.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Improvement</h4>
                    <p className="text-muted-foreground text-sm">
                      Analyze usage patterns to improve our website and services.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Security</h4>
                    <p className="text-muted-foreground text-sm">
                      Protect against fraud and ensure the security of our platform.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Your Rights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-3xl font-bold mb-8">Your Rights</h2>
            <Card className="card-elegant">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {rights.map((right, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.05 }}
                      className="flex items-center"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary mr-3 flex-shrink-0" />
                      <span className="text-sm">{right}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    To exercise any of these rights, please contact us at{' '}
                    <a href="mailto:privacy@ecoshop.com" className="text-primary hover:underline">
                      privacy@ecoshop.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Data Sharing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 mb-16"
        >
          <h2 className="text-3xl font-bold mb-8">Data Sharing</h2>
          <Card className="card-elegant">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">We may share your information with:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mr-3 mt-2 flex-shrink-0" />
                      <div>
                        <strong>Service Providers:</strong> Third-party companies that help us operate our business (payment processors, shipping companies, etc.)
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mr-3 mt-2 flex-shrink-0" />
                      <div>
                        <strong>Legal Requirements:</strong> When required by law or to protect our rights and safety
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mr-3 mt-2 flex-shrink-0" />
                      <div>
                        <strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mr-3 mt-2 flex-shrink-0" />
                      <div>
                        <strong>Consent:</strong> When you explicitly consent to sharing your information
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>We do not sell your personal information</strong> to third parties for their marketing purposes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="text-2xl">Questions About This Policy?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Privacy Team</h3>
                  <p className="text-muted-foreground mb-4">
                    If you have questions about this privacy policy or how we handle your data, 
                    please contact our privacy team.
                  </p>
                  <div className="space-y-2">
                    <p><strong>Email:</strong> privacy@ecoshop.com</p>
                    <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Data Protection Officer</h3>
                  <p className="text-muted-foreground mb-4">
                    For specific data protection concerns or to exercise your rights, 
                    contact our Data Protection Officer.
                  </p>
                  <div className="space-y-2">
                    <p><strong>Email:</strong> dpo@ecoshop.com</p>
                    <p><strong>Response Time:</strong> Within 30 days</p>
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

export default Privacy;

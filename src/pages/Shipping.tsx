import { motion } from 'framer-motion';
import { Truck, Clock, Shield, Globe, Package, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Shipping = () => {
  const shippingOptions = [
    {
      icon: Truck,
      title: 'Standard Shipping',
      duration: '3-5 Business Days',
      price: 'Free on orders over $50',
      description: 'Our most popular shipping option with reliable delivery times.',
      features: ['Tracking included', 'Signature required', 'Insurance included']
    },
    {
      icon: Clock,
      title: 'Express Shipping',
      duration: '1-2 Business Days',
      price: '$9.99',
      description: 'Get your order delivered quickly with our express service.',
      features: ['Priority handling', 'Real-time tracking', 'Guaranteed delivery']
    },
    {
      icon: Globe,
      title: 'International Shipping',
      duration: '7-14 Business Days',
      price: 'Varies by location',
      description: 'We ship worldwide to bring you amazing products anywhere.',
      features: ['Customs handled', 'Duty calculator', 'Global tracking']
    }
  ];

  const shippingZones = [
    {
      region: 'United States',
      countries: ['USA'],
      standardDays: '3-5',
      expressDays: '1-2',
      freeShippingThreshold: '$50'
    },
    {
      region: 'North America',
      countries: ['Canada', 'Mexico'],
      standardDays: '5-7',
      expressDays: '2-3',
      freeShippingThreshold: '$75'
    },
    {
      region: 'Europe',
      countries: ['UK', 'Germany', 'France', 'Italy', 'Spain', 'Netherlands'],
      standardDays: '7-10',
      expressDays: '3-5',
      freeShippingThreshold: '$100'
    },
    {
      region: 'Asia Pacific',
      countries: ['Japan', 'Australia', 'Singapore', 'South Korea'],
      standardDays: '10-14',
      expressDays: '5-7',
      freeShippingThreshold: '$100'
    }
  ];

  const shippingTips = [
    {
      icon: Package,
      title: 'Package Protection',
      description: 'All items are carefully packaged with protective materials to ensure they arrive in perfect condition.'
    },
    {
      icon: Shield,
      title: 'Insurance Coverage',
      description: 'Every shipment is automatically insured for the full value of your order.'
    },
    {
      icon: MapPin,
      title: 'Delivery Tracking',
      description: 'Track your package in real-time from our warehouse to your doorstep.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemCount={0} />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Truck className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold">Shipping Information</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fast, reliable shipping options to get your products delivered safely and on time.
          </p>
        </motion.div>

        {/* Shipping Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Shipping Options</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {shippingOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="card-elegant h-full">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <option.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{option.title}</CardTitle>
                    <Badge variant="secondary" className="w-fit mx-auto">
                      {option.duration}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-4">
                      <p className="text-2xl font-bold text-primary mb-2">{option.price}</p>
                      <p className="text-muted-foreground">{option.description}</p>
                    </div>
                    <ul className="space-y-2">
                      {option.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <div className="w-2 h-2 rounded-full bg-primary mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Shipping Zones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Shipping Zones & Times</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {shippingZones.map((zone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className="card-elegant">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="h-5 w-5 mr-2" />
                      {zone.region}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Countries:</h4>
                        <p className="text-muted-foreground">{zone.countries.join(', ')}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-1">Standard:</h4>
                          <p className="text-primary font-medium">{zone.standardDays} days</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Express:</h4>
                          <p className="text-primary font-medium">{zone.expressDays} days</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Free Shipping:</h4>
                        <p className="text-primary font-medium">Orders over {zone.freeShippingThreshold}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Shipping Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Our Shipping?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {shippingTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <tip.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{tip.title}</h3>
                <p className="text-muted-foreground">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle>Important Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Processing Time:</h4>
                  <p className="text-muted-foreground">
                    Orders are processed within 1-2 business days. Processing time is separate from shipping time.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Delivery Attempts:</h4>
                  <p className="text-muted-foreground">
                    We make up to 3 delivery attempts. If delivery fails, packages will be held at the local facility for pickup.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Holiday Shipping:</h4>
                  <p className="text-muted-foreground">
                    Shipping times may be extended during holidays. Check our holiday schedule for specific dates.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Customs & Duties:</h4>
                  <p className="text-muted-foreground">
                    International orders may be subject to customs duties and taxes. These are the responsibility of the recipient.
                  </p>
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

export default Shipping;

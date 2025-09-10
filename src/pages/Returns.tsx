import { motion } from 'framer-motion';
import { RotateCcw, Clock, CheckCircle, AlertCircle, Package, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Returns = () => {
  const returnSteps = [
    {
      icon: Package,
      title: '1. Start Your Return',
      description: 'Log into your account and go to "My Orders" to initiate a return request.',
      details: 'Select the items you want to return and provide a reason for the return.'
    },
    {
      icon: Truck,
      title: '2. Print Return Label',
      description: 'We\'ll email you a prepaid return shipping label within 24 hours.',
      details: 'Print the label and securely package your items with the original packaging.'
    },
    {
      icon: CheckCircle,
      title: '3. Ship Your Return',
      description: 'Drop off your package at any authorized shipping location.',
      details: 'Keep your tracking number for reference. You can track your return shipment.'
    },
    {
      icon: RotateCcw,
      title: '4. Receive Refund',
      description: 'Once we receive and process your return, your refund will be issued.',
      details: 'Refunds are processed within 3-5 business days and appear on your original payment method.'
    }
  ];

  const returnPolicy = [
    {
      icon: Clock,
      title: '30-Day Return Window',
      description: 'You have 30 days from the delivery date to return most items.',
      details: 'Some items like electronics may have different return periods.'
    },
    {
      icon: CheckCircle,
      title: 'Original Condition Required',
      description: 'Items must be in original condition with all tags and packaging.',
      details: 'Items should be unworn, unused, and in resellable condition.'
    },
    {
      icon: AlertCircle,
      title: 'Free Return Shipping',
      description: 'We provide prepaid return labels for most returns.',
      details: 'Some special items may require you to pay return shipping costs.'
    }
  ];

  const returnReasons = [
    'Changed my mind',
    'Wrong size',
    'Item damaged in shipping',
    'Defective product',
    'Not as described',
    'Received wrong item',
    'Quality issues'
  ];

  const nonReturnableItems = [
    'Personalized or custom items',
    'Items marked as final sale',
    'Gift cards and digital products',
    'Items damaged by misuse',
    'Items without original packaging',
    'Items returned after 30 days'
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
            <RotateCcw className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold">Returns & Exchanges</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Easy returns and exchanges. We want you to love what you buy from us.
          </p>
        </motion.div>

        {/* Return Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">How to Return an Item</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {returnSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="card-elegant h-full">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">{step.description}</p>
                    <p className="text-sm text-muted-foreground">{step.details}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Return Policy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-8">Return Policy</h2>
            <div className="space-y-6">
              {returnPolicy.map((policy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Card className="card-elegant">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <policy.icon className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{policy.title}</h3>
                          <p className="text-muted-foreground mb-2">{policy.description}</p>
                          <p className="text-sm text-muted-foreground">{policy.details}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Return Reasons & Non-Returnable Items */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-8"
          >
            {/* Return Reasons */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Common Return Reasons</h3>
              <Card className="card-elegant">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 gap-2">
                    {returnReasons.map((reason, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.05 }}
                        className="flex items-center"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary mr-3 flex-shrink-0" />
                        <span className="text-sm">{reason}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Non-Returnable Items */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Non-Returnable Items</h3>
              <Card className="card-elegant">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 gap-2">
                    {nonReturnableItems.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.05 }}
                        className="flex items-center"
                      >
                        <AlertCircle className="w-4 h-4 text-destructive mr-3 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        {/* Refund Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="text-2xl">Refund Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-semibold mb-3">Processing Time</h4>
                  <p className="text-muted-foreground">
                    Once we receive your return, refunds are processed within 3-5 business days.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Refund Method</h4>
                  <p className="text-muted-foreground">
                    Refunds are issued to your original payment method within 5-10 business days.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Partial Returns</h4>
                  <p className="text-muted-foreground">
                    If you return part of an order, you'll receive a partial refund for the returned items.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="text-center mt-12"
        >
          <Card className="card-elegant max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Start a Return?</h3>
              <p className="text-muted-foreground mb-6">
                Log into your account to begin the return process or contact us if you need assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-hero">
                  Start Return
                </Button>
                <Button variant="outline" className="btn-ghost-primary">
                  Contact Support
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

export default Returns;

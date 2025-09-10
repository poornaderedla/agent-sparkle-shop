import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: 'General',
      questions: [
        {
          question: 'What is EcoShop?',
          answer: 'EcoShop is an AI-powered e-commerce platform that helps you discover amazing products with personalized recommendations. We focus on quality, sustainability, and innovation in every purchase.'
        },
        {
          question: 'How do I create an account?',
          answer: 'Creating an account is easy! Click on the "Sign Up" button in the top navigation, fill in your details, and you\'ll be ready to start shopping in minutes.'
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Absolutely! We use industry-standard encryption and security measures to protect your personal information. Your data is never shared with third parties without your consent.'
        }
      ]
    },
    {
      title: 'Orders & Shipping',
      questions: [
        {
          question: 'How long does shipping take?',
          answer: 'Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 business days. International shipping may take 7-14 business days depending on the destination.'
        },
        {
          question: 'Can I track my order?',
          answer: 'Yes! Once your order ships, you\'ll receive a tracking number via email. You can track your package in real-time through our order tracking system.'
        },
        {
          question: 'What if my order is damaged?',
          answer: 'We\'re sorry to hear that! Please contact our customer service team immediately with photos of the damaged items. We\'ll arrange for a replacement or full refund.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Check our shipping page for detailed information.'
        }
      ]
    },
    {
      title: 'Returns & Refunds',
      questions: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy for most items. Items must be in original condition with tags attached. Some items like electronics may have different return terms.'
        },
        {
          question: 'How do I return an item?',
          answer: 'Start a return by logging into your account and going to "My Orders". Select the item you want to return and follow the instructions. We\'ll provide a prepaid return label.'
        },
        {
          question: 'How long do refunds take?',
          answer: 'Once we receive your returned item, refunds are processed within 3-5 business days. The refund will appear on your original payment method within 5-10 business days.'
        }
      ]
    },
    {
      title: 'Payment',
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers for larger orders.'
        },
        {
          question: 'Is my payment information secure?',
          answer: 'Yes! We use SSL encryption and work with trusted payment processors to ensure your payment information is always secure and protected.'
        },
        {
          question: 'Can I pay in installments?',
          answer: 'Yes! We offer flexible payment options including buy now, pay later services through our partners. Look for these options at checkout.'
        }
      ]
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
            <HelpCircle className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our products, services, and policies.
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="max-w-4xl mx-auto space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <div className="flex items-center mb-6">
                <Badge variant="secondary" className="mr-3">
                  {category.title}
                </Badge>
                <h2 className="text-2xl font-bold">{category.title} Questions</h2>
              </div>

              <div className="space-y-4">
                {category.questions.map((item, itemIndex) => {
                  const globalIndex = categoryIndex * 10 + itemIndex;
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (categoryIndex * 0.1) + (itemIndex * 0.05) }}
                    >
                      <Card className="card-elegant">
                        <CardContent className="p-0">
                          <button
                            onClick={() => toggleItem(globalIndex)}
                            className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
                          >
                            <h3 className="font-semibold text-lg pr-4">{item.question}</h3>
                            <motion.div
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {isOpen ? (
                                <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                              )}
                            </motion.div>
                          </button>
                          
                          <motion.div
                            initial={false}
                            animate={{
                              height: isOpen ? 'auto' : 0,
                              opacity: isOpen ? 1 : 0
                            }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-0">
                              <p className="text-muted-foreground leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <Card className="card-elegant max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Our customer service team is here to help!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="btn-hero">
                  Contact Us
                </a>
                <a href="mailto:hello@ecoshop.com" className="btn-ghost-primary">
                  Email Support
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;

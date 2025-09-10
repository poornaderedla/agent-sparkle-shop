import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemCount={0} />
      
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <Card className="card-elegant">
            <CardContent className="p-12">
              {/* 404 Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 mx-auto mb-8 rounded-full bg-destructive/10 flex items-center justify-center"
              >
                <AlertCircle className="h-12 w-12 text-destructive" />
              </motion.div>

              {/* Error Code */}
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-8xl font-bold text-gradient mb-4"
              >
                404
              </motion.h1>

              {/* Error Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4 mb-8"
              >
                <h2 className="text-2xl font-bold text-foreground">
                  Oops! Page not found
                </h2>
                <p className="text-muted-foreground text-lg">
                  The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                  <code className="font-mono">/{location.pathname}</code>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link to="/">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="btn-hero">
                      <Home className="h-5 w-5 mr-2" />
                      Go Home
                    </Button>
                  </motion.div>
                </Link>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="btn-ghost-primary"
                    onClick={() => window.history.back()}
                  >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Go Back
                  </Button>
                </motion.div>
              </motion.div>

              {/* Helpful Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 pt-8 border-t border-border"
              >
                <p className="text-sm text-muted-foreground mb-4">
                  Looking for something specific? Try these popular pages:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Link to="/products">
                    <Button variant="ghost" size="sm">
                      <Search className="h-4 w-4 mr-2" />
                      All Products
                    </Button>
                  </Link>
                  <Link to="/categories">
                    <Button variant="ghost" size="sm">
                      Categories
                    </Button>
                  </Link>
                  <Link to="/cart">
                    <Button variant="ghost" size="sm">
                      Shopping Cart
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;

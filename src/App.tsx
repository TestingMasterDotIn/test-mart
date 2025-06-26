
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ComparisonProvider } from "./contexts/ComparisonContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { ReviewProvider } from "./contexts/ReviewContext";
import { PriceTrackingProvider } from "./contexts/PriceTrackingContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import ProductComparison from "./pages/ProductComparison";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import ThankYou from "./pages/ThankYou";
import TestCases from "./pages/TestCases";
import NotFound from "./pages/NotFound";
import ChatSupport from "./components/ChatSupport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
            <ComparisonProvider>
              <WishlistProvider>
                <ReviewProvider>
                  <PriceTrackingProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/products/:id" element={<ProductDetails />} />
                        <Route path="/compare" element={<ProductComparison />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/thank-you" element={<ThankYou />} />
                        <Route path="/test-cases" element={<TestCases />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                      <ChatSupport />
                    </BrowserRouter>
                  </PriceTrackingProvider>
                </ReviewProvider>
              </WishlistProvider>
            </ComparisonProvider>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

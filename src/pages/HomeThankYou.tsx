import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";

const HomeThankYou = () => {
    return (
        <Layout>
            <SEO
                title="Thank You | TEYES Global"
                description="Thank you for contacting TEYES. We have received your message and will get back to you shortly."
                path="/thank-you"
                noindex={true}
            />
            <section className="py-32 bg-gradient-to-b from-card to-background min-h-[60vh] flex items-center">
                <div className="container-wide">
                    <div className="max-w-xl mx-auto text-center">
                        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <CheckCircle className="h-10 w-10 text-primary" />
                        </div>
                        <h1 className="text-4xl font-display font-bold mb-4">
                            Thank You!
                        </h1>
                        <p className="text-xl text-muted-foreground mb-12">
                            Your inquiry has been successfully sent. Our team will review your message
                            and respond within 24-48 business hours.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" asChild>
                                <Link to="/">
                                    Return Home
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <Link to="/products" className="flex items-center gap-2">
                                    View Our Products
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default HomeThankYou;

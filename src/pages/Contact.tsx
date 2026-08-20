import { useState, type MouseEvent } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { delayForConversionDispatch, pushContactEmailClick, pushFormSubmitSuccess } from "@/lib/tracking";
import { buildAttribution, submitZohoLead, type LeadCapturePayload } from "@/lib/leadCapture";

// EmailJS Configuration
const EMAILJS_SERVICE_ID = "service_kzddimj";
const EMAILJS_TEMPLATE_ID = "template_8l4kcgw";
const EMAILJS_PUBLIC_KEY = "qqyCnA4nzk57_gF6N";

const inquiryTypes = [
  { value: "distribution", label: "Distribution Partnership" },
  { value: "oem", label: "OEM / ODM Inquiry" },
  { value: "product", label: "Product Information" },
  { value: "support", label: "Technical Support" },
  { value: "other", label: "Other" },
];

const contactInfo = [
  { icon: Mail, label: "Email", value: "info@teyesauto.com", href: "mailto:info@teyesauto.com" },
  { icon: Phone, label: "Phone", value: "0086 18594023375", href: "tel:008618594023375" },
  {
    icon: () => (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.435 5.633 1.435h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    label: "WhatsApp",
    value: "Chat Online",
    href: "https://wa.me/8618594023375"
  },
  { icon: Clock, label: "Hours", value: "Mon-Fri 9:00-18:00 (GMT+8)", href: null },
];

const ContactPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    inquiryType: "",
    message: "",
    website: "",
  });

  const handleEmailClick = (emailHref: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    pushContactEmailClick("info@teyesauto.com", {
      link_location: "contact_page_contact_info",
    });

    window.setTimeout(() => {
      window.location.href = emailHref;
    }, 250);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const fetchWithTimeout = async (url: string, timeout = 4000) => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeout);
      try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timer);
        return response;
      } catch (error) {
        clearTimeout(timer);
        throw error;
      }
    };

    try {
      let user_country = "Unknown";

      try {
        const geoResponse = await fetchWithTimeout("https://ipapi.co/json/");
        if (geoResponse.ok) {
          const geo = await geoResponse.json();
          user_country = geo.country_name || geo.country || user_country;
        } else {
          const fallbackResponse = await fetchWithTimeout("https://ipwho.is/");
          if (fallbackResponse.ok) {
            const fallbackGeo = await fallbackResponse.json();
            user_country = fallbackGeo.country || user_country;
          }
        }
      } catch (geoError) {
        console.warn("Geo lookup failed:", geoError);
      }

      // EmailJS template parameters
      const templateParams = {
        full_name: formData.name,
        user_email: formData.email,
        company: formData.company || "N/A",
        country: formData.country || "N/A",
        user_country,
        inquiry_type: formData.inquiryType || "General",
        user_time: new Date().toISOString(),
        message: formData.message,
        to_email: "info@teyesauto.com",
      };

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        pushFormSubmitSuccess("contact_page", {
          inquiry_type: formData.inquiryType || "General",
          country: formData.country || user_country || "Unknown",
          has_company: Boolean(formData.company.trim()),
        });
        const leadPayload: LeadCapturePayload = {
          source: "contact_page",
          fullName: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          country: (formData.country || user_country || "").trim(),
          inquiryType: formData.inquiryType || "General",
          message: formData.message.trim(),
          estimatedQuantity: "",
          businessModel: "",
          submittedAt: new Date().toISOString(),
          website: formData.website.trim(),
          attribution: buildAttribution(),
        };
        void submitZohoLead(leadPayload).catch((error) => {
          console.error("Zoho lead capture failed", error);
        });
        await delayForConversionDispatch(300);
        navigate("/thank-you");
      } else {
        throw new Error("Failed to send message via EmailJS");
      }
    } catch (error) {
      const errorMessage =
        typeof error === "object" && error && "text" in error
          ? (error as { text?: string }).text
          : error instanceof Error
            ? error.message
            : "Unknown error";

      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: `There was an error sending your message: ${errorMessage}. Please try again or contact us via WhatsApp.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };


  return (
    <Layout>
      <SEO
        title="Contact Us - Partnership & Product Inquiries"
        description="Contact TEYES for distribution partnerships, OEM/ODM inquiries, product information, or technical support. Our team responds within 24-48 hours."
        keywords="contact TEYES, car infotainment distributor, OEM inquiry, partnership, technical support"
        path="/contact/"
      />
      <ContextHeader
        title="Contact Us"
        description="Whether you are interested in distribution, OEM partnership, or have questions, we are here to help."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      {/* Contact Form + Info */}
      <section className="py-10 bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-card border border-border/50 p-8">
                <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="absolute left-[-10000px]" aria-hidden="true">
                    <Label htmlFor="website">Leave this field blank</Label>
                    <Input
                      id="website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={(event) => handleChange("website", event.target.value)}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        maxLength={100}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        maxLength={255}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        placeholder="Your company name"
                        value={formData.company}
                        onChange={(e) => handleChange("company", e.target.value)}
                        maxLength={100}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country / Region</Label>
                      <Input
                        id="country"
                        placeholder="Your location"
                        value={formData.country}
                        onChange={(e) => handleChange("country", e.target.value)}
                        maxLength={100}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inquiryType">Inquiry Type</Label>
                    <Select
                      value={formData.inquiryType}
                      onValueChange={(value) => handleChange("inquiryType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        {inquiryTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your inquiry..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      maxLength={2000}
                      required
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {formData.message.length}/2000
                    </p>
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="rounded-2xl bg-card border border-border/50 p-8">
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                <ul className="space-y-6">
                  {contactInfo.map((info) => (
                    <li key={info.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        {(() => {
                          const Icon = info.icon;
                          if (typeof Icon === 'function') {
                            if (Icon.prototype && Icon.prototype.isReactComponent) {
                              return <Icon className="h-5 w-5 text-primary" />;
                            }
                            // Call it if it's a simple function returning JSX (like WhatsApp)
                            return <Icon />;
                          }
                          return null;
                        })()}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            onClick={info.label === "Email" ? handleEmailClick(info.href) : undefined}
                            target={info.label === "WhatsApp" ? "_blank" : undefined}
                            rel={info.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-medium">{info.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 p-8">
                <h3 className="text-lg font-semibold mb-3">Quick Response</h3>
                <p className="text-muted-foreground text-sm">
                  For urgent partnership inquiries, our team typically responds within
                  24 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;

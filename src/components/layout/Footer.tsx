import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Youtube, Facebook } from "lucide-react";

const footerLinks = {
  products: [
    { name: "Flagship Series", href: "/products/#flagship" },
    { name: "Advanced Series", href: "/products/#advanced" },
    { name: "Entry Series", href: "/products/#entry" },
    { name: "Accessories", href: "/accessories/" },
  ],
  solutions: [
    { name: "For Distributors", href: "/solutions/distributors/" },
    { name: "For Auto Brands", href: "/solutions/auto-brands/" },
    { name: "For Integrators", href: "/solutions/integrators/" },
    { name: "Market Solutions", href: "/solutions/market-needs/" },
  ],
  company: [
    { name: "OEM / ODM", href: "/oem-odm/" },
    { name: "Certifications", href: "/oem-odm/certifications/" },
    { name: "Project Cases", href: "/oem-odm/cases/" },
    { name: "Contact", href: "/contact/" },
  ],
};

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/teyes", icon: Linkedin },
  { name: "YouTube", href: "https://www.youtube.com/@teyes", icon: Youtube },
  { name: "Facebook", href: "https://www.facebook.com/teyesglobal", icon: Facebook },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-6">
              <img
                src="/main-logo.webp"
                alt="TEYES Logo"
                width="300"
                height="56"
                className="h-8 w-auto transition-all"
              />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Global Smart Infotainment Solutions for the Automotive Aftermarket.
              Trusted by distributors and auto brands across 100+ markets.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Solutions</h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} TEYES. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

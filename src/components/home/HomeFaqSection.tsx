const faqs = [
  {
    question: "Is this the official TEYES Global website?",
    answer:
      "This is the international website for TEYES Android car stereos, car audio products and accessories.",
  },
  {
    question: "Does TEYES Global support distributors?",
    answer:
      "Yes. TEYES works with distributors, wholesalers, installers and retail partners. Contact the team to discuss product selection and current distribution options.",
  },
  {
    question: "Can I become a TEYES distributor in my market?",
    answer:
      "Send us your country, business type, sales channel and target products. The team can then discuss whether TEYES products fit your business and market.",
  },
  {
    question: "Does TEYES support OEM / ODM projects?",
    answer:
      "Yes. TEYES can discuss OEM/ODM projects covering product platforms, branding, software, accessories and vehicle compatibility.",
  },
  {
    question: "Which TEYES model should distributors start with?",
    answer:
      "It depends on the market. CC4 Pro is positioned for premium channels, CC3 2K for mainstream demand, and X1 Pro or CC4L for entry-level channels. Compare the specifications and vehicle requirements before selecting a model.",
  },
];

export function HomeFaqSection() {
  return (
    <section className="py-20 bg-card border-y border-border/40">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-primary font-medium mb-2">Quick Answers</p>
          <h2 className="section-title">TEYES Global FAQ</h2>
          <p className="section-subtitle mt-4 mx-auto">
            Answers about TEYES products, distribution and OEM/ODM projects.
          </p>
        </div>

        <div className="max-w-4xl mx-auto divide-y divide-border/50 rounded-2xl border border-border/50 bg-background">
          {faqs.map((faq) => (
            <div key={faq.question} className="p-6 md:p-7">
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

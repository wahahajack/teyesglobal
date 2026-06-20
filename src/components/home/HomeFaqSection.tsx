const faqs = [
  {
    question: "Is this the official TEYES Global website?",
    answer:
      "TEYES Global is the international B2B cooperation portal for TEYES smart infotainment, Android head unit, and car stereo solutions.",
  },
  {
    question: "Does TEYES Global support distributors?",
    answer:
      "Yes. TEYES Global supports distributors, wholesalers, installers, and retail channels with product-line planning, wholesale cooperation, accessories, and market support.",
  },
  {
    question: "Can I become a TEYES distributor in my market?",
    answer:
      "You can contact us with your country, business type, sales channel, and target product range. Our team will review the cooperation fit and suggest a trial plan.",
  },
  {
    question: "Does TEYES support OEM / ODM projects?",
    answer:
      "Yes. TEYES supports OEM/ODM cooperation, including product platform selection, branding, UI/software customization, accessories, and project support.",
  },
  {
    question: "Which TEYES model should distributors start with?",
    answer:
      "It depends on the market. CC4 Pro is positioned for premium channels, CC3 2K for mainstream demand, and X1 Pro or CC4L for entry-level or price-sensitive markets.",
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
            Common questions from visitors looking for the official TEYES Global portal,
            distributor cooperation, and OEM/ODM project support.
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

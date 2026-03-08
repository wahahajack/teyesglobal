import fs from 'fs';
const filepath = 'public/android-car-stereo-oem-manufacturer/index.html';
let content = fs.readFileSync(filepath, 'utf8');

// The replacement logic:
content = content.replace(
    /<title>Car Stereo OEM Factory — Direct Manufacturer, Not a Trader \| TEYES<\/title>/,
    `<title>Car Stereo Factory — 50,000㎡ Manufacturer with 8 SMT Lines | TEYES</title>`
);

content = content.replace(
    /content="Direct car stereo factory with 50,000㎡ facility. ISO 9001 & IATF 16949 certified. 8 SMT lines, 2M\+ annual capacity. OEM\/ODM from proven platforms — your brand, our factory."/,
    `content="Car stereo manufacturer with 50,000㎡ factory, 8 automated SMT lines, 2M+ annual capacity. ISO 9001 & IATF 16949 certified. Direct from the factory — not a trader."`
);

content = content.replace(
    /<a href="#contact" class="top-cta">Get Factory-Direct Quote<\/a>/g,
    `<a href="#contact" class="top-cta">Contact the Factory</a>`
);

content = content.replace(
    /<!-- ═══════════════════════════════════════════════════════════\s*SECTION 1: HERO — "We Are the Factory"\s*═══════════════════════════════════════════════════════════ -->\s*<section id="hero" class="hero section">\s*<div class="container hero-grid">\s*<div>\s*<span class="pill">Direct from Factory — No Middlemen<\/span>\s*<p class="hero-from">From <strong>Concept to Mass Production<\/strong> — Your Brand, Our Factory<\/p>\s*<h1>Your Car Stereo — Built in Our Factory<\/h1>\s*<p class="hero-sub">50,000㎡ facility · ISO & IATF certified · 8 SMT auto lines · 2M\+ annual\s*capacity. We don't source — we manufacture.<\/p>\s*<div class="hero-actions">\s*<a id="hero-pricing-cta" href="#contact" class="btn btn-primary">Get Factory-Direct OEM\s*Quote<\/a>\s*<\/div>\s*<\/div>\s*<article class="hero-card">\s*<div class="hero-media">\s*<img src="\.\/images\/oem-factory-hero-960\.png"\s*alt="TEYES car stereo manufacturing facility — automated production line" loading="eager"\s*fetchpriority="high" decoding="async" \/>\s*<\/div>\s*<div class="chips">\s*<span>50,000㎡ Factory<\/span><span>8 SMT Auto Lines<\/span><span>ISO 9001 & IATF\s*16949<\/span><span>15\+ Years Manufacturing<\/span>\s*<\/div>\s*<\/article>\s*<\/div>\s*<\/section>/m,
    `<!-- ═══════════════════════════════════════════════════════════\n         SECTION 1: HERO — Manufacturing Power\n         ═══════════════════════════════════════════════════════════ -->\n        <section id="hero" class="hero section">\n            <div class="container hero-grid">\n                <div>\n                    <span class="pill">Real Factory — Not a Trading Company</span>\n                    <p class="hero-from">Established <strong>2008</strong> · Shenzhen, China · <strong>50,000㎡</strong> Manufacturing Base</p>\n                    <h1>Car Stereo Factory — We Manufacture, Not Re-sell</h1>\n                    <p class="hero-sub">8 automated SMT lines · 500+ skilled workers · 2,000,000+ units annual capacity · ISO 9001 & IATF 16949 certified. See our production lines, verify our certifications, visit our facility.</p>\n                    <div class="hero-actions">\n                        <a id="hero-pricing-cta" href="#contact" class="btn btn-primary">Get Factory Quote</a>\n                        <a href="#factory" class="btn btn-outline">Tour the Factory ↓</a>\n                    </div>\n                </div>\n                <article class="hero-card">\n                    <div class="hero-media">\n                        <img src="./images/oem-factory-hero-960.png"\n                            alt="TEYES car stereo manufacturing facility — 50,000㎡ factory with automated SMT production lines" loading="eager"\n                            fetchpriority="high" decoding="async" />\n                    </div>\n                    <div class="chips">\n                        <span>50,000㎡ Factory</span><span>8 SMT Auto Lines</span><span>ISO 9001 & IATF 16949</span><span>2M+ Annual Capacity</span><span>15+ Years Manufacturing</span>\n                    </div>\n                </article>\n            </div>\n        </section>`
);

content = content.replace(
    /<!-- ═══════════════════════════════════════════════════════════\s*SECTION 5: OEM CASE STUDIES\s*═══════════════════════════════════════════════════════════ -->\s*<section class="section" id="cases">\s*<div class="container">\s*<h2 class="center">From Brief to Branded Product<\/h2>\s*<p class="center comparison-sub">Real OEM projects delivered — from custom branding to full hardware\s*design.<\/p>/m,
    `<!-- ═══════════════════════════════════════════════════════════\n         SECTION 5: OEM/ODM CAPABILITY — Deeper Detail\n         ═══════════════════════════════════════════════════════════ -->\n        <section class="section" id="cases">\n            <div class="container">\n                <h2 class="center">OEM & ODM — Your Brand, Built in Our Factory</h2>\n                <p class="center comparison-sub">Already verified our manufacturing? Here's how we turn your concept into a finished, branded product — from logo swap to ground-up hardware design.</p>`
);

content = content.replace(
    /<h2 class="center">Get Your Factory-Direct OEM Quote<\/h2>/,
    `<h2 class="center">Get Your Factory-Direct Quote</h2>`
);

content = content.replace(
    /<label>Project Type <span class="required-star" aria-hidden="true">\*<\/span>\s*<select name="estimated_quantity" required>\s*<option value="">Select type<\/option>\s*<option>OEM — Custom Branding \(500\+ units\)<\/option>\s*<option>ODM — Software Customization<\/option>\s*<option>Full Custom Hardware \(3000\+ units\)<\/option>\s*<option>Just Exploring Options<\/option>\s*<\/select>\s*<\/label>\s*<label class="full">Message<input name="message"\s*placeholder="Tell us about your project, target market, and volume" \/><\/label>/m,
    `<label>I'm Looking For <span class="required-star" aria-hidden="true">*</span>\n                            <select name="estimated_quantity" required>\n                                <option value="">Select your interest</option>\n                                <option>Factory-direct sourcing (existing models)</option>\n                                <option>OEM — Custom Branding (500+ units)</option>\n                                <option>ODM — Software Customization</option>\n                                <option>Full Custom Hardware (3000+ units)</option>\n                                <option>Just Exploring Options</option>\n                            </select>\n                        </label>\n                        <label class="full">Message<input name="message"\n                                placeholder="Tell us about your needs, target market, and expected volume" /></label>`
);

content = content.replace(
    /<button type="submit" id="form-btn" class="btn btn-primary submit-btn">Get Factory-Direct OEM\s*Quote<\/button>/m,
    `<button type="submit" id="form-btn" class="btn btn-primary submit-btn">Get Factory-Direct Quote</button>`
);

content = content.replace(
    /<a href="https:\/\/wa.me\/8618594023375\?text=Hi%2C%20I%27m%20interested%20in%20OEM%20car%20stereo%20manufacturing"\s*target="_blank" rel="noopener noreferrer" class="wa">WhatsApp<\/a>\s*<a href="#contact" class="primary">Get OEM Quote<\/a>/m,
    `<a href="https://wa.me/8618594023375?text=Hi%2C%20I%27m%20looking%20for%20a%20reliable%20manufacturer."\n            target="_blank" rel="noopener noreferrer" class="wa">WhatsApp</a>\n        <a href="#contact" class="primary">Get Factory Quote</a>`
);

// FIX IMG PATHS Globally
content = content.replace(/"\.\/images\//g, '"/android-car-stereo-oem-manufacturer/images/');

fs.writeFileSync(filepath, content, 'utf8');
console.log("Reapplied all edits successfully!");

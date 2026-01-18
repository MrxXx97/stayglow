import { chromium } from "playwright";

async function exploreBoostsbnb() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    console.log("🌐 Navigating to https://boostsbnb.com/...");
    await page.goto("https://boostsbnb.com/", { waitUntil: "networkidle" });

    // Wait for page to load
    await page.waitForTimeout(2000);

    // Extract key information
    console.log("\n📋 Extracting information...\n");

    // Get page title
    const title = await page.title();
    console.log(`Title: ${title}`);

    // Get main heading
    const mainHeading = await page.locator("h1").first().textContent();
    console.log(`Main Heading: ${mainHeading}`);

    // Get all headings
    const headings = await page.locator("h1, h2, h3").allTextContents();
    console.log("\n📝 Headings found:");
    headings.forEach((h, i) => console.log(`  ${i + 1}. ${h}`));

    // Get feature sections
    const features = await page
      .locator('[class*="feature"], [class*="benefit"]')
      .allTextContents();
    if (features.length > 0) {
      console.log("\n✨ Features/Benefits:");
      features
        .slice(0, 10)
        .forEach((f, i) => console.log(`  ${i + 1}. ${f.trim()}`));
    }

    // Get statistics/numbers
    const stats = await page
      .locator("text=/\\d+%/i, text=/\\d+% faster/i, text=/\\d+% increased/i")
      .allTextContents();
    if (stats.length > 0) {
      console.log("\n📊 Statistics:");
      stats.forEach((s, i) => console.log(`  ${i + 1}. ${s.trim()}`));
    }

    // Get pricing information
    const pricingElements = await page
      .locator("text=/pricing/i, text=/price/i, text=/\\$/i")
      .allTextContents();
    if (pricingElements.length > 0) {
      console.log("\n💰 Pricing mentions:");
      pricingElements
        .slice(0, 5)
        .forEach((p, i) => console.log(`  ${i + 1}. ${p.trim()}`));
    }

    // Get navigation links
    const navLinks = await page.locator("nav a, header a").allTextContents();
    if (navLinks.length > 0) {
      console.log("\n🔗 Navigation links:");
      [...new Set(navLinks)].forEach((link, i) =>
        console.log(`  ${i + 1}. ${link.trim()}`)
      );
    }

    // Get all buttons and CTAs
    const buttons = await page
      .locator("button, [class*='button'], [class*='cta'], a[class*='button']")
      .allTextContents();
    if (buttons.length > 0) {
      console.log("\n🔘 Call-to-Action buttons:");
      [...new Set(buttons)]
        .slice(0, 10)
        .forEach((btn, i) => console.log(`  ${i + 1}. ${btn.trim()}`));
    }

    // Get FAQ questions
    const faqQuestions = await page
      .locator('[class*="faq"], [class*="question"]')
      .allTextContents();
    if (faqQuestions.length > 0) {
      console.log("\n❓ FAQ Questions:");
      faqQuestions
        .slice(0, 10)
        .forEach((q, i) => console.log(`  ${i + 1}. ${q.trim()}`));
    }

    // Get customer testimonials
    const testimonials = await page
      .locator('[class*="testimonial"], [class*="review"], [class*="customer"]')
      .allTextContents();
    if (testimonials.length > 0) {
      console.log("\n💬 Testimonials/Reviews:");
      testimonials
        .slice(0, 5)
        .forEach((t, i) =>
          console.log(`  ${i + 1}. ${t.trim().substring(0, 100)}...`)
        );
    }

    // Get meta description
    const metaDescription = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    if (metaDescription) {
      console.log(`\n📄 Meta Description: ${metaDescription}`);
    }

    // Take a screenshot
    await page.screenshot({ path: "boostsbnb-screenshot.png", fullPage: true });
    console.log("\n📸 Screenshot saved as boostsbnb-screenshot.png");

    // Get page source length to understand complexity
    const pageContent = await page.content();
    console.log(`\n📏 Page size: ${(pageContent.length / 1024).toFixed(2)} KB`);

    // Check for specific technologies
    const scripts = await page.locator("script[src]").count();
    console.log(`\n🔧 External scripts: ${scripts}`);

    // Look for specific keywords
    const bodyText = (await page.locator("body").textContent()) || "";
    const keywords = [
      "AI",
      "photo",
      "enhancement",
      "Airbnb",
      "property",
      "real estate",
    ];
    console.log("\n🔍 Keyword mentions:");
    keywords.forEach((keyword) => {
      const count = (bodyText.match(new RegExp(keyword, "gi")) || []).length;
      console.log(`  ${keyword}: ${count} times`);
    });

    console.log("\n✅ Exploration complete!");
  } catch (error) {
    console.error("❌ Error exploring website:", error);
  } finally {
    await browser.close();
  }
}

exploreBoostsbnb();

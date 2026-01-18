import { chromium } from "playwright";

async function detailedAnalysis() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log("🔍 Starting detailed analysis of Boostbnb...\n");
    await page.goto("https://boostsbnb.com/", { waitUntil: "networkidle" });
    await page.waitForTimeout(3000);

    // Extract detailed information
    const analysis: Record<string, unknown> = {
      platform: {},
      features: [],
      pricing: {},
      statistics: {},
      technology: {},
      content: {},
    };

    // Platform Information
    analysis.platform = {
      name: await page.title(),
      url: page.url(),
      mainTagline: await page.locator("h1").first().textContent(),
    };

    // Extract all text content for analysis
    const bodyText = (await page.locator("body").textContent()) || "";

    // Statistics extraction
    const statMatches = bodyText.match(/\d+%/g) || [];
    analysis.statistics = {
      percentages: [...new Set(statMatches)],
      mentions: {
        "32% faster booking": bodyText.match(/32%|32 percent/gi)?.length || 0,
        "25% increased rates": bodyText.match(/25%|25 percent/gi)?.length || 0,
        "40% boost": bodyText.match(/40%|40 percent/gi)?.length || 0,
      },
    };

    // Features extraction
    const featureSections = await page
      .locator('[class*="feature"]')
      .allTextContents();
    analysis.features = featureSections
      .map((f) => f.trim())
      .filter((f) => f.length > 0 && f.length < 200);

    // Look for pricing page or pricing mentions
    const pricingLink = await page
      .locator('a[href*="pricing"], a:has-text("Pricing")')
      .first();
    if ((await pricingLink.count()) > 0) {
      const pricingHref = await pricingLink.getAttribute("href");
      console.log(`\n💰 Found pricing link: ${pricingHref}`);

      // Try to navigate to pricing if it's a relative link
      if (pricingHref && !pricingHref.startsWith("http")) {
        try {
          await page.goto(new URL(pricingHref, page.url()).toString(), {
            waitUntil: "networkidle",
          });
          await page.waitForTimeout(2000);
          const pricingContent =
            (await page.locator("body").textContent()) || "";
          analysis.pricing = {
            pageExists: true,
            content: pricingContent.substring(0, 500),
          };
        } catch {
          console.log("Could not access pricing page");
        }
      }
    }

    // Check for specific AI features mentioned
    const aiFeatures = [
      "Sky Replacement",
      "Brighten Dark Photos",
      "Enhance Color Vibrancy",
      "Upscale Images",
      "Perfect Lighting",
      "Smart Corrections",
      "Batch Processing",
    ];

    analysis.content.aiFeatures = aiFeatures.filter((feature) =>
      bodyText.toLowerCase().includes(feature.toLowerCase())
    );

    // Check for customer testimonials
    const testimonialNames = await page
      .locator('[class*="testimonial"], [class*="customer"], [class*="review"]')
      .allTextContents();
    analysis.content.testimonials = testimonialNames
      .filter((t) => t.trim().length > 10)
      .slice(0, 10);

    // Technology stack detection
    const scripts = await page.locator("script").all();
    const scriptSources: string[] = [];
    for (const script of scripts) {
      const src = await script.getAttribute("src");
      if (src) scriptSources.push(src);
    }

    analysis.technology = {
      externalScripts: scriptSources.length,
      scriptSources: scriptSources.slice(0, 10),
      pageSize: (await page.content()).length,
    };

    // Check for specific services/APIs
    const apiIndicators = [
      "api",
      "stripe",
      "paypal",
      "analytics",
      "google",
      "facebook",
      "pixel",
    ];
    analysis.technology.apiUsage = apiIndicators.filter((indicator) =>
      bodyText.toLowerCase().includes(indicator)
    );

    // Output comprehensive analysis
    console.log("\n" + "=".repeat(60));
    console.log("📊 COMPREHENSIVE ANALYSIS OF BOOSTBNB");
    console.log("=".repeat(60) + "\n");

    console.log("🏢 PLATFORM INFORMATION:");
    console.log(JSON.stringify(analysis.platform, null, 2));

    console.log("\n📈 STATISTICS & METRICS:");
    console.log(JSON.stringify(analysis.statistics, null, 2));

    console.log("\n✨ AI FEATURES DETECTED:");
    analysis.content.aiFeatures.forEach((feature: string, i: number) => {
      console.log(`  ${i + 1}. ${feature}`);
    });

    console.log("\n💬 TESTIMONIALS/CUSTOMER CONTENT:");
    analysis.content.testimonials.slice(0, 5).forEach((t, i) => {
      console.log(`  ${i + 1}. ${t.substring(0, 100)}...`);
    });

    console.log("\n🔧 TECHNOLOGY STACK:");
    console.log(`  - External Scripts: ${analysis.technology.externalScripts}`);
    console.log(
      `  - Page Size: ${(analysis.technology.pageSize / 1024).toFixed(2)} KB`
    );
    console.log(
      `  - API Indicators: ${analysis.technology.apiUsage.join(", ")}`
    );

    if (analysis.pricing.pageExists) {
      console.log("\n💰 PRICING INFORMATION:");
      console.log(`  - Pricing page accessible: Yes`);
      console.log(
        `  - Content preview: ${analysis.pricing.content?.substring(0, 200)}...`
      );
    }

    // Save detailed report
    const fs = await import("fs/promises");
    await fs.writeFile(
      "boostsbnb-analysis.json",
      JSON.stringify(analysis, null, 2)
    );
    console.log("\n💾 Detailed analysis saved to boostsbnb-analysis.json");

    return analysis;
  } catch (error) {
    console.error("❌ Error during analysis:", error);
    throw error;
  } finally {
    await browser.close();
  }
}

detailedAnalysis();

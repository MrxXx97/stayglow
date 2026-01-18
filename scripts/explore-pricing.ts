import { chromium } from "playwright";

async function explorePricing() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log("💰 Exploring Boostbnb Pricing Page...\n");

    // Go to pricing page
    await page.goto("https://boostsbnb.com/pricing", {
      waitUntil: "networkidle",
    });
    await page.waitForTimeout(3000);

    // Extract pricing information
    const pricingInfo: Record<string, unknown> = {};

    // Get all text content
    const bodyText = (await page.locator("body").textContent()) || "";

    // Look for price mentions
    const priceMatches =
      bodyText.match(/\$\d+|\d+\s*USD|\d+\s*per|\d+\s*month/i) || [];
    pricingInfo.priceMentions = [...new Set(priceMatches)];

    // Get all headings
    const headings = await page.locator("h1, h2, h3, h4").allTextContents();
    pricingInfo.headings = headings.filter((h) => h.trim().length > 0);

    // Get pricing tiers/plans
    const planElements = await page
      .locator('[class*="plan"], [class*="tier"], [class*="pricing"]')
      .allTextContents();
    pricingInfo.plans = planElements.filter((p) => p.trim().length > 10);

    // Look for specific pricing keywords
    const pricingKeywords = [
      "free",
      "trial",
      "credit",
      "per photo",
      "unlimited",
      "subscription",
    ];
    pricingInfo.keywords = {};
    pricingKeywords.forEach((keyword) => {
      const matches = bodyText.match(new RegExp(keyword, "gi"));
      pricingInfo.keywords[keyword] = matches ? matches.length : 0;
    });

    // Get buttons/CTAs on pricing page
    const buttons = await page
      .locator("button, a[class*='button']")
      .allTextContents();
    pricingInfo.ctas = [...new Set(buttons)].filter((b) => b.trim().length > 0);

    console.log("📋 PRICING PAGE ANALYSIS:");
    console.log(JSON.stringify(pricingInfo, null, 2));

    // Take screenshot
    await page.screenshot({ path: "boostsbnb-pricing.png", fullPage: true });
    console.log("\n📸 Pricing page screenshot saved");

    return pricingInfo;
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  } finally {
    await browser.close();
  }
}

explorePricing();

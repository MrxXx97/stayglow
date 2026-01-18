import { chromium } from "playwright";

async function analyzeColors() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log("🎨 Analyzing Amantius color scheme...\n");
    await page.goto("https://amantius-platforma.vercel.app/", {
      waitUntil: "networkidle",
    });
    await page.waitForTimeout(3000);

    // Extract color information from CSS
    const colors: Record<string, { bg: string; text: string }> = {};

    // Get computed styles from key elements
    const elements = [
      { selector: "body", name: "background" },
      { selector: "h1, h2", name: "headings" },
      { selector: "a", name: "links" },
      { selector: "button", name: "buttons" },
      { selector: "[class*='primary']", name: "primary" },
      { selector: "[class*='accent']", name: "accent" },
    ];

    for (const elem of elements) {
      try {
        const element = await page.locator(elem.selector).first();
        if ((await element.count()) > 0) {
          const bgColor = await element.evaluate(
            (el) => window.getComputedStyle(el).backgroundColor
          );
          const textColor = await element.evaluate(
            (el) => window.getComputedStyle(el).color
          );
          colors[elem.name] = { bg: bgColor, text: textColor };
        }
      } catch (e) {
        // Skip if element not found
      }
    }

    // Get all CSS rules
    const cssRules = await page.evaluate(() => {
      const rules: Array<{
        selector: string;
        backgroundColor: string;
        color: string;
        borderColor: string;
      }> = [];
      for (const sheet of Array.from(document.styleSheets)) {
        try {
          for (const rule of Array.from(sheet.cssRules)) {
            if (rule instanceof CSSStyleRule) {
              const style = rule.style;
              const bgColor = style.backgroundColor;
              const color = style.color;
              const borderColor = style.borderColor;
              if (bgColor || color || borderColor) {
                rules.push({
                  selector: rule.selectorText,
                  backgroundColor: bgColor,
                  color: color,
                  borderColor: borderColor,
                });
              }
            }
          }
        } catch {
          // Cross-origin stylesheets
        }
      }
      return rules;
    });

    // Extract common colors
    const colorFrequency: Record<string, number> = {};
    cssRules.forEach((rule) => {
      [rule.backgroundColor, rule.color, rule.borderColor].forEach((color) => {
        if (color && color !== "rgba(0, 0, 0, 0)" && color !== "transparent") {
          colorFrequency[color] = (colorFrequency[color] || 0) + 1;
        }
      });
    });

    // Get page screenshot for visual analysis
    await page.screenshot({ path: "amantius-screenshot.png", fullPage: true });

    // Get specific color values from common classes
    const primaryButton = await page
      .locator("button, [class*='button'], a[class*='button']")
      .first();
    let buttonColors = {};
    if ((await primaryButton.count()) > 0) {
      buttonColors = {
        background: await primaryButton.evaluate(
          (el) => window.getComputedStyle(el).backgroundColor
        ),
        color: await primaryButton.evaluate(
          (el) => window.getComputedStyle(el).color
        ),
      };
    }

    console.log("📊 COLOR ANALYSIS:");
    console.log("=".repeat(60));
    console.log("\n🎨 Button Colors:");
    console.log(JSON.stringify(buttonColors, null, 2));

    console.log("\n🎨 Most Common Colors:");
    const sortedColors = Object.entries(colorFrequency)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 20);
    sortedColors.forEach(([color, count]) => {
      console.log(`  ${color}: ${count} occurrences`);
    });

    // Save analysis
    const fs = await import("fs/promises");
    await fs.writeFile(
      "amantius-colors.json",
      JSON.stringify(
        {
          buttonColors,
          topColors: sortedColors,
          elementColors: colors,
        },
        null,
        2
      )
    );

    console.log("\n💾 Analysis saved to amantius-colors.json");
    console.log("📸 Screenshot saved to amantius-screenshot.png");

    return { buttonColors, topColors: sortedColors, elementColors: colors };
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  } finally {
    await browser.close();
  }
}

analyzeColors();

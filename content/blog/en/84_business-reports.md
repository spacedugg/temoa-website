---
title: "Amazon Business Reports: diagnose a sales decline"
meta_description: "Connect sessions, Unit Session Percentage and revenue per unit to diagnose Amazon sales changes, with a worked example and practical decision process."
keywords: ["Amazon Business Reports", "Unit Session Percentage", "Amazon sales analysis"]
kategorie: "Strategie & Geschäftsmodelle"
---

# Amazon Business Reports: diagnose a sales decline

Amazon Business Reports help established brands understand how sales change. “Revenue is down 20%” is an observation, not a diagnosis. Separate traffic, ordered units per session and revenue per unit before deciding whether to change advertising, content or the offer.

## Establish a comparable baseline

Use equal periods with comparable weekdays, the same marketplace and the same ASIN level. Parent-level totals can hide shifts between variants. Record promotions, prices, delivery changes, stockouts and major content updates. Ordered revenue, shipped revenue and cash disbursements are different measures.

## Decompose ordered revenue

For a consistent dataset, the arithmetic identity is:

**Sessions × ordered units per session × ordered revenue per unit**

Unit Session Percentage is units ordered divided by sessions, expressed as a percentage. It is not necessarily the percentage of unique shoppers who purchased: one order can include multiple units. Revenue per unit is not profit per unit. Use unrounded values where rounding differences matter.

<aside class="article-example">
<p class="example-label">Illustrative model · not client results</p>
<h3>The same traffic, 20% less revenue</h3>
<p>Period A: 10,000 sessions × 12% units per session × €30 revenue per unit = €36,000.</p>
<p>Period B: 10,000 sessions × 10% units per session × €28.80 revenue per unit = €28,800.</p>
<p>Traffic did not fall. Lower units per session and lower revenue per unit explain the arithmetic change. They do not, by themselves, establish its cause.</p>
</aside>

Increasing sessions by 25% in period B would mathematically restore revenue to €36,000. But you would need to finance additional traffic while the weaker operating metrics remain. Restored revenue could therefore come with worse economics.

## Match the investigation to the finding

**Sessions down, units per session stable:** Investigate demand, visibility, ad delivery and availability. [Search Query Performance](/en/blog/search-query-performance) can help separate a smaller query market from a weaker position within it.

**Sessions stable, units per session down:** Check Featured Offer, delivery promise, price, variants and product issues. A change in advertising can also bring less suitable traffic. Review the offer before redesigning content.

**Revenue per unit down:** Check discounts, quantity offers and product mix. The average can fall without any individual SKU price changing.

**Revenue up, contribution down:** Add product costs, fees, returns and advertising. Business Reports alone cannot reveal the complete margin picture.

## Use ad reports alongside the product report

Ad-attributed revenue follows its own attribution rules, windows and product scope. Do not expect automatic one-to-one reconciliation with Business Reports or call their difference “organic sales” without checking definitions.

Use the ad report to investigate CPC, search terms, placements and attributed purchases. Use Business Reports to investigate the product business. Look for a hypothesis that fits both views and operational observations.

## A weekly decision process

1. Rank changes by absolute revenue or contribution impact.
2. Identify the child variants responsible and confirm they were available.
3. Decompose the change into sessions, units per session and revenue per unit.
4. Write a specific, testable hypothesis.
5. Assign an owner, action and evaluation date.

Keep an implementation log. Twenty simultaneous changes make later explanations difficult. A useful report ends with an accountable decision and follow-up.

Our [analytics and reporting service](/en/leistungen/analytics-reporting) connects that decision with [content](/en/leistungen/listing-seo), [advertising](/en/leistungen/ppc-advertising) or [inventory management](/en/leistungen/fba-inventory-management). Existing [case studies](/en/ergebnisse) are separate from the illustrative figures in this guide.

## Source and review date

[Amazon SP-API: Analytics Reports, including the Sales and Traffic Business Report](https://developer-docs.amazon/sp-api/docs/report-type-values-analytics). Reviewed on 17 October 2026. Calculations and workflow are original explanatory models.

/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-resources block
 * 
 * Source: https://odmhsas.webflow.io/resources
 * Base Block: hero
 * 
 * Block Structure (from markdown example):
 * - Row 1: Background image (optional)
 * - Row 2: Content (heading + description)
 * 
 * Source HTML Pattern (from captured DOM):
 * <div class="hero-wrapper is-resources">
 *   <div class="hero-title">
 *     <h1 class="heading-xxlarge is-resources">Resources</h1>
 *   </div>
 *   <div class="hero-body is-resources">
 *     <p class="text-size-medium">Description text...</p>
 *   </div>
 * </div>
 * 
 * Generated: 2026-01-28
 */
export default function parse(element, { document }) {
  // Extract content from source HTML
  // Selectors validated against captured DOM from migration workflow
  
  // Heading - Found in captured DOM: <h1 class="heading-xxlarge is-resources">
  const heading = element.querySelector('.heading-xxlarge') ||
                  element.querySelector('h1') ||
                  element.querySelector('[class*="hero-title"] h1, [class*="hero-title"] h2');
  
  // Description - Found in captured DOM: <p class="text-size-medium"> within .hero-body
  const description = element.querySelector('.hero-body .text-size-medium') ||
                      element.querySelector('.hero-body p') ||
                      element.querySelector('p');
  
  // Background image - Look for hero background image
  // In this site, background is handled via CSS, but check for img elements
  const bgImage = element.querySelector('.hero-bg-wrapper img') ||
                  element.querySelector('img[class*="hero-bg"]');
  
  // Build cells array matching markdown example structure
  const cells = [];
  
  // Row 1: Background image (optional - only add if present)
  if (bgImage) {
    cells.push([bgImage]);
  }
  
  // Row 2: Content (single column containing heading + description)
  const contentCell = [];
  if (heading) contentCell.push(heading.cloneNode(true));
  if (description) contentCell.push(description.cloneNode(true));
  
  if (contentCell.length > 0) {
    cells.push(contentCell);
  }
  
  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero-Resources', cells });
  
  // Replace original element with structured block table
  element.replaceWith(block);
}

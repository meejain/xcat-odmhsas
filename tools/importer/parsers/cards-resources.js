/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-resources block
 * 
 * Source: https://odmhsas.webflow.io/resources
 * Base Block: cards
 * 
 * Block Structure (from markdown example):
 * - Each row = one card
 * - Column 1: Image
 * - Column 2: Title (bold), subtitle, description, CTA link
 * 
 * Source HTML Pattern (from captured DOM):
 * <div class="resource--card w-dyn-item">
 *   <div class="rc--cover"><img src="..."></div>
 *   <div class="rc--body">
 *     <div class="rc--body-header">
 *       <h2 class="heading-regular">Title</h2>
 *       <div class="text-weight-semibold">Subtitle</div>
 *     </div>
 *     <p class="text-size-small">Description...</p>
 *   </div>
 *   <div class="rc--footer">
 *     <a class="button-secondary is-arrow">CTA Text</a>
 *   </div>
 * </div>
 * 
 * Generated: 2026-01-28
 */
export default function parse(element, { document }) {
  // Find all resource cards within this grid
  // Selector validated against captured DOM: <div class="resource--card w-dyn-item">
  const cards = element.querySelectorAll('.resource--card') ||
                element.querySelectorAll('.w-dyn-item');
  
  // Build cells array - one row per card, 2 columns each
  const cells = [];
  
  cards.forEach(card => {
    // Extract image - Found in captured DOM: .rc--cover img
    const image = card.querySelector('.rc--cover img') ||
                  card.querySelector('img');
    
    // Extract title - Found in captured DOM: h2.heading-regular
    const title = card.querySelector('.heading-regular') ||
                  card.querySelector('h2') ||
                  card.querySelector('[class*="body-header"] h2');
    
    // Extract subtitle - Found in captured DOM: .text-weight-semibold
    const subtitle = card.querySelector('.text-weight-semibold') ||
                     card.querySelector('.rc--body-header > div:not(:first-child)');
    
    // Extract description - Found in captured DOM: p.text-size-small
    const description = card.querySelector('p.text-size-small') ||
                        card.querySelector('.rc--body > p');
    
    // Extract CTA link - Found in captured DOM: a.button-secondary.is-arrow
    const cta = card.querySelector('a.button-secondary') ||
                card.querySelector('.rc--footer a') ||
                card.querySelector('a[class*="button"]');
    
    // Build row with 2 columns
    // Column 1: Image
    const col1 = [];
    if (image) {
      col1.push(image.cloneNode(true));
    }
    
    // Column 2: Title (bold), subtitle, description, CTA
    const col2 = [];
    
    if (title) {
      // Make title bold
      const strongTitle = document.createElement('strong');
      strongTitle.textContent = title.textContent.trim();
      col2.push(strongTitle);
    }
    
    if (subtitle) {
      // Add line break and subtitle text
      const subtitleText = document.createTextNode(subtitle.textContent.trim());
      col2.push(document.createElement('br'));
      col2.push(subtitleText);
    }
    
    if (description) {
      // Add description paragraph
      col2.push(document.createElement('br'));
      col2.push(document.createTextNode(description.textContent.trim()));
    }
    
    if (cta) {
      // Add CTA link
      col2.push(document.createElement('br'));
      const link = document.createElement('a');
      link.href = cta.href;
      link.textContent = cta.textContent.trim();
      col2.push(link);
    }
    
    // Add row to cells array
    if (col1.length > 0 || col2.length > 0) {
      cells.push([col1, col2]);
    }
  });
  
  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards-Resources', cells });
  
  // Replace original element with structured block table
  element.replaceWith(block);
}

/* eslint-disable */
/* global WebImporter */

/**
 * Transformer for ODMHSAS website cleanup
 * Purpose: Remove non-content elements and fix HTML issues
 * Applies to: odmhsas.webflow.io (all templates)
 * Generated: 2026-01-28
 * 
 * SELECTORS EXTRACTED FROM:
 * - Captured DOM during migration workflow
 * - cleaned.html from page scraping phase
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform'
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove loader overlay - Found in captured DOM: <div class="loader">
    WebImporter.DOMUtils.remove(element, ['.loader']);
    
    // Remove navigation - Found in captured DOM: <div class="navbar w-nav">
    WebImporter.DOMUtils.remove(element, [
      '.navbar.w-nav',
      '.w-nav-overlay'
    ]);
    
    // Remove footer elements - Found in captured DOM: <div class="section--footer">
    WebImporter.DOMUtils.remove(element, [
      '.section--footer',
      '.pre-footer'
    ]);
    
    // Remove Webflow badge - Found in captured DOM: <a class="w-webflow-badge">
    WebImporter.DOMUtils.remove(element, ['.w-webflow-badge']);
    
    // Remove tracking iframes - Found in captured DOM: universal_pixel iframes
    WebImporter.DOMUtils.remove(element, ['iframe']);
    
    // Remove decorative elements that aren't content
    // Found in captured DOM: hero-asterisk, hero-outline-word, hero-slanted-divider
    WebImporter.DOMUtils.remove(element, [
      '.hero-asterisk-wrapper',
      '.hero-outline-word',
      '.hero-slanted-divider',
      '.hero--split',
      '.hero-bg-wrapper',
      '.hero-socials',
      '.section-17-bg'
    ]);
    
    // Remove category pills from cards - Found in captured DOM: <div class="category-pill">
    WebImporter.DOMUtils.remove(element, ['.category-pill']);
    
    // Remove duplicate title overlays on card images
    // Found in captured DOM: <div class="rc--cover"><img>...<div>Title</div></div>
    const coverDivs = element.querySelectorAll('.rc--cover > div:not(:first-child)');
    coverDivs.forEach(div => div.remove());
  }
  
  if (hookName === TransformHook.afterTransform) {
    // Clean up tracking attributes
    // Found in captured DOM: various data-* attributes
    const allElements = element.querySelectorAll('*');
    allElements.forEach(el => {
      el.removeAttribute('data-wf-page');
      el.removeAttribute('data-wf-site');
      el.removeAttribute('data-w-id');
    });
    
    // Remove remaining unwanted elements
    // Standard HTML elements - safe to use
    WebImporter.DOMUtils.remove(element, [
      'noscript',
      'link'
    ]);
  }
}

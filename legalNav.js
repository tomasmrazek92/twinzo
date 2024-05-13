// Select the container holding the anchor links
const anchorsContainer = document.querySelector('.legal_sidebar-links');

// Collect all the anchor links
const anchorLinks = Array.from(anchorsContainer.querySelectorAll('a'));

// Function to get the index of the anchor link that's closest to the top of the viewport
function getCurrentSectionIndex() {
  let minDistance = Infinity;
  let closestIndex = 0;

  anchorLinks.forEach((link, index) => {
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    const distanceFromTop = Math.abs(targetElement.getBoundingClientRect().top);

    if (distanceFromTop < minDistance) {
      minDistance = distanceFromTop;
      closestIndex = index;
    }
  });

  return closestIndex;
}

// Function to update the position of the current anchor link in view
function updateCurrentAnchorInView() {
  const currentSectionIndex = getCurrentSectionIndex();
  const currentAnchor = anchorLinks[currentSectionIndex];
  const anchorOffsetLeft = currentAnchor.offsetLeft;
  const containerScrollLeft = anchorsContainer.scrollLeft;
  const containerWidth = anchorsContainer.clientWidth;
  const anchorWidth = currentAnchor.clientWidth;

  if (
    anchorOffsetLeft < containerScrollLeft ||
    anchorOffsetLeft + anchorWidth > containerScrollLeft + containerWidth
  ) {
    anchorsContainer.scrollTo({
      left: anchorOffsetLeft - containerWidth / 2 + anchorWidth / 2,
      behavior: 'smooth',
    });
  }
}

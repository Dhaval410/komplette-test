document.addEventListener('DOMContentLoaded', () => {
    const mobileAddToMenuDivs = document.querySelectorAll('.mobile-add-to-menu');
    const menuDrawer = document.querySelector('.menu-drawer__navigation');
    const isMobileOrTablet = () => window.innerWidth <= 990;
    const updateMenuForMobile = () => {
      if (isMobileOrTablet()) {
        mobileAddToMenuDivs.forEach((mobileAddToMenu, index) => {
          mobileAddToMenu.style.display = 'none';
          const uspTextElements = mobileAddToMenu.querySelectorAll('.header-usp__text');
          uspTextElements.forEach((uspTextElement, childIndex) => {
            const uniqueId = `usp-text-${index}-${childIndex}`;
            if (!menuDrawer.querySelector(`[data-unique-id="${uniqueId}"]`)) {
              const uspTextClone = uspTextElement.cloneNode(true);
              uspTextClone.setAttribute('data-unique-id', uniqueId);
              menuDrawer.appendChild(uspTextClone);
            }
          });
        });
      } else {
        mobileAddToMenuDivs.forEach((mobileAddToMenu, index) => {
          mobileAddToMenu.style.display = '';
          const uspTextElements = mobileAddToMenu.querySelectorAll('.header-usp__text');
          uspTextElements.forEach((_, childIndex) => {
            const uniqueId = `usp-text-${index}-${childIndex}`;
            const addedUspText = menuDrawer.querySelector(`[data-unique-id="${uniqueId}"]`);
            if (addedUspText) {
              menuDrawer.removeChild(addedUspText);
            }
          });
        });
      }
    };

    updateMenuForMobile();
    window.addEventListener('resize', updateMenuForMobile);
  });

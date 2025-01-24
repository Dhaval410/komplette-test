class ModalOpenerExtended extends ModalOpener {
  constructor() {
    super();
    const button = this.querySelector('button');

    if (!button) return;
    button.addEventListener('click', () => {
      const modal = document.querySelector(this.getAttribute('data-modal'));
      if (modal) modal.show(button);
    });
  }
}

customElements.define("modal-opener-extend", ModalOpenerExtended);

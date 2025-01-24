class ModalDialogExtended extends ModalDialog {
  constructor() {
    super();
    this.setupCloseButtons();

    this.addEventListener('keyup', (event) => {
      if (event.code.toUpperCase() === 'ESCAPE') this.hide();
    });

    if (this.classList.contains('media-modal')) {
      this.addEventListener('pointerup', (event) => {
        if (event.pointerType === 'mouse' && !event.target.closest('deferred-media, product-model')) this.hide();
      });
    } else {
      this.addEventListener('click', (event) => {
        if (event.target === this) this.hide();
      });
    }
  }

  setupCloseButtons() {
    const closeButtons = this.querySelectorAll('[id^="ModalClose-"]');
    closeButtons.forEach((button) => {
      button.addEventListener('click', () => this.hide(false));
    });
  }
}

customElements.define("modal-dialog-extend", ModalDialogExtended);

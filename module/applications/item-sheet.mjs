const { HandlebarsApplicationMixin } = foundry.applications.api;

export class PandorhaItemSheet extends HandlebarsApplicationMixin(foundry.applications.sheets.ItemSheetV2) {
  static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    classes: ["pandorha", "sheet", "item"],
    position: { width: 600, height: 520 },
    form: {
      submitOnChange: true,
      submitOnClose: true,
      closeOnSubmit: false
    }
  });

  static PARTS = {
    form: {
      template: "systems/pandorha/templates/item/item.hbs"
    }
  };

  async _onRender(context, options) {
    await super._onRender(context, options);
    
    // Hotfix: Força o salvamento na API V2 já que os Listeners nativos podem quebrar em HTML complexos
    const form = this.element.querySelector("form.pandorha-sheet");
    if (form) {
      form.addEventListener("change", async (event) => {
        const target = event.target;
        if (target.dataset?.action || target.type === "radio") return;
        if (!target.name) return;
        
        const val =
          target.type === "checkbox"
            ? target.checked
            : target.type === "number"
              ? target.valueAsNumber
              : target.value;
        if (target.type === "number" && Number.isNaN(val)) return;

        await this.document.update({ [target.name]: val });
      });
    }
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    return {
      ...context,
      system: this.document.system,
      itemType: this.document.type
    };
  }
}

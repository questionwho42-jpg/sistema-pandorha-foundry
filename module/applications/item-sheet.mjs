const { HandlebarsApplicationMixin } = foundry.applications.api;

export class PandorhaItemSheet extends HandlebarsApplicationMixin(foundry.applications.sheets.ItemSheetV2) {
  static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    classes: ["pandorha", "sheet", "item"],
    position: { width: 600, height: 520 }
  });

  static PARTS = {
    form: {
      template: "templates/item/item.hbs"
    }
  };

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    return {
      ...context,
      system: this.document.system,
      itemType: this.document.type
    };
  }
}

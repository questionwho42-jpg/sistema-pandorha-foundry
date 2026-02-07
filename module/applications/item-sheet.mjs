const { HandlebarsApplicationMixin } = foundry.applications.api;

export class PandorhaItemSheet extends HandlebarsApplicationMixin(foundry.applications.sheets.ItemSheetV2) {
  static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    classes: ["pandorha", "sheet", "item"],
    template: "templates/item/item.hbs",
    width: 600,
    height: 520,
    position: { width: 600, height: 520 }
  });

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    return {
      ...context,
      system: this.item.system,
      itemType: this.item.type
    };
  }
}

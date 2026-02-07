export class PandorhaItemModel extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    return {
      description: new fields.HTMLField({ initial: "" }),
      details: new fields.SchemaField({
        source: new fields.StringField({ initial: "" }),
        category: new fields.StringField({ initial: "" }),
        requirements: new fields.StringField({ initial: "" }),
        tags: new fields.ArrayField(new fields.StringField({ initial: "" }))
      }),
      activation: new fields.SchemaField({
        cost: new fields.StringField({ initial: "" }),
        type: new fields.StringField({ initial: "" })
      }),
      range: new fields.StringField({ initial: "" }),
      duration: new fields.StringField({ initial: "" }),
      target: new fields.StringField({ initial: "" }),
      check: new fields.StringField({ initial: "" }),
      dc: new fields.StringField({ initial: "" }),
      damage: new fields.StringField({ initial: "" }),
      effect: new fields.StringField({ initial: "" }),
      roll: new fields.SchemaField({
        axis: new fields.StringField({ initial: "" }),
        aplicacao: new fields.StringField({ initial: "" }),
        bonus: new fields.NumberField({ integer: true, initial: 0 }),
        isAttack: new fields.BooleanField({ initial: false })
      }),
      components: new fields.StringField({ initial: "" }),
      school: new fields.StringField({ initial: "" }),
      circle: new fields.NumberField({ integer: true, initial: 0 }),
      level: new fields.NumberField({ integer: true, initial: 0 }),
      price: new fields.StringField({ initial: "" }),
      quantity: new fields.NumberField({ integer: true, initial: 1, min: 0 }),
      equipped: new fields.BooleanField({ initial: false }),
      slotCost: new fields.NumberField({ integer: true, initial: 0 }),
      weapon: new fields.SchemaField({
        damage: new fields.StringField({ initial: "" }),
        tags: new fields.ArrayField(new fields.StringField({ initial: "" })),
        range: new fields.StringField({ initial: "" }),
        type: new fields.StringField({ initial: "" }),
        hands: new fields.NumberField({ integer: true, initial: 1 })
      }),
      armor: new fields.SchemaField({
        bonus: new fields.NumberField({ integer: true, initial: 0 }),
        penalty: new fields.StringField({ initial: "" }),
        tags: new fields.ArrayField(new fields.StringField({ initial: "" })),
        maxAxis: new fields.NumberField({ integer: true, initial: 0 })
      }),
      shield: new fields.SchemaField({
        bonus: new fields.NumberField({ integer: true, initial: 0 }),
        tags: new fields.ArrayField(new fields.StringField({ initial: "" })),
        type: new fields.StringField({ initial: "" })
      }),
      rune: new fields.SchemaField({
        grade: new fields.StringField({ initial: "" }),
        effects: new fields.StringField({ initial: "" })
      }),
      classData: new fields.SchemaField({
        baseHp: new fields.NumberField({ integer: true, initial: 0 }),
        basePv: new fields.NumberField({ integer: true, initial: 0 }),
        baseEe: new fields.NumberField({ integer: true, initial: 0 }),
        trainedWeapons: new fields.ArrayField(new fields.StringField({ initial: "" })),
        trainedArmors: new fields.ArrayField(new fields.StringField({ initial: "" })),
        trainedShields: new fields.ArrayField(new fields.StringField({ initial: "" }))
      })
    };
  }
}

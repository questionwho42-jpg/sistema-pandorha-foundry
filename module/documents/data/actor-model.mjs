export class PandorhaActorModel extends foundry.abstract.TypeDataModel {
  static migrateData(source) {
    if (source?.details) {
      if (source.details.crest === "") source.details.crest = null;
      if (source.details.portrait === "") source.details.portrait = null;
    }
    return source;
  }

  static defineSchema() {
    const fields = foundry.data.fields;

    return {
      description: new fields.HTMLField({ initial: "" }),
      details: new fields.SchemaField({
        biography: new fields.HTMLField({ initial: "" }),
        notes: new fields.HTMLField({ initial: "" }),
        ancestry: new fields.StringField({ initial: "" }),
        class: new fields.StringField({ initial: "" }),
        background: new fields.StringField({ initial: "" }),
        crest: new fields.FilePathField({ categories: ["IMAGE"], initial: null, required: false, nullable: true }),
        portrait: new fields.FilePathField({ categories: ["IMAGE"], initial: null, required: false, nullable: true })
      }),
      attributes: new fields.SchemaField({
        level: new fields.NumberField({ integer: true, initial: 1, min: 0 }),
        xp: new fields.NumberField({ integer: true, initial: 0, min: 0 }),
        tier: new fields.NumberField({ integer: true, initial: 1, min: 0 })
      }),
      eixos: new fields.SchemaField({
        fisico: new fields.NumberField({ integer: true, initial: 1 }),
        mental: new fields.NumberField({ integer: true, initial: 1 }),
        social: new fields.NumberField({ integer: true, initial: 1 })
      }),
      aplicacoes: new fields.SchemaField({
        conflito: new fields.NumberField({ integer: true, initial: 1 }),
        interacao: new fields.NumberField({ integer: true, initial: 1 }),
        resistencia: new fields.NumberField({ integer: true, initial: 1 })
      }),
      potencial: new fields.NumberField({ integer: true, initial: 0 }),
      resources: new fields.SchemaField({
        hp: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, initial: 0 }),
          max: new fields.NumberField({ integer: true, initial: 0 }),
          temp: new fields.NumberField({ integer: true, initial: 0 })
        }),
        pv: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, initial: 0 }),
          max: new fields.NumberField({ integer: true, initial: 0 })
        }),
        ee: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, initial: 0 }),
          max: new fields.NumberField({ integer: true, initial: 0 })
        }),
        actions: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, initial: 3, min: 0 }),
          max: new fields.NumberField({ integer: true, initial: 3, min: 0 })
        }),
        reaction: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, initial: 1, min: 0 }),
          max: new fields.NumberField({ integer: true, initial: 1, min: 0 })
        })
      }),
      defenses: new fields.SchemaField({
        ca: new fields.NumberField({ integer: true, initial: 10 }),
        caBase: new fields.NumberField({ integer: true, initial: 10 })
      }),
      movement: new fields.SchemaField({
        base: new fields.NumberField({ integer: true, initial: 9 }),
        climb: new fields.NumberField({ integer: true, initial: 0 }),
        swim: new fields.NumberField({ integer: true, initial: 0 }),
        fly: new fields.NumberField({ integer: true, initial: 0 })
      }),
      training: new fields.SchemaField({
        weapons: new fields.ArrayField(new fields.StringField({ initial: "" })),
        armors: new fields.ArrayField(new fields.StringField({ initial: "" })),
        skills: new fields.ArrayField(new fields.StringField({ initial: "" }))
      }),
      bonuses: new fields.SchemaField({
        attack: new fields.NumberField({ integer: true, initial: 0 }),
        damage: new fields.NumberField({ integer: true, initial: 0 })
      }),
      skills: new fields.SchemaField({
        furtividade_fisica: new fields.SchemaField({
          trained: new fields.BooleanField({ initial: false }),
          bonus: new fields.NumberField({ integer: true, initial: 0 })
        }),
        furtividade_magica: new fields.SchemaField({
          trained: new fields.BooleanField({ initial: false }),
          bonus: new fields.NumberField({ integer: true, initial: 0 })
        }),
        percepcao: new fields.SchemaField({
          trained: new fields.BooleanField({ initial: false }),
          bonus: new fields.NumberField({ integer: true, initial: 0 })
        }),
        ladinagem: new fields.SchemaField({
          trained: new fields.BooleanField({ initial: false }),
          bonus: new fields.NumberField({ integer: true, initial: 0 })
        }),
        medicina: new fields.SchemaField({
          trained: new fields.BooleanField({ initial: false }),
          bonus: new fields.NumberField({ integer: true, initial: 0 })
        }),
        historia: new fields.SchemaField({
          trained: new fields.BooleanField({ initial: false }),
          bonus: new fields.NumberField({ integer: true, initial: 0 })
        }),
        atletismo: new fields.SchemaField({
          trained: new fields.BooleanField({ initial: false }),
          bonus: new fields.NumberField({ integer: true, initial: 0 })
        }),
        intimidacao: new fields.SchemaField({
          trained: new fields.BooleanField({ initial: false }),
          bonus: new fields.NumberField({ integer: true, initial: 0 })
        }),
        persuasao: new fields.SchemaField({
          trained: new fields.BooleanField({ initial: false }),
          bonus: new fields.NumberField({ integer: true, initial: 0 })
        }),
        adestramento: new fields.SchemaField({
          trained: new fields.BooleanField({ initial: false }),
          bonus: new fields.NumberField({ integer: true, initial: 0 })
        })
      }),
      derived: new fields.SchemaField({
        initiative: new fields.NumberField({ integer: true, initial: 0 }),
        dc: new fields.NumberField({ integer: true, initial: 10 }),
        carryMax: new fields.NumberField({ integer: true, initial: 0 }),
        carrySlots: new fields.NumberField({ integer: true, initial: 0 }),
        dcTable: new fields.SchemaField({
          mundana: new fields.NumberField({ integer: true, initial: 12 }),
          desafiadora: new fields.NumberField({ integer: true, initial: 15 }),
          lendaria: new fields.NumberField({ integer: true, initial: 20 }),
          divina: new fields.NumberField({ integer: true, initial: 25 })
        })
      })
    };
  }
}

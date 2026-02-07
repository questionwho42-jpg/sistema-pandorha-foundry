export function registerHandlebars() {
  Handlebars.registerHelper("ifEq", function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this);
  });

  Handlebars.registerHelper("toUpper", function (value) {
    if (typeof value !== "string") return value;
    return value.toUpperCase();
  });

  Handlebars.registerHelper("joinTags", function (tags) {
    if (!Array.isArray(tags)) return "";
    return tags.filter(Boolean).join(", ");
  });
}

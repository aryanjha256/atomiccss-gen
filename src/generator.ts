/**
 * Escapes special characters in a CSS class name
 * Based on CSS.escape() but simplified for our needs
 */
function escapeCssClassName(className: string): string {
  return className.replace(/[!\"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~]/g, "\\$&");
}

export function generateCssForClass(cls: string): string | null {
  // Simple mapping of utility prefix to CSS property
  const propertyMap: Record<string, string> = {
    "w-": "width",
    "h-": "height",
    "text-": "color",
    "bg-": "background-color",
    "p-": "padding",
    "px-": "padding-left:$, padding-right:$",
    "py-": "padding-top:$, padding-bottom:$",
    "pt-": "padding-top",
    "pr-": "padding-right",
    "pb-": "padding-bottom",
    "pl-": "padding-left",
    "m-": "margin",
    "mx-": "margin-left:$, margin-right:$",
    "my-": "margin-top:$, margin-bottom:$",
    "mt-": "margin-top",
    "mr-": "margin-right",
    "mb-": "margin-bottom",
    "ml-": "margin-left",
    "flex-": "flex",
    "gap-": "gap",
    "opacity-": "opacity",
    "border-": "border",
    "rounded-": "border-radius",
  };

  // Check if class follows the pattern "prefix-[value]"
  const match = cls.match(/^([a-z]+-)\[([^\]]+)\]$/);
  if (!match) return null;

  const [, prefix, value] = match;

  // Check if the prefix exists in our mapping
  if (typeof prefix !== "string" || !(prefix in propertyMap)) {
    return null;
  }

  // Escape the class name for CSS selector
  const escapedClassName = escapeCssClassName(cls);

  // TypeScript should now know that prefix is a valid key
  const property = propertyMap[prefix];

  // Handle multiple properties (like px-, py-, etc.)
  if (property && property.includes(",")) {
    const properties = property.split(", ");
    const css = properties
      .map((prop: string) => {
        const [propName, propValue] = prop.split(":");
        return `${propName}:${propValue ? value : value};`;
      })
      .join("");
    return `.${escapedClassName}{${css}}`;
  }

  return `.${escapedClassName}{${property}:${value};}`;
}

import { test, expect } from "@playwright/test";
import Menu from "../../app/models/Menu";

test.describe("Menu Schema Test", () => {
  test("Validate Required Fields", async () => {
    const menuPaths = Menu.schema.paths;

    expect(menuPaths.title.instance).toBe("String");
    expect(menuPaths.description.instance).toBe("String");
    expect(menuPaths.price.instance).toBe("String");
    expect(menuPaths.discount.instance).toBe("Number");
    expect(menuPaths.image.instance).toBe("String");
    expect(menuPaths.public_id.instance).toBe("String");
    expect(menuPaths.sizes.instance).toBe("Array");
    expect(menuPaths.extra.instance).toBe("Array");
  });
});

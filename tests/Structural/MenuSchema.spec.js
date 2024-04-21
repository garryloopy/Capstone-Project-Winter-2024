import { test, expect } from "@playwright/test";
import Menu from "../../app/models/Menu";

// Describing a test suite named "Menu Schema Test"
test.describe("Menu Schema Test", () => {
  // Defining a test within the suite named "Validate Required Fields"
  test("Validate Required Fields", async () => {
    // Accessing the paths of the Menu schema
    const menuPaths = Menu.schema.paths;

    // Asserting that the instance of the 'title' field is a string
    expect(menuPaths.title.instance).toBe("String");

    // Asserting that the instance of the 'description' field is a string
    expect(menuPaths.description.instance).toBe("String");

    // Asserting that the instance of the 'price' field is a string
    expect(menuPaths.price.instance).toBe("String");

    // Asserting that the instance of the 'discount' field is a number
    expect(menuPaths.discount.instance).toBe("Number");

    // Asserting that the instance of the 'image' field is a string
    expect(menuPaths.image.instance).toBe("String");

    // Asserting that the instance of the 'public_id' field is a string
    expect(menuPaths.public_id.instance).toBe("String");

    // Asserting that the instance of the 'sizes' field is an array
    expect(menuPaths.sizes.instance).toBe("Array");

    // Asserting that the instance of the 'extra' field is an array
    expect(menuPaths.extra.instance).toBe("Array");
  });
});

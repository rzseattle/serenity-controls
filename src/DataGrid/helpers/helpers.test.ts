import { getColumnsWidths, isColumnAssignedElement, isGridColumnElementEqual } from "./helpers";

test("Should find elements assigned to column", () => {
    expect(isColumnAssignedElement({ field: "test_field" }, { field: "test_field" })).toBeTruthy();
    expect(
        isColumnAssignedElement({ field: "different", applyTo: "test_field" }, { field: "test_field" }),
    ).toBeTruthy();

    expect(isColumnAssignedElement({ field: "different" }, { field: "test_field" })).toBeFalsy();
    expect(
        isColumnAssignedElement({ field: "different", applyTo: "test_field_other" }, { field: "test_field" }),
    ).toBeFalsy();
});

test("Should find elements are equal assigned", () => {
    expect(isGridColumnElementEqual({ field: "test_field" }, { field: "test_field" })).toBeTruthy();
    expect(
        isGridColumnElementEqual({ field: "", applyTo: "test_field" }, { field: "", applyTo: "test_field" }),
    ).toBeTruthy();

    expect(
        isGridColumnElementEqual({ field: "different", applyTo: "test_field" }, { field: "test_field" }),
    ).toBeFalsy();
    expect(
        isGridColumnElementEqual(
            { field: "different", applyTo: "test_field" },
            { field: "test_field", applyTo: "test_field" },
        ),
    ).toBeFalsy();
    expect(
        isGridColumnElementEqual({ field: "different", applyTo: "test_field_other" }, { field: "different" }),
    ).toBeFalsy();
});

test("Should generate proper grid", () => {
    expect(getColumnsWidths([{ field: 1 }, { field: 2 }, { field: 3 }])).toEqual("1fr 1fr 1fr");
    expect(getColumnsWidths([{ field: 1, width: "min-content" }, { field: 2 }, { field: 3 }])).toEqual(
        "min-content 1fr 1fr",
    );
    expect(getColumnsWidths([{ field: 1, width: "auto" }, { field: 2 }, { field: 3 }])).toEqual("auto 1fr 1fr");
    expect(getColumnsWidths([{ field: 1, width: "max-content" }, { field: 2 }, { field: 3 }])).toEqual(
        "max-content 1fr 1fr",
    );

    expect(getColumnsWidths([{ field: 1, width: 20 }])).toEqual("20px");
    expect(getColumnsWidths([{ field: 1, width: "20px" }])).toEqual("20px");

    expect(getColumnsWidths([{ field: 1, maxWidth: "max-content" }])).toEqual("minmax(0, max-content)");

    expect(getColumnsWidths([{ field: 1, minWidth: 20, maxWidth: "max-content" }])).toEqual(
        "minmax(20px, max-content)",
    );
    expect(getColumnsWidths([{ field: 1, minWidth: "20px", maxWidth: "max-content" }])).toEqual(
        "minmax(20px, max-content)",
    );
    expect(getColumnsWidths([{ field: 1, minWidth: "20px" }])).toEqual("minmax(20px, 1fr)");

    expect(getColumnsWidths([{ field: 1, maxWidth: 20 }])).toEqual("minmax(0, 20px)");
});

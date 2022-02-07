import { useSerenityForm } from "./useSerenityForm";
import "@testing-library/jest-dom/extend-expect";
import { renderHook, act } from "@testing-library/react-hooks";

test("Should use readonly", () => {
    const { result } = renderHook(() => useSerenityForm<any>());
    expect(result.current.isReadOnly).toBe(false);
    act(() => {
        result.current.setReadonly(true);
    });
    expect(result.current.isReadOnly).toBe(true);
    expect(result.current.field("test_field").readonly).toBe(true);
});

test("Should process form errors", () => {
    const { result } = renderHook(() => useSerenityForm());

    act(() => {
        result.current.setFormErrors(["error1", "error2"]);
    });
    expect(result.current.formErrors.length).toBe(2);
    expect(result.current.formErrors[1]).toBe("error2");
});

test("Should process field errors", () => {
    const { result } = renderHook(() => useSerenityForm<{ test_field: string }>());

    act(() => {
        result.current.register("test_field");
        result.current.setFieldErrors("test_field", ["error"]);
    });
    expect(result.current.getFieldState("test_field").invalid).toBe(true);
    expect(result.current.getFieldState("test_field").error.types[0]).toBe("error");
});

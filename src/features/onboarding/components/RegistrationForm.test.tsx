import { render, screen, fireEvent, act } from "@testing-library/react";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RegisterForm } from "./RegisterForm";

const navigateMock = vi.fn();

const fetchMock = vi.fn();

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual("@tanstack/react-router");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

beforeEach(() => {
  navigateMock.mockReset();
  fetchMock.mockReset();

  fetchMock.mockResolvedValue({
    ok: true,
    json: vi.fn().mockResolvedValue({}),
  });

  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

function renderRegisterForm() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <RegisterForm />
      </QueryClientProvider>
    </MantineProvider>,
  );
}

describe("RegisterForm", () => {
  describe("renders registration sections", () => {
    it("renders registration sections", () => {
      renderRegisterForm();

      expect(screen.getByText("Admin info")).toBeInTheDocument();
      expect(screen.getByText("School info")).toBeInTheDocument();
      expect(
        screen.getByRole("button", {
          name: /register/i,
        }),
      ).toBeInTheDocument();
    });

    it("keeps register button disabled until all fields are filled", () => {
      renderRegisterForm();

      const registerButton = screen.getByRole("button", { name: /register/i });
      expect(registerButton).toBeDisabled();

      fireEvent.change(screen.getByLabelText("First Name"), {
        target: { value: "Jane" },
      });
      fireEvent.change(screen.getByLabelText("Last Name"), {
        target: { value: "Doe" },
      });
      fireEvent.change(screen.getByLabelText("Email"), {
        target: { value: "jane@example.com" },
      });
      fireEvent.change(screen.getByLabelText("Password"), {
        target: { value: "password123" },
      });
      fireEvent.change(screen.getByLabelText("School Name"), {
        target: { value: "Springfield High School" },
      });
      fireEvent.change(screen.getByLabelText("School Address"), {
        target: { value: "123 Main St" },
      });
      fireEvent.change(screen.getByLabelText("City"), {
        target: { value: "Springfield" },
      });
      fireEvent.change(screen.getByLabelText("State"), {
        target: { value: "IL" },
      });
      fireEvent.change(screen.getByLabelText("Zip Code"), {
        target: { value: "62701" },
      });
      fireEvent.change(screen.getByLabelText("Country"), {
        target: { value: "USA" },
      });

      expect(registerButton).toBeEnabled();
    });
  });

  describe("form submission", () => {
    it("submits the form and navigates to the next page", async () => {
      vi.useFakeTimers();
      renderRegisterForm();
      fireEvent.change(screen.getByLabelText("First Name"), {
        target: { value: "Jane" },
      });
      fireEvent.change(screen.getByLabelText("Last Name"), {
        target: { value: "Doe" },
      });
      fireEvent.change(screen.getByLabelText("Email"), {
        target: { value: "jane@example.com" },
      });
      fireEvent.change(screen.getByLabelText("Password"), {
        target: { value: "password123" },
      });
      fireEvent.change(screen.getByLabelText("School Name"), {
        target: { value: "Springfield High School" },
      });
      fireEvent.change(screen.getByLabelText("School Address"), {
        target: { value: "123 Main St" },
      });
      fireEvent.change(screen.getByLabelText("City"), {
        target: { value: "Springfield" },
      });
      fireEvent.change(screen.getByLabelText("State"), {
        target: { value: "IL" },
      });
      fireEvent.change(screen.getByLabelText("Zip Code"), {
        target: { value: "62701" },
      });
      fireEvent.change(screen.getByLabelText("Country"), {
        target: { value: "USA" },
      });

      const registerButton = screen.getByRole("button", { name: /register/i });
      fireEvent.click(registerButton);

      await act(async () => {
        await Promise.resolve();
      });

      expect(fetchMock).toHaveBeenCalledTimes(1);

      await act(async () => {
        await vi.advanceTimersByTimeAsync(3000);
      });

      expect(navigateMock).toHaveBeenCalledTimes(1);
    });
  });
});

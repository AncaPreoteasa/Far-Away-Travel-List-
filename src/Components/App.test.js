import { fireEvent, render, screen } from "@testing-library/react";
import Form from "../Components/Form";
import Logo from "./Logo";
import Packinglist from "./Packinglist";
import "@testing-library/jest-dom";

test("renders Logo with specific text", () => {
  const { getByText } = render(<Logo />);
  expect(getByText(/Far Away/i)).toBeInTheDocument();
});

test("renders Form", () => {
  render(<Form />);
  const button = screen.getByRole("button", { name: /Add/i });
  expect(button).toBeInTheDocument();
});

test("renders Packinglist", () => {
  render(<Packinglist />);
  const button = screen.getByRole("button", { name: /clear list/i });
  expect(button).toBeInTheDocument();
});

test("clicking the clear button triggers onClearItems", () => {
  const onClearItemsMock = jest.fn();
  const items = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: false },
    { id: 3, description: "Charger", quantity: 2, packed: true },
  ];

  render(
    <Packinglist
      items={items}
      onDeleteItem={() => {}}
      onToggleItem={() => {}}
      onClearItems={onClearItemsMock}
    />
  );

  const clearButton = screen.getByRole("button", { name: "Clear list" });
  expect(clearButton).toBeInTheDocument();

  fireEvent.click(clearButton);

  expect(onClearItemsMock).toHaveBeenCalled();
});

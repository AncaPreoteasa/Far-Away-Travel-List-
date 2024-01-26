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

test("selecting a sorting option changes the sorting order", () => {
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
      onClearItems={() => {}}
    />
  );

  const inputOrderItems = screen.getAllByRole("listitem");
  expect(inputOrderItems.map((item) => item.textContent)).toEqual([
    "2 Passports❌",
    "12 Socks❌",
    "2 Charger❌",
  ]);

  const sortByDropdown = screen.getByRole("combobox");
  fireEvent.change(sortByDropdown, { target: { value: "description" } });

  const descriptionOrderItems = screen.getAllByRole("listitem");
  expect(descriptionOrderItems.map((item) => item.textContent)).toEqual([
    "2 Charger❌",
    "2 Passports❌",
    "12 Socks❌",
  ]);
});

test("clicking on the ADD button triggers the onAddItems function ", () => {
  const onAddItemsMock = jest.fn();
  render(<Form onAddItems={onAddItemsMock} />);

  const descriptionInput = screen.getByPlaceholderText("Item..");
  const quantityInput = screen.getByRole("combobox");
  fireEvent.change(descriptionInput, { target: { value: "Passports" } });
  fireEvent.change(quantityInput, { target: { value: "2" } });
  fireEvent.click(screen.getByText("ADD"));
  expect(onAddItemsMock).toHaveBeenCalledWith({
    description: "Passports",
    quantity: 2,
    packed: false,
    id: expect.any(Number),
  });
});

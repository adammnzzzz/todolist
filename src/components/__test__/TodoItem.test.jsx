import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "../TodoItem";

describe("TodoItem", () => {
  const todo = {
    id: 1,
    title: "Belajar testing",
    completed: false,
  };

  test("menampilkan title todo", () => {
    render(<TodoItem todo={todo} onToggle={() => {}} onDelete={() => {}} />);

    expect(screen.getByText("Belajar testing")).toBeInTheDocument();
  });

  test("snapshot TodoItem", () => {
    const { asFragment } = render(
      <TodoItem todo={todo} onToggle={() => {}} onDelete={() => {}} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

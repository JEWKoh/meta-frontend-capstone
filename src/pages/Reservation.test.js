import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

test("renders the reservations component", () => {
    const mockOnFormSubmit = jest.fn();
    const mockDispatchOnDateChange = jest.fn();
    const availableTimes = ["12:00", "13:00", "14:00"];

    render(
        <Router>
            onFormSubmit={mockOnFormSubmit}
            isFormSubmitted={false}
            availableTimes={availableTimes}
            dispatchOnDateChange={mockDispatchOnDateChange}
        </Router>
    );

    const dateLabel = screen.getByText(/Date/i);
    expect(dateLabel).toBeInTheDocument();
});
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SendNewParcel from "../sendNewParcel";
import Signin from "../Signin";
import { MemoryRouter } from "react-router"; 

// Mock any external dependencies or functions

test('renders SendNewParcel component', () => {
    render(<MemoryRouter><SendNewParcel /></MemoryRouter>);
    //Check if heading text first view is present
    expect(screen.getByText('Send a New Parcel')).toBeInTheDocument();
    expect(screen.getByText('Please fill in here package details. Note the maximum size!')).toBeInTheDocument();
  }); 

test('renders SendNewParcel second page', () => {
    render(<MemoryRouter><SendNewParcel /></MemoryRouter>);
 // find the Next button and click it
    fireEvent.click(screen.getByText('Next'));
    // check if the second page is rendered
    expect(screen.getByText('Please fill in here receiver and sender details')).toBeInTheDocument();
    // find the Back button and click it
    fireEvent.click(screen.getByText('Back'));
    // check if the first page is rendered
    expect(screen.getByText('Please fill in here package details. Note the maximum size!')).toBeInTheDocument();
  }); 

  test('renders SendNewParcel 3rd page', () => {
    render(<MemoryRouter><SendNewParcel /></MemoryRouter>);
    // find the Next button and click it
    fireEvent.click(screen.getByText('Next'));
    // check if the second page is rendered
    expect(screen.getByText('Please fill in here receiver and sender details')).toBeInTheDocument();
 // find the Next button and click it
    fireEvent.click(screen.getByText('Next'));
    // check if the 3rd page is rendered
    expect(screen.getByText('Please confirm your order!')).toBeInTheDocument();
    // find the Back button and click it
    fireEvent.click(screen.getByText('Back'));
    // check if the first page is rendered
    expect(screen.getByText('Please fill in here receiver and sender details')).toBeInTheDocument();
  }); 

  test('renders SendNewParcel 3rd page', () => {
    render(<MemoryRouter><SendNewParcel /></MemoryRouter>);
    // find the Next button and click it
    fireEvent.click(screen.getByText('Next'));
    // check if the second page is rendered
    expect(screen.getByText('Please fill in here receiver and sender details')).toBeInTheDocument();
 // find the Next button and click it
    fireEvent.click(screen.getByText('Next'));
    // check if the 3rd page is rendered
    expect(screen.getByText('Please confirm your order!')).toBeInTheDocument();

    test('validates form fields before confirming', async () => {
      render(<SendNewParcel />);
      const confirmButton = screen.getByText('Confirm');
      fireEvent.click(confirmButton);
      await waitFor(() => {
        expect(screen.getByText('Please fill in all the fields.')).toBeInTheDocument();
      });
    });
  
  }); 


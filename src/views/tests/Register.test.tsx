import React from 'react';
import { render, screen, fireEvent, waitFor, getByTestId, act, }  from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from "react-router"; 
import Register from '../Register';

const mockResponse = { success: true };

beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue(Promise.resolve({
      json: jest.fn().mockResolvedValue(mockResponse),
      headers: new Headers(),
      ok: true,
      redirected: false,
      status: 200,
      statusText: 'OK',
      type: 'basic',
      url: ''
    }) as unknown as Response)
  });

afterEach(() => {
    jest.restoreAllMocks();
  });

//check if the Register component renders
test('renders Register component', () => {
    render(<MemoryRouter><Register /></MemoryRouter>);
    expect(screen.getByText('Register now and join us!')).toBeInTheDocument();
});

//fill in the form fields for register a new user
test('fill in the form fields for register a new user', async () => {
    const { getByTestId } = await act(() => render(<MemoryRouter><Register /></MemoryRouter>));
        fireEvent.change(screen.getByPlaceholderText('*First name'), {
            target: { value: 'Mot' },
        });
        
        fireEvent.change(screen.getByPlaceholderText('* Last Name'), {
            target: { value: 'Haile' },
        });
        
        fireEvent.change(screen.getByPlaceholderText('* Email'), {
            target: { value: 'Mot@gmail.com' },
        });
        
        fireEvent.change(screen.getByPlaceholderText('* Phone number'), {
            target: { value: '+358123456789' },
        });
        
        fireEvent.change(screen.getByPlaceholderText('* Street address'), {
            target: { value: 'Ylio 5' },
        });
        
        fireEvent.change(screen.getByPlaceholderText('* Postal code'), {
            target: { value: '00100' },
        });
        
        fireEvent.change(screen.getByPlaceholderText('* City'), {
            target: { value: 'Oulu' },
        });
        
        fireEvent.change(screen.getByPlaceholderText('* Username'), {
            target: { value: 'Mot' },
        });
        
        fireEvent.change(screen.getByPlaceholderText('* Password'), {
            target: { value: 'Mot1234' },
        });
        
        fireEvent.change(screen.getByPlaceholderText('* confirm password must match your password'), {
            target: { value: 'Mot1234' },
        });
        fireEvent.click(screen.getByText('Register'));
         // Wait for the success message
         await waitFor(() => {
            expect(screen.getByText(mockResponse.success ? 'Success!' : '', { exact: false })).toBeInTheDocument();
        });
    });
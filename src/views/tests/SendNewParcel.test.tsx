import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SendNewParcel from "../sendNewParcel";
import { MemoryRouter } from "react-router"; 
import userEvent from "@testing-library/user-event";
import AuthContextProvider from "../../contexts/authContext";

const mockResponse = { pin_code: '0012' };

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

/* test('renders SendNewParcel component', () => {
    render(<MemoryRouter><SendNewParcel /></MemoryRouter>);
    //Check if heading text first view is present
    expect(screen.getByText('Send a New Parcel')).toBeInTheDocument();
    expect(screen.getByText('Please fill in here package details. Note the maximum size!')).toBeInTheDocument();
  });  */


test('renders SendNewParcel component for logged-in user', () => {
    // Simulate a logged-in user
    const userIsLoggedIn = true;
    render(
      <MemoryRouter>
        <AuthContextProvider>
          <SendNewParcel />
        </AuthContextProvider>
      </MemoryRouter>
    );
    // Assertions specific to a logged-in user
    expect(screen.getByText('Send a New Parcel')).toBeInTheDocument();
  });

test('renders SendNewParcel second view', () => {
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

  test('renders SendNewParcel 3rd view, validates form fields before confirming and gets pincode', async () => {
    const { getByTestId } = await act(() => render(<MemoryRouter><SendNewParcel /></MemoryRouter>));
    // Navigate to the 2nd page
    fireEvent.click(screen.getByText('Next'));
    // check if the second page is rendered
    expect(screen.getByText('Please fill in here receiver and sender details')).toBeInTheDocument();
    // Fill in the form fields for the receiver
    fireEvent.change(screen.getByLabelText('Name', { selector: 'input[name="reciever_name"]' }), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText('Street Address', { selector: 'input[name="reciever_street_address"]' }), {
      target: { value: 'Main Street' },
    });
    fireEvent.change(screen.getByLabelText('Postal Code', {selector: 'input[name="reciever_postal_code"]'}), {
      target: { value: '90014' },
    });
    fireEvent.change(screen.getByLabelText('City', {selector: 'input[name="reciever_city"]'}), {
      target: { value: 'Oulu' },
    });
    fireEvent.change(screen.getByLabelText('Phone Number', {selector: 'input[name="reciever_telephone"]'}), {
      target: { value: '+358123456789' },
    });
    fireEvent.change(screen.getByLabelText('Email', {selector: 'input[name="receiver_email"]'}), {
      target: { value: 'john@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText('Choose Pick-up Locker'), {
      target: { value: '1' },
    });  
    fireEvent.change(screen.getByLabelText('Name', { selector: 'input[name="sender_name"]' }), {
      target: { value: 'Marry' },
    });
    fireEvent.change(screen.getByLabelText('Street Address', { selector: 'input[name="sender_street_address"]' }), {
      target: { value: 'Ylio 2' },
    });
    fireEvent.change(screen.getByLabelText('Postal Code', {selector: 'input[name="sender_postal_code"]'}), {
      target: { value: '90570' },
    });
    fireEvent.change(screen.getByLabelText('City', {selector: 'input[name="sender_city"]'}), {
      target: { value: 'Oulu' },
    });
    fireEvent.change(screen.getByLabelText('Phone Number', {selector: 'input[name="sender_telephone"]'}), {
      target: { value: '+358123456789' },
    });
    fireEvent.change(screen.getByLabelText('Email', {selector: 'input[name="sender_email"]'}), {
      target: { value: 'marry@gmail.com' },
    });
    //Find drop-off locker selection list and select the first option
    await act(async () => {
      userEvent.selectOptions(getByTestId("select-desired-locker"), "1");
    });

    await act(async () => {
      userEvent.selectOptions(getByTestId("select-dropoff-locker"), "1");
    }); 
  // Check the "Drop-off date" text
  expect(screen.getByText('Drop-off date:')).toBeInTheDocument();
  // navigate to the 3rd page
  fireEvent.click(screen.getByText('Next'));
  // Find the Confirm button and click it
  fireEvent.click(screen.getByText('Confirm'));
  // Check if the error message is not displayed
  expect(screen.queryByText('Please fill in all the fields.')).not.toBeInTheDocument();
  // Find the Confirm button and click it
  await act( () => {
    fireEvent.click(screen.getByText('Confirm'))
  });
  // Check if the pin code is displayed
  await waitFor(() => screen.getByText('The pin code is ' + mockResponse.pin_code, {exact: false}));
}); 
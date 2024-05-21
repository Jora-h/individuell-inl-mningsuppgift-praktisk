import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { setupServer } from "msw/node";
import { rest } from "msw";
import mockDictionaries from './mockDictionaries.json'
import Search from '../components/Search';
import { act } from 'react';

const server = setupServer(
    rest.get(
      "https://api.dictionaryapi.dev/api/v2/entries/en/:query",
      (_req, res, ctx) => res(ctx.json(mockDictionaries))
    )
);
  
beforeAll(() => server.listen());

afterEach(() => {
    jest.clearAllMocks();
})

afterAll(() => server.close());

describe("Search", () => {
    test("shouldn't call onSubmit and should renders error Search field cannot be empty if input is empty", async () => {
        const onSubmit = jest.fn();
        
        render(<Search onSubmit={onSubmit} />);
        
        const user = userEvent.setup();
    
        
        const searhButton = screen.getByRole('button', { name: /Search/i });
        expect(searhButton).toBeInTheDocument();
    
        await user.click(searhButton);
    
        expect(screen.getByText(/Search field cannot be empty/i)).toBeInTheDocument();
    });
    
    test("calls onSubmit with response", async () => {
        const onSubmit = jest.fn();
        
        render(<Search onSubmit={onSubmit} />);
        const user = userEvent.setup();

        await act(() => user.type(screen.getByRole('textbox'), 'test'));
        await user.click(screen.getByRole('button', { name: /Search/i }))

        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith(mockDictionaries);
    });
    
    test("shouldn't call onSubmit and should show error `Error fetching data from the API` if something went wrong", async () => {
        const onSubmit = jest.fn();
        server.use(
            rest.get(
                "https://api.dictionaryapi.dev/api/v2/entries/en/:query",
                (_req, res, ctx) => res(ctx.status(500))
            )
        )
        
        render(<Search onSubmit={onSubmit} />);
        const user = userEvent.setup();

        await act(() => user.type(screen.getByRole('textbox'), 'something'));
        await user.click(screen.getByRole('button', { name: /Search/i }))

        expect(await screen.findByText(/Error fetching data from the API/i)).toBeInTheDocument();
    });
})
import { render, screen } from '@testing-library/react';
import Word from '../components/Word';
import mockDictionaries from './mockDictionaries.json';

const mockWord = mockDictionaries[0];

describe('Word component', () => {
    test('renders', () => {
        render(<Word word={mockWord} />);

        const wordHeading = screen.getByRole('heading', {name: mockWord.word });
        
        expect(wordHeading).toBeInTheDocument();

        mockWord.meanings.forEach((meaning) => {
            const meaningHeading = screen.getByRole('heading', { name: meaning.partOfSpeech })
            const meaningDefinition = screen.getByText(new RegExp(meaning.definitions[0].definition, 'i'))
            
            expect(meaningHeading).toBeInTheDocument();
            expect(meaningDefinition).toBeInTheDocument();
        });
        
        const pronunciationsHeading = screen.getByRole('heading', { name: 'Pronunciations' })
        expect(pronunciationsHeading).toBeInTheDocument();

        mockWord.phonetics.forEach((phonetic) => {
            const phoneticText = screen.getAllByText(new RegExp(phonetic.text, 'i'));
            
            expect(phoneticText[0]).toBeInTheDocument();
        });
    });
});

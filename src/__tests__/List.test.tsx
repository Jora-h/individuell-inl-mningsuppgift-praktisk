import { render, screen } from '@testing-library/react';
import List from '../components/List';
import { WordData } from '../types';

describe('List component', () => {
    test('renders words', () => {
        const wordsMock: WordData[] = [
            { meanings: [], phonetics: [], word: 'test'},
            { meanings: [], phonetics: [], word: 'test2'}
        ];

        render(<List words={wordsMock}/>);
        
        expect(screen.getByText(wordsMock[0].word)).toBeInTheDocument();
        expect(screen.getByText(wordsMock[1].word)).toBeInTheDocument();
    });
});

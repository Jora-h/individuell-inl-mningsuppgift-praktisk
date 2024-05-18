type Phonetic = {
    text: string;
    audio: string;
    sourceUrl: string;
};

type Definition = {
    definition: string;
    example?: string;
};

type Meaning = {
    partOfSpeech: string;
    definitions: Definition[];
};

export type WordData = {
    word: string;
    phonetics: Phonetic[];
    meanings: Meaning[];
};
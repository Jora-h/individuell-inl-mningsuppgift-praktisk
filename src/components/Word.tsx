import { WordData } from "../types";

const Word = ({word}: {word: WordData}) => {
    return (<div className="word-item">
        <h2>{word.word}</h2>
        {word.meanings.map((meaning, mIndex) => {
            return <div key={"meaning"+ mIndex}>
                <h3>{meaning.partOfSpeech}</h3>
                <p>{meaning.definitions[0].definition}</p>
            </div>;
        })}
        <h3>Pronunciations</h3>
        {word.phonetics.map((phonetic, pIndex) => {
            return <div key={"phonetic" + pIndex}>
                <p>{phonetic.text}</p>
                {phonetic.audio && <audio controls>
                    <source src={phonetic.audio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>}
            </div>
        })}
    </div>)
}

export default Word;
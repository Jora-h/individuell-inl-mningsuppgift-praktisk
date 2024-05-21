import { WordData } from "../types";
import Word from "./Word";

const List = ({ words }: { words: WordData[] | null; }) => {
    if(!words) return null;

    return <div className="word-list">
        {words.map((word, index) => {
            return  <Word word={word} key={'word' + index} />
        })}
    </div>
}

export default List;
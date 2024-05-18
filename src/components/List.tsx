import { WordData } from "../types";
import Word from "./Word";

const List = ({ words }: { words: WordData[] | null; }) => {
    if(!words) return null;

    return <div className="word-list">
        {words.map((word) => {
            return  <Word word={word} />
        })}
    </div>
}

export default List;
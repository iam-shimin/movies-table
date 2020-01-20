import React from 'react';
import './GenreList.css'

export default function GenreList(props) {
    return (
        <aside className="genre-list">
            <button disabled={props.active === ''} onClick={() => props.onChangeGenre('')}>All Genres</button>
            {props.genre.map((g, i) => <button
                key={i}
                disabled={props.active === g.name}
                onClick={() => props.onChangeGenre(g.name)}>
                {g.name}
            </button>)}
        </aside>
    );
}
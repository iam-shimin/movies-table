import React from 'react';

export default function Like(props) {
    return (
        <button style={{color: '#fff', backgroundColor: props.liked? 'red': 'green'}} onClick={props.onLike}>
            {props.liked? 'unlike': 'like'}
        </button>
    );
}
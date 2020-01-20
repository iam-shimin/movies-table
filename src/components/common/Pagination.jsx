import React from 'react';
// import propTypes from 'prop-types';

function numberRangeButtons(total, active, clickEvent) {
    return new Array(total).fill(0).map((_, i) => <button
        key={i + 1}
        className={(i + 1 === active)? 'pgn-active': ''}
        onClick={() => clickEvent(i + 1)}
    >{i + 1}</button>);
}

export default function Pagination(props) {
    return (
        <div className="pagination">
            <button
                onClick={() => props.onPageChange('prev')}
                disabled={props.currentPage === 1}
            >Prev</button>
            {numberRangeButtons(props.lastPage, props.currentPage, props.onPageChange)}
            <button
                onClick={() => props.onPageChange('next')}
                disabled={props.currentPage === props.lastPage}
            >Next</button>
        </div>
    );
}

// Pagination.propTypes = {
//     total: propTypes.number.isRequired,
//     limit: propTypes.number.isRequired
// };
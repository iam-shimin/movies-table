import React, { Component } from 'react';
import './Movies.css';
import Like from './common/Like'
import { getMovies } from '../services/fakeMovieService'
import { getGenres } from '../services/fakeGenreService'
import Pagination from './common/Pagination';
import GenreList from './common/GenreList';

export default class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        limit: 2,
        offset: 0,
        lastPage: -1,
        currentPage: 1,
        genreFilter: '',
        genreFilterMovieLength: 0
    }

    componentDidMount() {
        if (this.state.lastPage === -1) {
            var movies = getMovies();
            var lastPage = Math.ceil(movies.length / this.state.limit)
        }
        this.setState({ ...this.state, movies, lastPage, genres: getGenres() })
    }

    deleteMovie = (title) => {
        this.setState({ ...this.state, movies: this.state.movies.filter(movie => movie.title !== title) });
    }

    likeMovie = (id) => {
        this.setState({
            ...this.state,
            movies: this.state.movies.map(mov => {
                if (mov._id === id) {
                    mov.isLiked = !mov.isLiked;
                }
                return mov;
            })
        })
    }

    isMovieLiked = (id) => {
        return !!this.state.movies.find(mov => {
            if (mov._id === id) {
                return true;
            }
            return false;
        }).isLiked;
    }

    paginationChangePage = (pg) => {
        let { offset, currentPage } = this.state;
        if (pg === 'next') {
            offset += this.state.limit;
            ++currentPage;
        } else if (pg === 'prev' && this.state.offset > 0) {
            offset -= this.state.limit;
            --currentPage;
        } else if (typeof pg === 'number') {
            offset = (pg - 1) * this.state.limit; // index of last item in prev pg
            currentPage = pg; // (offset / this.state.limit) + 1; // prev_pg + 1
        }
        this.setState({ ...this.state, offset, currentPage });
    }

    listMoviesByGenre = (genre, limit) => {
        return this.state.movies.filter(mov => mov.genre.name.startsWith(genre)).slice(this.state.offset, limit);
        // this.setState({...this.state, })//update current filter label
    }

    changeGenre = genreFilter => {
        let genreFilterMovieLength = this.state.movies.filter(mov => mov.genre.name.startsWith(genreFilter)).length;
        var lastPage = Math.ceil(genreFilterMovieLength / this.state.limit)
        this.setState({ ...this.state, genreFilter, genreFilterMovieLength, lastPage, offset: 0, currentPage: 1 });
    }

    render() {
        const moviesCount = (this.state.genreFilter && this.state.genreFilterMovieLength) || this.state.movies.length;
        if (moviesCount === 0)
            return <p>No more Movies on the DB</p>
        return (
            <div className="app-movies">
                <main>
                    <h3>Movies ({moviesCount})</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Genre</th>
                                <th>Stock</th>
                                <th>Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.listMoviesByGenre(this.state.genreFilter, this.state.offset + this.state.limit).map(movie => (
                                <tr key={movie._id}>
                                    <td>{movie.title}</td>
                                    <td>{movie.genre.name}</td>
                                    <td>{movie.numberInStock}</td>
                                    <td>{movie.dailyRentalRate}</td>
                                    <td>
                                        <Like liked={this.isMovieLiked(movie._id)} onLike={() => this.likeMovie(movie._id)} />
                                    </td>
                                    <td>
                                        <button style={{color: '#fff'}} onClick={() => this.deleteMovie(movie.title)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                        // offset={this.state.offset}
                        total={this.state.genreFilterMovieLength}
                        lastPage={this.state.lastPage}
                        currentPage={this.state.currentPage}
                        onPageChange={this.paginationChangePage} />
                </main>
                <GenreList
                    active={this.state.genreFilter}
                    genre={this.state.genres}
                    onChangeGenre={this.changeGenre} />
            </div>
        )
    }
}
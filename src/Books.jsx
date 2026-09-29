import { useEffect, useState } from 'react'
import './Books.css'

const Books = () => {

    const [bookData, setBookData] = useState([])

    useEffect(() => {
        getBookData()
    }, [])

    const getBookData = async () => {

        try {

            let apiResponse = await fetch(
                'https://openlibrary.org/search.json?q=fiction&limit=12'
            )

            apiResponse = await apiResponse.json()

            setBookData(apiResponse.docs)

        }
        catch (error) {

            console.log(error)
            alert('Failed to load books')

        }
    }

    return (

        <div className="books-container">

            <div className="books-header">

                <h1>Book Explorer</h1>

                <p>
                    Discover interesting books from around the world
                </p>

            </div>


            <div className="books-grid">

                {bookData.map((book) => (

                    <div className="book-card" key={book.key}>

                        <div className="book-image">

                            {book.cover_i ? (

                                <img
                                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                                    alt={book.title}
                                />

                            ) : (

                                <div className="no-cover">
                                    No Cover Available
                                </div>

                            )}

                        </div>


                        <div className="book-content">

                            <h2>{book.title}</h2>


                            <p className="author">

                                <strong>Author:</strong>{' '}

                                {book.author_name
                                    ? book.author_name[0]
                                    : 'Unknown'}

                            </p>


                            <p>

                                <strong>First Published:</strong>{' '}

                                {book.first_publish_year
                                    ? book.first_publish_year
                                    : 'Unknown'}

                            </p>


                            <p>

                                <strong>Editions:</strong>{' '}

                                {book.edition_count
                                    ? book.edition_count
                                    : 'N/A'}

                            </p>


                            <button>
                                Explore Book
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    )
}

export default Books
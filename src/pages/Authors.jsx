import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import axios from 'axios';

const Authors = () => {
  const [authors, setAuthors] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    const getAuthors = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`)
        setAuthors(response?.data)
      } catch (err) {
        console.log(err)
      }
      setIsLoading(false)
    }

    getAuthors();
  }, [])

  if(isLoading){
    return <Loader/>
  }

  return (
    <section className="authors">
      {authors.length > 0 ? <div className="container authors_container">
        {
          authors.map(({_id: id, avatar, name, posts}) => {
            return <Link key={id} to={`/posts/users/${id}`} className='author'>
               <div className="author_avatar">
                <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt={`image of ${name}`} />
               </div>
               <div className="author_info">
                  <h4>{name}</h4>
                  <p>{posts}</p>
               </div>
            </Link>
          })
        }
      </div> : <h2 className="center">No user/author found</h2>}
    </section>
  );
}

export default Authors;

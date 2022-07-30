import axios from "axios";
import { useEffect, useState } from "react";
import useGenres from "../../../Hooks/useGenre";
import Genres from "../../Genres";
import CustomPagination from "../../Pagination/CustomPagination";
import SingleContent from "../../SingleContent/SingleContent";

const Series = () => {

   
  const [page , setPage] =  useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreforUrl = useGenres(selectedGenres);

   const fetchMovies = async()=> {
     const {data} = await axios.get(
       `https://api.themoviedb.org/3/discover/tv?api_key=4528e8ff388cfbb9660bcc09db8b00c1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforUrl}`
     )

     setContent(data.results);

     setNumOfPages(data.total_pages);

   };
   
   useEffect(() => {
     fetchMovies();
   }, [page,genreforUrl])

    return (
        <div>
          <span className="pageTitle">Series</span>
          <Genres type = 'tv'
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
              genres={genres}
              setGenres={setGenres}
              setPage={setPage}

             />
          <div className="trending">
                {content?.map((c) => <SingleContent key={c.id}
                 id={c.id}
                 poster={c.poster_path} 
                 title={c.title || c.name} 
                 date={c.first_air_date || c.release_date} 
                 media_type='tv'
                 vote_average={c.vote_average} 
                 />)}
            </div>
            {numOfPages>1 &&(
            <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            )}
  
        </div>
    )
}

export default Series

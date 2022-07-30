import axios from "axios"
import { useEffect } from "react";
import {Chip} from '@material-ui/core';
import genreforUrl from "../components/Pages/Movies/Movies"

const Genres = ({
    genres,
    setGenres,
    selectedGenres,
    setSelectedGenres,
    type,
    setPage,
}) => {

    const handleAdd = (genre)=> {
        setSelectedGenres([...selectedGenres,genre]);
        setGenres(genres.filter((g)=>g.id !==genre.id));
        setPage(1);
    };

    const handleRemove = (genre) => {
        setSelectedGenres(
            selectedGenres.filter((selected)=> selected.id!==genre.id)
        );
        setGenres([...genres,genre]);
        setPage(1);
    }

    const fetchGenres = async ()=> {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=4528e8ff388cfbb9660bcc09db8b00c1&language=en-US`);
        setGenres(data.genres);

    };

    console.log(genres);



    useEffect(() => {
        fetchGenres();

        return ()=> {
            setGenres({});
        };
        
    }, []);



    return (
        <div style={{ padding: "6px 0" }}>

          {selectedGenres && selectedGenres.map((genre)=> (
              <Chip 
                 label={genre.name}
                 style= {{margin: 2}}
                 size="small"
                 color="primary"
                 key= {genre.id}
                 clickable
                 onDelete={()=> handleRemove(genre)}
              />  
          ))}
          {genres && genres.map((genre)=> (
              <Chip 
                 label={genre.name}
                 style= {{margin: 2}}
                 size="small"
                 key= {genre.id}
                 clickable
                 onClick={()=>handleAdd(genre)}
              />

          ))}
        </div>
    )
}

export default Genres;

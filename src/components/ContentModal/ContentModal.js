import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useState } from 'react';
import axios from 'axios';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: '1px solid #282c34',
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ContentModal({children, media_type, id}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content,setContent] = useState();
  const [video,setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async() => {
      const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=4528e8ff388cfbb9660bcc09db8b00c1&language=en-US`);


      setContent(data);
  };

  const fetchVideo = async() => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=4528e8ff388cfbb9660bcc09db8b00c1&language=en-US`);

    console.log(data);

    setVideo(data.results[0]?.key)
};

useEffect(() => {
    fetchData();
    fetchVideo();
},);



  return (
    <div>
      <button type="button" className="media" onClick={handleOpen}>
        {children}
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        { content &&(<div className={classes.paper}>
          <div className='ContentModal'>
            {/* <img alt={content.name || content.title} className='Content_portrait' src={content.poster_path?`${img_500}/${content.poster_path}`:unavailable} /> */}
            <img alt={content.name || content.title} className='ContentModal_landscape' src={content.backdrop_path?`${img_500}/${content.backdrop_path}`:unavailableLandscape} />

            <div className='ContentModal_about'>
              <span className='ContentModal_title'>
                {content.name || content.title} ({(
                  content.first_air_date || content.release_date || "-----"
                ).substring(0,4)
                })
              </span>

            </div>

          </div>
          
        </div>)}
        </Fade>
      </Modal>
    </div>
  );
}
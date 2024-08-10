import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { remove} from "../redux/Slices/LibrarySlice"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useState } from 'react';
import Modal from './CustomModal';
import "../style/bookStyle.css"
const LibraryBooks = ({book,itemIndex}) => {
  const dispatch = useDispatch()
  const[modal,setModal]=useState(false)
  const[updatedBook,setUpdatedBook]=useState(null);
  // const addToCart=()=>{
  //   dispatch(add(post));
  //   toast.success("Item added to Cart")
  // }
  const removeFromCart =()=>{
    dispatch(remove(book.id))
    toast.success("book Removed from library")
  }

  function editDetails(){
    setModal(true)
  }
  return <div>
    <div className="bookcontainer">
      <div>
      <p className="booktitle">
          Title:{
            updatedBook?
            updatedBook.title:
            book.title}
        </p>
      </div>
      <div>
        <p className="">
         Author: {
          updatedBook?updatedBook.author:
            book.author
          }
        </p>
      </div>
       <div className="book-img">
        <img style={{height:"100%",width:"100%"}} src="src\assets\iStock-506432952.jpg"/>
      </div>

      <div className="book-footer">
         <div style={{width:"100%",height:"100%",display:"flex"}}>
         <p className="book-country">
           Country: {
            updatedBook?
            updatedBook.country:
            book.country}
          </p>
          <p>
            Pages:{
              updatedBook?updatedBook.pages:book.pages}
          </p>
        </div>
<a href={book.link}> LINK</a>
        <div style={{display:"flex",height:"100%",width:"100%",gap:"15px"}}>
        <button
        style={{ display:"flex",flexDirection:"row", width:"50%",justifyContent:"center",alignItems:"center",gap:"5px"}}
         className="book-remove-button"
         onClick={removeFromCart}>
         <h3> Delete </h3>
            
            <DeleteOutlineOutlinedIcon/>
          </button>
          <button
         style={{ display:"flex",flexDirection:"row", width:"40%",justifyContent:"center",alignItems:"center",gap:"5px"}}
          className="book-add-library"
          onClick={editDetails}>
             <h3> Edit </h3>              

             <ModeEditOutlineOutlinedIcon/>
          </button>

        </div>

      
      </div>

    </div>
{
  modal?
  <Modal method={"PUT"} book={book} setModal={setModal} text={"Edit Book Details"} API_URL={`http://64.227.142.191:8080/application-test-v1.1/books/${book.id}`} open ={modal} setUpdatedBook={setUpdatedBook}/>
  : null
}
  </div>;
};

export default LibraryBooks;
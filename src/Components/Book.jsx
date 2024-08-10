// import React, { useEffect } from 'react'
import "../style/bookStyle.css"
// import { useDispatch, useSelector } from "react-redux";
// import {add,remove} from "../redux/Slices/LibrarySlice"
// import toast from "react-hot-toast";
// const Book = ({book}) => {
//     const {cart} = useSelector((state)=>state);
//     const dispatch = useDispatch();
  
//     const addToLibrary =()=>{
//       dispatch(add(book));
//       toast.success("Item added to Library")
//     }

//     useEffect(()=>{
//       console.log(book)
//     },[])
  
//     const removeFromLibrary = () =>{
//       dispatch(remove(book.id));
//       toast.success("Item removed from Library")
//     }
//   return (
//     <div>
//             <div className="bookcontainer">
//       <div>
//         <p className="booktitle">
//           {book.title}
//         </p>
//       </div>
//       <div>
//         <p >
//           {
//             book.language
//           }
//         </p>
//       </div>
//       <div className="book-img">
//         <img style={{height:"100%",width:"100%"}} src="src\assets\iStock-506432952.jpg"/>
//       </div>

//       <div className="book-footer">
//         <div style={{width:"100%",height:"100%"}}>
//           <p className="book-country">
//             {book.country}
//           </p>
//         </div>

//           {cart?.some((p)=>p.id==book.id)?
//           (<button
//           className="book-remove-button"
//           onClick={removeFromLibrary}
//           >
//             Remove Book
//           </button>):
//           (<button
//           className="book-add-library"
//           onClick={addToLibrary}
//           >
//             Add to Library
//           </button>)}


        
      
//       </div>

//     </div>
//     </div>
//   )
// }

// export default Book
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {add,remove} from "../redux/Slices/LibrarySlice"
import { useEffect } from "react";

const Book = ({book}) => {
  const {library} = useSelector((state)=>state);
  const dispatch = useDispatch();
  useEffect(()=>{
    console.log(library)

  },[library])

  const addToCart =()=>{
    dispatch(add(book));
    toast.success("Item added to library")
  }

  const removeFromCart = () =>{
    dispatch(remove(book.id));
    toast.error("Item removed from library")
  }

  return (<div>
    <div className="bookcontainer">
      <div>
      <p className="booktitle">
         Title: {book.title}
        </p>
      </div>
      <div>
        <p className="">
         Author: {
            book.author
          }
        </p>
      </div>
       <div className="book-img">
        <img style={{height:"100%",width:"100%"}} src="src\assets\iStock-506432952.jpg"/>
      </div>

      <div className="book-footer">
         <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"space-between"}}>
         <p className="book-country">
           Country: {book.country}
          </p>
        </div>
        {
          library.some((p)=>p.id==book.id)?
          (<button
         className="book-remove-button"
          onClick={removeFromCart}>
            Remove Item
          </button>):
          (<button
          className="book-add-library"
          onClick={addToCart}>
            Add to Cart
          </button>)
        }
      
      </div>

    </div>
  </div>);
};

export default Book;

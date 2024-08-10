import React, { useEffect, useState } from "react";
import "../style/OneStyles.css";
import TextField from "@mui/material/TextField";
import Book from "../Components/Book";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "../Components/CustomModal";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
const ScreenOne = () => {
  const API_URL = " http://64.227.142.191:8080/application-test-v1.1/books";

  const [courseName, setcourseName] = useState("");
  const [textStart, setextStart] = useState("");
  const [books, setBooks] = useState([]);
  const [newBooks, setnewBooks] = useState();
  const [loading, setLoading] = useState(false);
  const { library } = useSelector((state) => state);
  const [modal, setModal] = useState(false);


  async function fetchProductData(url, search) {
    setLoading(true);

    try {
      const result = await fetch(
        url,
        search
          ? {
              method: "GET",
              headers: { "Content-Type": "application/json", Accept: "*/*" },
            }
          : null
      );
      const response = await result.json();
      const data = response.data;

      setBooks(data);
    } catch (error) {
      console.log("error ");
      setBooks([]);
    }
    setLoading(false);
    console.log(books);
  }

  useEffect(() => {
    takeInput()
    fetchProductData(API_URL);
  }, []);
  useEffect(() => {
    console.log(books);
  }, [books]);

  const now = new Date();
  const hours = now.getHours();
  const formattedTime = `${hours.toString().padStart(2, "0")}`;

  const textStarting = "Let's go and be a ";
  const txtCourse = "Shelf Explorer";
  const morining = "Morning";
  const afternoon = "Afternoon";
  const evening = "Evening";

  useEffect(() => {
    console.log(books);
  }, [books]);

  function filterBooks(value) {
    const API_SEARCH_URL = ` http://64.227.142.191:8080/application-test-v1.1/books?title=${value}`;
    // const newList = value
    //   ? books.filter((book) => book.title === value)
    //   : books;
    // console.log(newList);
    // setnewBooks(newList);
    fetchProductData(API_SEARCH_URL, "search");
  }

  
  function delayText(index, nextWord, txt) {
    setTimeout(function () {
      if (index === 0) {
        !txt ? setcourseName(nextWord) : setextStart(nextWord);
      } else {
        !txt
          ? setcourseName((prev) => prev + nextWord)
          : setextStart((prev) => prev + nextWord);
      }
    }, 40 * index);
  }

  function greetingText() {
    if (formattedTime <= 12) {
      return morining;
    } else {
      return formattedTime >= 12 && formattedTime <= 16 ? afternoon : evening;
    }
  }

  function takeInput() {
    const txt = true;
    const response = textStarting.split("");
    for (let j = 0; j < response.length; j++) {
      const nextWord = response[j];
      delayText(j, nextWord, txt);
    }
  }

  function coursetxt() {
    const txt = false;
    const response = txtCourse.split("");
    for (let j = 0; j < response.length; j++) {
      const nextWord = response[j];
      delayText(j, nextWord, txt);
    }

  }

  useEffect(() => {
    if (textStart?.length === textStarting.length) {

      coursetxt();
      console.log("hello");
    }
  }, [textStart]);

  return (
    <div className="parent-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "95%",
          marginTop: "10px",
        }}
      >
        <h1 className="name">Data.Weaver</h1>
        <NavLink to="library">
          <div className="relative text-2xl">
            <AutoStoriesOutlinedIcon sx={{ fontSize: 45, color: "black" }} />
            {library?.length > 0 && (
              <span className=" book-icon">{library?.length}</span>
            )}
          </div>
        </NavLink>
      </div>

      <div className="container">
        <div>
          <h1 className="greetings">
            Good
            <span
              style={{
                color: "#13206e",
                paddingRight: "6px",
                paddingLeft: "6px",
              }}
            >
              {greetingText()}
            </span>
            ,
            <span
              style={{
                paddingLeft: "6px",
              }}
              className="txt"
            >
              {textStart ? textStart : null}
              <p
                className="txt"
                style={{
                  display: "inline-block",
                  color: "#13206e",
                  fontSize: "50px",
                }}
              >
                {courseName}
              </p>
              {courseName?.length === txtCourse.length && (
                <TextField
                  id="standard-basic"
                  variant="standard"
                  InputProps={{
                    style: {
                      height: "70px",
                      width: "400px",
                      color: "rgb(0, 0, 139)",
                      fontSize: "50px",
                      fontWeight: "600",
                    },
                  }}
                  sx={{
                    paddingRight: "15px",
                    paddingLeft: "15px",
                    paddingTop: "15px",
                    display: "inline-flex",
                    justifyContent: "end",
                  }}
                  onChange={(e) => filterBooks(e.target.value)}
                />
              )}

              <img className="img " src="src\assets\dataweaver.png" />
            </span>
          </h1>
        </div>
      </div>

      <div className="book-parent-container ">
      <div style={{display:"flex",justifyContent:"center"}} className="bookcontainer">


       <div onClick={()=>setModal(true)}  className="book-img">
        <AddCircleOutlineOutlinedIcon style={{width:"100%",height:"100%", color:"#1e81b0"}}/>
      </div>
      <h2>ADD NEW BOOK</h2>



      
    </div>
        {loading ? (
          <div>wait please</div>

        ) : books.length > 0 ? 
        
        (
          books.map((book) => <Book key={book.id} book={book} />)
        ) : (
          <div>No Data Found</div>
        )}
      </div>
      {modal ? (
        <Modal
          text={"Add Book Details"}
          API_URL={`http://64.227.142.191:8080/application-test-v1.1/books`}
          setModal={setModal}
          add={true}
          method={"POST"}
          open={modal}
        />
      ) : null}
    </div>
  );
};

export default ScreenOne;

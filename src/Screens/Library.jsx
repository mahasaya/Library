import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LibraryBooks from "../Components/LibraryBooks";
import { Link } from "react-router-dom";
import "../style/bookStyle.css";
import "../style/OneStyles.css";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
const Library = () => {
  const { library } = useSelector((state) => state);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(library.reduce((acc, curr) => acc + curr.pages, 0));
  }, [library]);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "rgb(218, 218, 218",
      }}
    >
      {library.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              padding: "2.5rem",
              margin: "0 ,auto",
              gap: "2.5rem",
            }}
          >
            {library.map((book, index) => {
              return (
                <LibraryBooks key={book.id} book={book} bookIndex={index} />
              );
            })}
          </div>

          <div className="librarySummary">
            <h1>Your library</h1>
            <p>
              <h2>Total Books added:{library?.length}</h2>
            </p>
            <NavLink to="/">
          <div className="relative text-2xl">
          <Button variant="contained">
          <ArrowBackOutlinedIcon color="white"/>
          Go back</Button>
          </div>
        </NavLink>
          </div>

        </div>
      ) : (
        <div>
          <h1>library Empty</h1>
          <Link to={"/"}>
            <button>Add Books</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Library;

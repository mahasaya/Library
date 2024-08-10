import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";

const CustomModal = ({ text, API_URL, book, setModal, add, method, open, setUpdatedBook }) => {

  const [data, setData] = useState(book);


  useEffect(() => {
    setUpdatedBook(data);
  }, [data]);

  async function apiCall() {
    try {
      const response = await fetch(API_URL, {
        method: method,
        headers: { 'Content-Type': 'application/json', 'Accept': "*/*" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        toast.error("Bad Request");
        return;
      }

      if (response.status === 400) {
        toast.error("User already exists");
        return;
      }

      if (response.status === 200) {
        let message = add ? "Added" : "Edited";
        toast.success(`Data ${message} Successfully`);
        setModal(false);
        if (add) {
          setUpdatedBook(data);
        }
      }
    } catch (error) {
      console.error('Error fetching API:', error);
      toast.error("Error in updating details");
    }
  }

  function updateField(field, value) {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={() => setModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} style={{ borderRadius: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <h1>{text}</h1>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }} sx={{ mt: 2 }}>
          <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
            <div style={{ display: "flex", alignItems: "end", textAlign: "center", width: "150px" }}>
              <h2>Title</h2>
            </div>
            <TextField
              id="standard-multiline-flexible"
              label="Title..."
              multiline
              maxRows={4}
              value={data.title ||" "}
              variant="standard"
              sx={{ width: "80%" }}
              onChange={(e) => updateField("title", e.target.value)}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
            <div style={{ display: "flex", alignItems: "end", textAlign: "center", width: "150px" }}>
              <h2>Author</h2>
            </div>
            <TextField
              id="standard-multiline-flexible"
              label="Author..."
              multiline
              maxRows={4}
              value={data.author || ''}
              variant="standard"
              sx={{ width: "80%" }}
              onChange={(e) => updateField("author", e.target.value)}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
            <div style={{ display: "flex", alignItems: "end", textAlign: "center", width: "150px" }}>
              <h2>Year</h2>
            </div>
            <TextField
              id="standard-multiline-flexible"
              label="Year..."
              multiline
              maxRows={4}
              value={data.year || ''}
              variant="standard"
              sx={{ width: "80%" }}
              onChange={(e) => updateField("year", e.target.value)}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
            <div style={{ display: "flex", alignItems: "end", textAlign: "center", width: "150px" }}>
              <h2>Country</h2>
            </div>
            <TextField
              id="standard-multiline-flexible"
              label="Country..."
              multiline
              maxRows={4}
              value={data.country || ''}
              variant="standard"
              sx={{ width: "80%" }}
              onChange={(e) => updateField("country", e.target.value)}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
            <div style={{ display: "flex", alignItems: "end", textAlign: "center", width: "150px" }}>
              <h2>Language</h2>
            </div>
            <TextField
              id="standard-multiline-flexible"
              label="Language..."
              multiline
              maxRows={4}
              value={data.language || ''}
              variant="standard"
              sx={{ width: "80%" }}
              onChange={(e) => updateField("language", e.target.value)}
            />
          </div>
          {add && <>
            <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
              <div style={{ display: "flex", alignItems: "end", textAlign: "center", width: "150px" }}>
                <h2>Link</h2>
              </div>
              <TextField
                id="standard-multiline-flexible"
                label="Link..."
                multiline
                maxRows={4}
                value={data.link || ''}
                variant="standard"
                sx={{ width: "80%" }}
                onChange={(e) => updateField("link", e.target.value)}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
              <div style={{ display: "flex", alignItems: "end", textAlign: "center", width: "150px" }}>
                <h2>Pages</h2>
              </div>
              <TextField
                id="standard-multiline-flexible"
                label="Pages..."
                multiline
                maxRows={4}
                value={data.pages || ''}
                variant="standard"
                sx={{ width: "80%" }}
                onChange={(e) => updateField("pages", e.target.value)}
              />
            </div>
          </>}
        </div>
        <div style={{ display: "flex", width: '100%', justifyContent: "end" }}>
          <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
            <Button onClick={apiCall} variant="contained">Submit</Button>
            <Button onClick={() => setModal(false)} variant="outlined" color="error">
              Close
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default CustomModal;

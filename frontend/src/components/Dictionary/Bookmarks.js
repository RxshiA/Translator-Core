import { Stack, IconButton, Typography, Box } from "@mui/material";
import { ArrowBack as BackIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";

const Bookmarks = () => {
  const [bookmarkList, setBookmarkList] = useState([]);
  useEffect(() => {
    function fetchBookmarks(word) {
      axios
        .get(`http://localhost:4500/bookmark/`)
        .then((res) => {
          setBookmarkList(res.data);
          console.log(res + "getBookmarkList");
        })
        .catch((error) => {
          console.error("Error fetching bookmark:", error.message);
        });
    }
  }, []);
  return (
    <>
      <Stack sx={{ mb: 2 }} direction="row" alignItems="center">
        <IconButton to="/" component={Link} sx={{ color: "black", mr: 1 }}>
          <BackIcon />
        </IconButton>
        <Typography variant="h6">Bookmarks</Typography>
      </Stack>
      {bookmarkList.length ? (
        bookmarkList.map((b) => (
          <Box
            key={b}
            to={`/search/${b}`}
            component={Link}
            sx={{
              p: 2,
              cursor: "pointer",
              backgroundColor: "white",
              borderRadius: 1,
              textTransform: "capitalize",
              mb: 2,
              fontWeight: 800,
              display: "block",
              color: "black",
              textDecoration: "none",
            }}
          >
            {b}
          </Box>
        ))
      ) : (
        <Typography sx={{ mt: 5 }} align="center">
          No Bookmarks
        </Typography>
      )}
    </>
  );
};

export default Bookmarks;
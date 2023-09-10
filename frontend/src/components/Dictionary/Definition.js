import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Stack, Typography, Box, IconButton, Divider, CircularProgress, useTheme, Button, styled } from '@mui/material';
import axios from "axios";

const Definition = () => {
  const { word } = useParams();
  const [definitions, setDefinitions] = useState([]);

  useEffect(() => {
    const fetchDefinition = async () => {
      const resp = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      setDefinitions(resp.data);
    };

    fetchDefinition();
  }, []);

  return (
    <>
      {definitions.map((def, idx) => (
        <Fragment key={idx}>
          <Divider sx={{ display: idx === 0 ? "none" : "block", my: 3 }} />
          {def.meanings.map((meaning) => (
            <Box
              key={Math.random()}
              sx={{
                boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.05)",
                backgroundColor: "#fff",
                p: 2,
                borderRadius: 2,
                mt: 3,
              }}
            >
              <Typography
                sx={{ textTransform: "capitalize" }}
                color="GrayText"
                variant="subtitle1"
              >
                {meaning.partOfSpeech}
              </Typography>
              {meaning.definitions.map((definition, idx) => (
                <Typography
                  sx={{ my: 1 }}
                  variant="body2"
                  color="GrayText"
                  key={definition.definition}
                >
                  {meaning.definitions.length > 1 && `${idx + 1}. `}{" "}
                  {definition.definition}
                </Typography>
              ))}
            </Box>
          ))}
        </Fragment>
      ))}
    </>
  );
};

export default Definition;

import { Grid, Typography, Paper, TextField, InputAdornment } from "@mui/material";
import { Link } from 'react-router-dom';

import { useEffect, useState } from "react";
import { viewMeds } from "../services/api";
import List from '@mui/material/List';

import { mainListItems } from '../components/ListItems';

const ViewMeds = () => {
  const [meds, setMeds] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    viewMeds()
      .then((response) => {
        setMeds(response.data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={3} md={2} lg={2} xl={2} style={{ background: "#f0f0f0", minHeight: "100vh", paddingTop: "2rem" }}>
        {mainListItems}
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} sm={9} md={10} lg={10} xl={10} style={{ paddingLeft: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          Medicines
        </Typography>

        {/* Search Bar */}
        <TextField
  label="Search for Medicine Name"
  variant="outlined"
  fullWidth
  size="small" // Set size to small
  margin="normal"
  onChange={handleSearchChange}
  value={searchTerm}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        {/* You can add a search icon here if needed */}
      </InputAdornment>
    ),
  }}
  sx={{ borderRadius: "20px" }} // Set border-radius for rounded edges
/>

        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {meds && (
          <div>
            {meds
              .filter((med) => med.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((med) => (
                <Link to={`/medicine/${med._id}`} key={med._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Paper
                    style={{ padding: "1rem", marginBottom: "1rem", display: "flex", alignItems: "center", cursor: "pointer" }}
                  >
                    {med.picture && (
                      <img
                        src={`http://localhost:4000/${med.picture}`}
                        alt={med.name}
                        style={{ width: "50px", height: "50px", marginRight: "1rem" }}
                      />
                    )}
                    <div>
                      <Typography variant="h6">{med.name}</Typography>
                      <Typography>{med.description}</Typography>
                      <Typography variant="subtitle1">Price: {med.price}</Typography>
                    </div>
                  </Paper>
                </Link>
              ))}
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default ViewMeds;
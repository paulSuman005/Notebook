import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Container
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Logo from "../../assets/logo";
import CreateNote from "../contentPages/CreateNote";

const DashboardPage: React.FC = () => {
  const [notes, setNotes] = useState<string[]>(["Note 1", "Note 2", "Note 1", "Note 2", "Note 1", "Note 2", "Note 1", "Note 2", "Note 1", "Note 2"]);
  const [isCreateNote, setIsCreateNote] = useState<boolean>(false);

  const handleDelete = (index: number) => {
    const updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "#fff" }}>
      {/* Top Bar */}
      <AppBar position="static" sx={{ bgcolor: "#fff", color: "black", boxShadow: "none", maxWidth: "1000px", margin: "0 auto" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ width: "fit-content", height: "fit-content", gap: "30px", display: "flex", flexDirection: "row" }}>
            <Logo />
            <Typography sx={{
              fontWeight: 600,
              fontSize: "24px",
              lineHeight: "110%",
              letterSpacing: "-0.04em",
              textAlign: "center",
              alignContent: "center",
            }}>
              Dashboard
            </Typography>
          </Box>
          <Button sx={{ textTransform: "none", fontSize: "16px", fontWeight: 400, textDecoration: "underline", textUnderlineOffset: "3px", color: "var(--primary-color)" }}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ mt: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Card sx={{
          width: "100%",
          height: "130px",
          maxWidth: 400,
          border: "1px solid var(--note-border)",
          borderRadius: 2,
          mb: 3,
          boxShadow: "0px 2px 6px 0px #00000096",
        }}>
          <CardContent sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around"
          }}
          >
            <Typography fontWeight={700} sx={{ textAlign: "center", fontSize: "22px" }}>
              Welcome, Jonas Kahnwald !
            </Typography>
            <Typography color="text.secondary" sx={{ textAlign: "center" }}>Email: xxxxx@xxxx.com</Typography>
          </CardContent>
        </Card>

        {/* Create Note Button */}
        <Button
          variant="contained"
          onClick={() => setIsCreateNote(true)}
          sx={{ bgcolor: "var(--primary-color)", width: "100%", maxWidth: 400, fontSize: "16px", borderRadius: 2, mb: 4, color: "var(--secondary-color)" }}
        >
          Create Note
        </Button>

        {/* Notes List */}
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
            Notes
          </Typography>
          <List>
            {notes.map((note, index) => (
              <ListItem
                key={index}
                sx={{
                  border: "1px solid var(--note-border)",
                  borderRadius: 2,
                  mb: 2,
                  boxShadow: "0px 2px 6px 0px #00000096",
                }}
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleDelete(index)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={note} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
      {
        isCreateNote &&
        <CreateNote
          open={isCreateNote}
          onClose={() => setIsCreateNote(false)}
        />
      }

    </Box>
  );
};

export default DashboardPage;

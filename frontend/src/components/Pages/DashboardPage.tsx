import React, { useEffect, useState } from "react";
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
  Container,
  useTheme,
  useMediaQuery
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Logo from "../../assets/logo";
import CreateNote from "../contentPages/CreateNote";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, getUser, getUserNotes, userlogout } from "../Redux/slices/authSlice";
import type { AppDispatch, RootState } from "../Redux/store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const DashboardPage: React.FC = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, notes } = useSelector((state: RootState) => state.auth);
  console.log("user : ", user);
  console.log("notes : ", notes);

  const [isCreateNote, setIsCreateNote] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(getUser());
        const resNote = await dispatch(getUserNotes());
        if(res.payload === 'Unauthenticated, please login again' || resNote.payload === 'Unauthenticated, please login again'){
          navigate("/signin");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch, navigate]);


  const handleDelete = (index: string) => {
    const res = dispatch(deleteNote({ noteId: index }));
    console.log("delete succesfull", res);
  };

  const handleSignout = async () => {
    const res = await dispatch(userlogout());
    if(res.payload.success){
      toast.success('Logout successfully!');
      navigate('/signin');
    }else{
      toast.error('Failed to logout!')
    }
  }

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
          <Button onClick={handleSignout} sx={{ textTransform: "none", fontSize: "16px", fontWeight: 400, textDecoration: "underline", textUnderlineOffset: "3px", color: "var(--primary-color)" }}>
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
            <Typography fontWeight={700} sx={{ textAlign: "center", fontSize: isMobile ? "22px" : "30px", }}>
              {user?.name}
            </Typography>
            <Typography color="text.secondary" sx={{ textAlign: "center", fontSize: isMobile ? "14px" : "18px" }}>{user?.email}</Typography>
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
            {notes.length > 0 &&
              notes.map((note) => (
                <ListItem
                  key={note._id}
                  sx={{
                    border: "1px solid var(--note-border)",
                    borderRadius: 2,
                    mb: 2,
                    boxShadow: "0px 2px 6px 0px #00000096",
                  }}
                  secondaryAction={
                    <IconButton edge="end" onClick={() => handleDelete(note._id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={note.content}
                    primaryTypographyProps={{
                      sx: {
                        fontFamily: "Inter",
                        fontWeight: 400,
                        fontStyle: "normal",
                        fontSize: "16px",
                        lineHeight: "250%",
                        letterSpacing: "0%",
                      },
                    }}
                  />
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

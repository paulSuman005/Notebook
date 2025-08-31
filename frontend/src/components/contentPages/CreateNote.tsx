import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from "@mui/material";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../Redux/store";
import { createNote } from "../Redux/slices/authSlice";

interface CreateNoteDialogProps {
    open: boolean;
    onClose: () => void;
}

const CreateNote: React.FC<CreateNoteDialogProps> = ({ open, onClose }) => {

    const dispatch = useDispatch<AppDispatch>();
    
    const [newNote, setNewNote] = useState("");

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!newNote){
            toast.error('please write your notes');
            return;
        }
        const payload = {content: newNote};
        const res = await dispatch(createNote(payload));
        console.log("res from create note ",res);
        onClose();
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                },
            }}
        >
            <DialogTitle sx={{ fontWeight: 600 }}>Create a New Note</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Write your note here..."
                    sx={{
                        mt: 1,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "10px",
                        },
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} sx={{ textTransform: "none" }}>
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    sx={{ bgcolor: "var(--primary-color)", textTransform: "none" }}
                >
                    Save Note
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateNote;

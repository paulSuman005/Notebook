import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from "@mui/material";

interface CreateNoteDialogProps {
    open: boolean;
    onClose: () => void;
}

const CreateNote: React.FC<CreateNoteDialogProps> = ({
    open,
    onClose,
}) => {
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
                    placeholder="Title"
                    sx={{
                        mt: 1,
                        "& .MuiOutlinedInput-root": { borderRadius: "10px" }
                    }}
                />
                <TextField
                    fullWidth
                    multiline
                    minRows={3}
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

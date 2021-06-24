import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ArticlesCards from '../ArticlesGridCards'
import api from '../../services/Api'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
    const [open, setOpen] = React.useState(false)
    const [articles, setArticles] = React.useState([])

    const handleClickOpen = () => {
        setOpen(true);
        const user_id = localStorage.getItem("user_id")
        api.get('/article/user/' + user_id)
            .then(function (response) {
                //---set Authorization header ---
                setArticles(JSON.parse(response.data.slice(9)))
                //token store in session storage
            })
            .catch(function (error) {
                console.log("error response :: ", error);
            });
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Your articles
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Your saved articles"}</DialogTitle>
                <DialogContent style={{ height: 'auto' }}>
                    <ArticlesCards articles={articles} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
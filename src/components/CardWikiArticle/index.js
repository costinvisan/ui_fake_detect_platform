import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';


const useStyles = makeStyles({
    card: {
        paddingTop: 20,
        paddingLeft: 20,
        width: 1370
    },
    root: {
        display: 'inline-block',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    readOrHide: {
        color: '#3D4F98',
        cursor: 'pointer',
        display: 'inline-block'
    },
    pos2: {
        marginTop: 12,
    },
    textArticle: {
        borderWidth: 100
    }
});

export default function CardWikiArticle(props) {
    const classes = useStyles();
    const [text, setText] = React.useState(props.wikiArticle.Content)
    const [similaritiesButton, setSimilaritiesButton] = React.useState(false)
    const [similarities, setSimilarities] = React.useState([])
    const [popText, setPopText] = React.useState('')
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    function handleOnClick(event) {
        setAnchorEl(event.currentTarget);
        const var_text = similarities[parseInt(event.target.id)].MainArticle
        const var_simi = similarities[parseInt(event.target.id)].Simi
        setPopText(_ => "Similarity: " + var_simi + " (0 = perfect match)\nYour article: " + var_text)
    }

    function flatMap(array, fn) {
        var result = [];
        for (var i = 0; i < array.length; i++) {
            var mapping = fn(array[i], i);
            result = result.concat(mapping);
        }
        result.pop()
        return result;
    }

    function splitMulti(str, tokens) {
        var tempChar = tokens[0]; // We can use the first token as a temporary join character
        for (var i = 1; i < tokens.length; i++) {
            str = str.split(tokens[i]).join(tempChar);
        }
        str = str.split(tempChar);
        return str;
    }

    const handleSimilaritiesChange = e => {
        let aux_text = (' ' + text).slice(1);
        if (similaritiesButton) {
            setSimilaritiesButton(false)
            aux_text = props.wikiArticle.Content
        } else {
            var idx_arr = []
            var aux = props.wikiArticle.Similarities
            for (let i = 0; i < aux.length; i++) {
                idx_arr.push({ idx: i, val: aux_text.indexOf(aux[i].OtherArticle) })
            }
            idx_arr.sort(function (a, b) {
                return a.val > b.val;
            })
            var sorted_sent = new Array(idx_arr.length)
            var arr = new Array(idx_arr.length)
            for (let i = 0; i < idx_arr.length; i++) {
                sorted_sent[i] = aux[idx_arr[i].idx].OtherArticle
                arr[i] = aux[idx_arr[i].idx]
            }
            setSimilarities(prevArr => [...prevArr, ...arr])
            const fn = function (part, i) {
                return [
                    <div style={{ display: 'inline' }}>
                        {part}
                    </div>,
                    <div
                        id={i}
                        style={{ backgroundColor: '#A3B1D3', display: 'inline' }}
                        type='button'
                        onClick={handleOnClick}
                    >
                        {sorted_sent[i]}
                    </div>
                ];
            }
            aux_text = flatMap(splitMulti(aux_text, sorted_sent), fn)
            setSimilaritiesButton(true)
        }
        setText(aux_text)
    }

    return (
        <div className={classes.card} >
            {open ?
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    borderWidth='500'
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Typography style={{ padding: 10, whiteSpace: 'pre-line' }}>{popText}</Typography>
                </Popover>
                :
                <div></div>
            }
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        <Link href="https://en.wikipedia.org/wiki/Main_Pagel" target='_blank' rel="noopener noreferrer">
                            https://en.wikipedia.org/wiki/Main_Page
                        </Link>
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {props.wikiArticle.Title}
                    </Typography>
                    <Box
                        boxShadow={3}
                        bgcolor="background.paper"
                        m={1}
                        p={1}
                        style={{ width: 'auto', height: 'auto' }}
                    >
                        <Typography variant="body2" component="p" className={classes.textArticle}>
                            {text}
                        </Typography>
                    </Box>

                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleSimilaritiesChange}>Similarities</Button>
                </CardActions>
            </Card>
        </div>
    );
}
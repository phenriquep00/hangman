import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json';
import React from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { createClient } from '@supabase/supabase-js';

// TODO: [X] Criar um banco de dados (supabase) com palavras para o jogo
// [X] escolher aleatoriamente uma palavra para ser a palavra da vez
// [X] modificar a imagem da forca para cada vez q o usuario erra alguma letra, dando um limite de 6 erros
// [X] criar uma forma de recomeçar o jogo sem precisar dar refresh na pagina caso o jogador perca ou ganhe o jogo
// adicionar efeitos sonoros

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkbHN2b2pzZWp0dHJnYWNlYnh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ0MjY1NDUsImV4cCI6MTk2MDAwMjU0NX0.4FTfOWeJxAS0Pzmdyfpn2LUv5zv1iOpJtTW_t8O3qLE'
const SUPABASE_URL = 'https://udlsvojsejttrgacebxz.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


function compare(w, hw, l, lp) {
    for (var x = 0; x < w.length; x++) {
        if (lp.includes(w.charAt(x))) {
            let c = w.charAt(x);
            if (c == l) {
                // modificar a letra no array hiddenWord
                hw[x] = c;
            }
        }
    }
    return hw;
};

function renderHiddenWord(w, lp) {
    let arr = Array.from({ length: w.length }, () => '_ ')
    if (lp.length == 0) {
        return arr
    } else {

        for (let l of w) {
            if (lp.includes(l)) {
                arr[w.indexOf(l)] = l;

            }
        }
        return arr
    }
}


export default function PaginaInicial() {
    const [image, setImage] = React.useState('https://raw.githubusercontent.com/phenriquep00/hangman/master/src/img/0.png');
    const [lettersPressed, setLettersPressed] = React.useState([]);
    const [word, setWord] = React.useState('');
    const [hiddenWord, setHiddenWord] = React.useState([]);
    const [missedLetters, setMissedLetters] = React.useState(1);
    const incrementCounter = () => setMissedLetters(missedLetters + 1);
    const refreshPage = () => {
        window.location.reload();
    };
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        if (word == '') {
            supabaseClient
                .from('words')
                .select('*')
                .then(({ data }) => {
                    setWord(data[Math.floor(Math.random() * data.length)]['word']);
                    setHiddenWord(Array.from({ length: word.length }, () => '_ '));
                });
        }

    });

    return (
        <>

            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[100],
                    backgroundImage: 'url(https://images.designtrends.com/wp-content/uploads/2016/03/29114725/Plain-White-Backgrounds.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                    flexDirection: 'column'
                }}
            >
                <div>
                    <p>IN PROGRESS</p>
                </div>
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[100],
                    }}
                >
                    {/*hangman box*/}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '400px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[100],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[100],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '400px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={`${image}`}
                        />

                        {isVisible && <Box
                            /* box dos resultados */
                            styleSheet={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                maxWidth: '300px',
                                width: "100%",
                                maxHeight: '130px',
                                padding: '10px',
                                backgroundColor: appConfig.theme.colors.neutrals[100],
                                border: '1px solid',
                                borderColor: appConfig.theme.colors.neutrals[100],
                                borderRadius: '10px',
                                flex: 1,
                                margin: '2px 2px 2px 2px',
                                fontSize: "36px"
                            }}
                        >
                            <Box
                                styleSheet={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    maxWidth: '300px',
                                    width: "100%",
                                    maxHeight: '130px',
                                    padding: '6px',
                                    backgroundColor: appConfig.theme.colors.neutrals[100],
                                    border: '1px solid',
                                    borderColor: appConfig.theme.colors.neutrals[100],
                                    borderRadius: '10px',
                                    flex: 1,
                                    margin: '1px 1px 1px 1px',
                                    fontSize: "16px",
                                }}
                            >
                                The correct word was: {word}
                            </Box>
                            <Box
                                styleSheet={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    maxWidth: '300px',
                                    width: "50%",
                                    maxHeight: '130px',
                                    padding: '6px',
                                    backgroundColor: appConfig.theme.colors.neutrals[100],
                                    border: '1px solid',
                                    borderColor: appConfig.theme.colors.neutrals[100],
                                    borderRadius: '10px',
                                    flex: 1,
                                    margin: '1px 1px 1px 1px',
                                    fontSize: "16px",
                                }}
                            >
                                <Button
                                    type="submit"
                                    label="Play again"
                                    onClick={refreshPage}
                                    buttonColors={{
                                        contrastColor: appConfig.theme.colors.neutrals["000"],
                                        mainColor: appConfig.theme.colors.primary[500],
                                        mainColorLight: appConfig.theme.colors.primary[400],
                                        mainColorStrong: appConfig.theme.colors.primary[600],
                                    }}
                                >

                                </Button>
                            </Box>
                        </Box>}

                    </Box>
                    {/*word box*/}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '400px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[100],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[100],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '400px',
                        }}
                    >
                        <Box
                            styleSheet={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                                minWidth: '300px',
                                minHeight: '200px',
                                padding: '10px',
                                backgroundColor: appConfig.theme.colors.neutrals[100],
                                border: '1px solid',
                                borderColor: appConfig.theme.colors.neutrals[100],
                                borderRadius: '10px',
                                flex: 1,
                                margin: '2px 2px 2px 2px'
                            }}

                        >
                            <Box
                                /* box of letters already pressed */
                                styleSheet={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    maxWidth: '300px',
                                    width: "100%",
                                    maxHeight: '70px',
                                    padding: '10px',
                                    backgroundColor: appConfig.theme.colors.neutrals[100],
                                    border: '1px solid',
                                    borderColor: appConfig.theme.colors.neutrals[100],
                                    borderRadius: '10px',
                                    flex: 1,
                                    margin: '2px 2px 2px 2px',
                                    color: "#72bb9d",
                                    fontSize: "28px"
                                }}

                            >
                                {lettersPressed}
                            </Box>
                            {/* box with the hidden word */}
                            <Box
                                styleSheet={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    maxWidth: '300px',
                                    width: "100%",
                                    maxHeight: '130px',
                                    padding: '10px',
                                    backgroundColor: appConfig.theme.colors.neutrals[100],
                                    border: '1px solid',
                                    borderColor: appConfig.theme.colors.neutrals[100],
                                    borderRadius: '10px',
                                    flex: 1,
                                    margin: '2px 2px 2px 2px',
                                    fontSize: "36px"

                                }}

                            >
                                {renderHiddenWord(word, lettersPressed)}
                            </Box>

                        </Box>
                        {/* keyboard box */}
                        <Box
                            styleSheet={{
                                display: 'flex',
                                alignItems: 'center',
                                minWidth: '300px',
                                minHeight: '200px',
                                padding: '10px',
                                backgroundColor: appConfig.theme.colors.neutrals[100],
                                border: '1px solid',
                                borderColor: appConfig.theme.colors.neutrals[100],
                                borderRadius: '10px',
                                flex: 1,
                                margin: '2px 2px 2px 2px'
                            }}

                        >
                            <Keyboard
                                layout={{
                                    'default': [
                                        'q w e r t y u i o p',
                                        'a s d f g h j k l',
                                        'z x c v b n m t',
                                        'finish'
                                    ]
                                }}
                                onKeyPress={(key) => {

                                    setHiddenWord(compare(word, hiddenWord, key, lettersPressed));

                                    if (lettersPressed.includes(`${key}`) == false) {
                                        if (key != 'finish') {
                                            setLettersPressed([
                                                ...lettersPressed,
                                                key
                                            ]);
                                            if (Array.from(String(word)).includes(key) == false) {
                                                setMissedLetters(incrementCounter)
                                                if (missedLetters < 6) {
                                                    setImage(`https://raw.githubusercontent.com/phenriquep00/hangman/master/src/img/${missedLetters}.png`)
                                                } else {
                                                    // game over
                                                    setImage(`https://raw.githubusercontent.com/phenriquep00/hangman/master/src/img/lose.png`);
                                                    setIsVisible(true);
                                                }
                                            }
                                        }

                                    }
                                    if (renderHiddenWord(word, lettersPressed).includes('_ ') === false) { // fix this
                                        setIsVisible(true);
                                    }
                                }}

                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
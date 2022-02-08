import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json';
import React from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';


// TODO: Criar um banco de dados (supabase) com palavras para o jogo
// escolher aleatoriamente uma palavra para ser a palavra da vez
// [X] modificar a imagem da forca para cada vez q o usuario erra alguma letra, dando um limite de 6 erros
// criar uma forma de recomeçar o jogo sem precisar dar refresh na pagina caso o jogador perca ou ganhe o jogo
// adicionar efeitos sonoros


function compare(w, hw, l) {
    for (var x = 0; x < w.length; x++) {
        let c = w.charAt(x);
        if (c == l) {
            // modificar a letra no array hiddenWord
            hw[x] = c;
        }
    }
    return hw;
}

export default function PaginaInicial() {
    const [image, setImage] = React.useState('https://raw.githubusercontent.com/phenriquep00/hangman/master/src/img/0.png');
    const [lettersPressed, setLettersPressed] = React.useState([]);
    const word = 'monkey';
    const [hiddenWord, setHiddenWord] = React.useState(Array.from({ length: word.length }, (_) => '_ '));
    const [missedLetters, setMissedLetters] = React.useState(1);
    const incrementCounter = () => setMissedLetters(missedLetters + 1);

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[100],
                    backgroundImage: 'url(https://images.designtrends.com/wp-content/uploads/2016/03/29114725/Plain-White-Backgrounds.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
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
                                <div>{hiddenWord}</div>
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
                                        'z x c v b n m t'
                                    ]
                                }}
                                onKeyPress={(key) => {
                                    setHiddenWord(compare(word, hiddenWord, key));
                                    if (lettersPressed.includes(`${key}`) == false) {
                                        setLettersPressed([
                                            ...lettersPressed,
                                            key
                                        ]);
                                        if (Array.from(String(word)).includes(key) == false) {
                                            setMissedLetters(incrementCounter)
                                            if (missedLetters < 6) {
                                                setImage(`https://raw.githubusercontent.com/phenriquep00/hangman/master/src/img/${missedLetters}.png`)
                                            } else {
                                                setImage(`https://raw.githubusercontent.com/phenriquep00/hangman/master/src/img/lose.png`)
                                            }
                                        }
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
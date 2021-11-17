import { useState } from "react";
import axios from 'axios';
import styles from '../styles/Input.module.css';

export default function Input() {
    //Creo la función para hacer el llamado al back.
    const backCall = async (letters, n) => {
            try{
                let info = await axios.get(`http://localhost:3001/words?letters=${letters}&n=${n}`);
                setVariants(info.data);
            } catch(err){
                console.log(err)
            }
    }
    //Seteo los estados locales
    const [variants, setVariants] = useState([])
    const [letters, setLetters] = useState("");
    const [numbers, setNumbers] = useState();
    //Hago handlers para los mismos
    const handleInputLetters = (e) =>{
        e.preventDefault();
        setLetters(e.target.value);
    }
    const handleInputNumbers= (e) =>{
        e.preventDefault();
        setNumbers(Number(e.target.value));
    }
    //Tomo el submit con el llamado al back
    const handleSubmit = async (e) => {
        e.preventDefault();
        backCall(letters, numbers);
    }
    return (
        <div className={styles.divCenter}>
            <div className={styles.form}>
                <br />
                <label>Introduce las letras que aparecen en Draw Something, no importa el orden:</label>
                    <br />
                    <input
                    className={styles.input}
                    type="text"
                    onChange={(e) => handleInputLetters(e)}
                    placeholder="Letras..."
                    />
                    <br />
                    <br />
                <label>Introduce el número de letras que componen la palabra:</label>
                    <br />
                    <input
                    className={styles.input}
                    type="number"
                    onChange={(e) => handleInputNumbers(e)}
                    placeholder="Números..."
                    />
                    <br />
                <button className={styles.submit} onClick={(e) => handleSubmit(e)}>Buscar variantes</button>
            </div>
            <div className={styles.menu}>
                <p>Tus opciones son:</p>
            <ul>
                {
                    variants?.map((e) => (
                            <li>{e}</li>
                    ))
                }
            </ul>
            </div>
        </div>
    )
}
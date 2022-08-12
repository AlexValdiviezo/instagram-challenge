export const postPublics = async(url, txt) =>{

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imagen: url, titulo:txt, likes:0})
    };
    const result = await fetch(`https://instagram-challenge-sondeos.herokuapp.com/api/`, requestOptions);
    const {error, data} = await result.json();
    if(error){
        return {
            error: 'Ocurrió un error al intentar subir la imagen'
        }
    }
    console.log(data);
    return data;
}
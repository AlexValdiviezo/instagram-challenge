export const getPublics = async() =>{
    const result = await fetch(`https://instagram-challenge-backend.herokuapp.com/api/`);
    const {data} = await result.json();
    return data;
}
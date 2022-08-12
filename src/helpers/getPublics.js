export const getPublics = async() =>{
    const result = await fetch(`http://localhost:8080/api/`);
    const {data} = await result.json();
    return data;
}
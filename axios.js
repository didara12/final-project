const axios = require("axios")

const allbooks = async ()=>{
    try {
        const res = await axios.get("http://localhost:5000/");
        console.log(res.data);
    } catch (error) {
        console.error("Error:", error.message);

    }
}

const book_isbn = async (isbn)=>{
    try {
        const res = await axios.get(`http://localhost:5000/isbn/${isbn} `);
        console.log(res.data);
    } catch (error) {
        console.error("Error:", error.message);

    }
}

const book_author = async (author)=>{
    try {
        const res = await axios.get(`http://localhost:5000/author/${author} `);
        console.log(res.data);
    } catch (error) {
        console.error("Error:", error.message);

    }
}


const book_title = async (title)=>{
    try {
        const res = await axios.get(`http://localhost:5000/title/${title} `);
        console.log(res.data);
    } catch (error) {
        console.error("Error:", error.message);

    }
}

book_title("Things Fall Apart")



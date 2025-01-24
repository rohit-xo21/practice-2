const Book = require('../models/bookModel')

const createBooks = async (req,res) => {
    try {
        const { title,author,genre,available,year } = req.body;
        const bookTitle = await Book.findOne({ title });

        if(bookTitle){
            return res.status(400).send('Book already exists')
        }
        
        const book = new Book ({
            title,
            author,
            genre,
            available,
            year
        });

        await book.save();
        res.status(201).json({message: 'Book added successfully'});

    } catch(error){
        res.status(500).json({message: error.message});
    }
}





const getBooks = async (req,res) => {
    try {

        const books = await Book.find();
        res.status(200).json({data: books});

    } catch(error){
        res.status(500).json({message: error.message});
    }
}

const getBookByID = async (req,res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById(id);
        if (!book){
            return res.statuts(404).json({message: 'Book not found'})
        }
        res.status(200).json({data: book});

    } catch(error){
        res.status(500).json({message: error.message});
    }
}


const updateBook = async (req,res) => {
    try{ 
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({message: 'Book updated successfully', data:book})
    } catch(error){
        res.status(500).json({message: error.message});
    }
}


const deleteBook = async (req,res) => {
    try{
        const book = await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Book deleted successfully'})

    } catch(error){
        res.status(500).json({message: error.message});
    }
}


module.exports = { createBooks, getBooks, getBookByID, updateBook, deleteBook };
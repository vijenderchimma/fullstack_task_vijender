const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 4000;
const dotEnv = require('dotenv');
dotEnv.config();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Task Schema
const taskSchema = new mongoose.Schema({
    text: String

});

const Task = mongoose.model('assignment_vijender', taskSchema);

// Add new items to the list and save them to MongoDB
app.post('/add', async (req, res) => {
    try {
        const { text } = req.body;
        console.log(text)
        

        const newTask = new Task({text});
        await newTask.save();

        res.status(200).send('Task added successfully');
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).send('Error adding task');
    }
});


app.get('/fetchalltasks',async (req,res)=>{
    try {
        const data = await Task.find({})
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Interenal server error"})
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

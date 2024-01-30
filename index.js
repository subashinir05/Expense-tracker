const express=require('express');
const mongoose=require('mongoose');
const app=express();
const port=process.env.PORT||8000;
app.listen(port)
const Expense=require('./expense');
mongoose.connect('mongodb+srv://subashinir05:28052020@cluster0.7s69no0.mongodb.net/newDB?retryWrites=true&w=majority',{
    useUnifiedTopology:true
});

app.use(express.json());
app.get('/expenses',async(req,res)=>{
    const result=await Expense.find();
    res.send(result);
})

//findbyId

app.get('/expenses/:id',async(req,res)=>{
    try{
    const id =req.params.id;
    const result =await Expense.findById(id);
    if(result)
       res.send(result);
    else
        res.send("no expenses")
    }catch(err){
        res.send(err);
    }
    
})

//delete
app.delete('/expenses/:id',async(req,res)=>{
    try{
    const id =req.params.id;
    const result =await Expense.findByIdAndDelete(id);
    if(result)
       res.send(result);
    else
        res.send("no expenses")
    }catch(err){
        res.send(err);
    }
    
})

//create
app.post('/expense',async(req,res)=>{
    console.log(req.body)
    try{
        const newExpense=req.body
        await Expense.create(newExpense)
        res.send('created')
    }catch(err){
        res.send(err)
    }
})

app.listen(port,()=>{
    console.log(`server running ${port}`)
})

//update by id
app.put('/expense/:id',async(req,res)=>{
    try{
    const id =req.params.id;
    const updateData=req.body;
    const result =await Expense.findByIdAndUpdate(id,{$set:updateData},{
        new:true
    })
    if(result)
       res.send(result);
    else
        res.send("no expenses")
    }catch(err){
        res.send(err);
    }   
})


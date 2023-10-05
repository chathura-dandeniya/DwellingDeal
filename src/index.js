const express=require("express")
const Collection=require("./mongo")

const app=express()
const path=require("path")
const jwt=require("jsonwebtoken")
const cookieParser=require("cookie-parser")
const bcryptjs=require("bcryptjs")

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))


const tempelatePath=path.join(__dirname,"../tempelates")
const publicPath=path.join(__dirname,"../public")

app.set('view engine','hbs')
app.set("views",tempelatePath)
app.use(express.static(publicPath))



async function hashPass(password){

    const res=await bcryptjs.hash(password,10)
    return res

}
async function compare(userPass,hashPass){

    const res=await bcryptjs.compare(userPass,hashPass)
    return res

}



app.get("/",(req,res)=>{

    if(req.cookies.jwt){
        const verify=jwt.verify(req.cookies.jwt,"DwellingDeal")
    res.render("home",{name:verify.name})
    }
    else{
        
        res.render("login")
    }

})
app.get("/signup",(req,res)=>{
    res.render("signup")
})


app.post("/signup", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const existingUser = await Collection.findOne({ username });
    if (existingUser) {
      return res.send("Username already exists");
    }
    const token = jwt.sign({ username }, "DwellingDeal");

    const hashedPassword = await hashPass(password);

    const newUser = {
      username,
      password: hashedPassword,
      token,
      role, 
    };

    await Collection.insertMany(newUser);


    res.cookie("jwt", token, {
      maxAge: 3000,
      httpOnly: true,
    });


    res.render("home", { name: req.body.name });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Collection.findOne({ username : req.body.username });

    if (!user) {
      return res.send("User not found");
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return res.send("Incorrect password");
    }
    if (user.role === req.body.role) {
      const token = jwt.sign({ username: user.username }, "DwellingDeal");

      res.cookie("jwt", token, {
        maxAge: 3000,
        httpOnly: true,
      });

      res.render("home", { name: user.name });
    } else {
      res.status(403).send("You are not authorized");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(3000,()=>{
    console.log("port connected")
})

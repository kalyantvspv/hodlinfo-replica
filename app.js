var express = require('express');
var mysql = require('mysql');
const cors = require('cors');
const bodyParser = require("body-parser")
var app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));

const con = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'root123',
        database:'kalyan'
    }
)

con.connect((err)=>{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("connected");
    }
})

fetch('https://api.wazirx.com/api/v2/tickers')
.then(data => data.json())
.then((data) => {
   con.query("delete from finaldata");
  var count = 0;
         for(const i in data)
         {
           count = count+1;
           const slno = count;
           const fname = data[i].name;
           const lastval = data[i].last;
           const buy = data[i].buy;
           const sell = data[i].sell;
           const vol = data[i].volume;
           const base = data[i].base_unit;

          console.log(fname);

           con.query("insert into finaldata values(?,?,?,?,?,?,?)",[slno,fname,lastval,buy,sell,vol,base],err=>{
                 if(err)
                  {
                      console.log(err);
                  }
           })

           if(count === 10) break;
         }
})
.catch((error) => {
    console.log(error)
})


app.get('/results',(request,response)=>{
    fetchdata(response);
    console.log("fetched!");
})

function fetchdata(response){
   con.query("select * from finaldata",(err,result)=>{
       if(err)
       {
        console.log(err);
       }
       else
       {
        console.log(JSON.parse(JSON.stringify(result)));
        response.send(result);
        // response.write("<table><tr>");
        // for(var coloumn in result[0])
        // {
        //     response.write("<th>"+coloumn+"</th>");
        // }
        // response.write("</tr>");

        // for(var row in result)
        // {
        //     response.write("<tr>")
        //     for(var coloumn in result[row])
        //     {
        //         response.write("<td>"+result[row][coloumn]+"</td>");
        //     }
        //     response.write("</tr>");
        // }
        // response.write("</table>");
       }
   })
}


app.listen(3000,err=>{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("running successfully");
    }
})
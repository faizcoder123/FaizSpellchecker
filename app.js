const express = require('express');

const port=process.env.PORT||3000
const app=express()
const fs = require('fs');
const hbs=require('hbs');
const request = require('request');
const path = require('path');
app.use(express.urlencoded({extended:false}));

app.set('view engine','hbs')

//console.log(__dirname)//path

const p=path.join(__dirname,'/public')


//console.log(p);
 app.use(express.static(p)) //// find all html css js file first what route request we get
// // auto connect all  html,css ,jss ,img  inside public folder
// //app.use() loads a function to be used as middleware


// Parse JSON body (as sent by API clients)
app.use(express.json());

const getEditDist = (a, b) => {
          if(a.length == 0) return b.length;
          if(b.length == 0) return a.length;

         var dp = []; dp[0] = []; dp[0][0] = 0;


         var i;
         for(i = 0; i <= b.length; i++){
             dp[i] = [];
             dp[i][0] = i;//insert
         }

        // want to make b to A
          var j;
          for(j = 0; j <= a.length; j++){
               dp[0][j] = j;//deletion
            }


        for(i = 1; i <= b.length; i++){
          for(j = 1; j <= a.length; j++){
                if(b.charAt(i-1) === a.charAt(j-1)){
                     dp[i][j] = dp[i-1][j-1];
                    }
                else {
                   dp[i][j] = Math.min(dp[i-1][j-1] + 1, // substitution
                                   Math.min(dp[i][j-1] + 1, // insertion
                                            dp[i-1][j] + 1)); // deletion
                    }
             }
        }

        return dp[b.length][a.length];

    }

app.get('/',function(req,res) {
  res.render('dict',{});

});


app.get('/spellcheck',async (req,res) => {
    try{
    //  console.log("check");
      var txt = req.query.text;

      var arr = txt.split(' ')


      // split the contents by new line
       var big_ans="";
       for(var i = 0; i < arr.length; i++){
        const data = fs.readFileSync('book.txt', 'UTF-8');
        const lines = data.split(/\r?\n/);
        var min = Number.MAX_SAFE_INTEGER;
        var str=arr[i];
           lines.forEach((line) => {

             var ans = getEditDist(line,arr[i]);

              if(Number(ans) <= Number(min)){
                 min = Number(ans);
                 str = line;
                }
               })
            big_ans  = big_ans + " " + str;
           }
          res.send({
            text:big_ans
          })
    }
  catch(err){
        res.send({
          error:err
        })
  }

})

app.listen(port, () => {
    console.log('Server started');
});

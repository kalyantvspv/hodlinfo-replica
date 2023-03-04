
var added = document.querySelector("table");
console.log(added);


fetch("http://localhost:3000/results")
.then(response => response.json())
.then((response)=>
    {
        console.log(response);
        console.log(response[0].base);
       for(var i in response)
       {
         let template = `
                         <tr>
                                <td class="first">${response[i].slno}</td>
                                <td>${response[i].name}</td>
                                <td><span>&#8377;</span> ${response[i].lastprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }</td>
                                <td><span>&#8377;</span>
                                ${response[i].buy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') } / <span>&#8377;</span>
                                ${response[i].sell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }</td>
                                <td>${response[i].volume}</td>
                                <td class="last">${response[i].base}</td>
                         </tr>
                          `;
                          added.innerHTML+=template;
       }
       
    })
    .catch(err=>{
        console.log(err);
    })

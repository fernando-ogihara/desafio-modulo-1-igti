
let allUsers =[]

window.addEventListener('load', ()=>{
    getData()
});

document.getElementById("search").onclick = function() {
  let term =  document.getElementById("term").value
  if(term){
    let res = search(term,allUsers)
    render(res)
  }
};


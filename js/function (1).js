
async function getData(){
    const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo')
    const json =  await res.json();

    allUsers = json.results.map(user =>{
        return {
            img: user.picture.medium,
            gender:user.gender,
            name: `${user.name.first} ${user.name.last}`,
            order: user.name.first,
            age: user.dob.age
        }
    }).sort((a,b)=>{
         return (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0);
    })
}

function search(term, arrayUser){
    const userFilter = arrayUser.filter(user=>{
        let arraySearch= term.split(' ');
        for(let i = 0; i < arraySearch.length; i++){
          const indice = user.name.toLowerCase().indexOf(arraySearch[i]
            .toLowerCase());
            if(indice >= 0){
                return user;
            }
        }  
    })
  return userFilter;
}

function render(arrayUser){
    if(arrayUser){
        let divSummation =document.getElementById("summation-user")
        divSummation.innerHTML = `${arrayUser.length} usuário(s) encontrado(s)`;
        let filter =document.getElementById("filter01")
        let general =document.getElementById("general")
        
        filter.innerHTML=""
        arrayUser.map(user=>{
            filter.innerHTML = filter.innerHTML + 

            `<div id="filter">            
                <img src="${user.img}"> 
                <span class="name">
                    ${user.name} <br> ${user.age} anos
                </span>
            </div>`;
        })

        general.innerHTML="";
        const countGenderUser = countGenderUsers(arrayUser);
        const totalAge = sumAgeUsers(arrayUser);
        const averageAge = totalAge / arrayUser.length;

        general.innerHTML = `Sexo Maculino: ${countGenderUser.male} <br>
        Sexo Feminino: ${countGenderUser.female}<br> Soma das idades:
        ${totalAge}<br> Media das idades: ${averageAge.toFixed(2)}`


    }
}

function countGenderUsers(arrayUser){
    let countMale = 0;
    let countFemale = 0;
    const sumMF ={}

    const userFilter = arrayUser.filter(user=>{
        if(user.gender.toLowerCase() === 'male'){
            countMale+=1;
        }else{
            countFemale+=1;
        }
    })
    sumMF.male =countMale;
    sumMF.female =countFemale;
  return sumMF;
}

function sumAgeUsers(arrayUser){
    const totalAge = arrayUser.reduce((acumulator,current)=>{
        return acumulator + current.age;
    },0)
   
  return totalAge;
}

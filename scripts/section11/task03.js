const data = [

    {
        "id": 1,
        "name": "Yoda",
        "image": "1.jpg"
    },
    {
        "id": 2,
        "name": "Stormtrooper",
        "image": "2.jpg"
    },
    {
        "id": 3,
        "name": "R2-D2 & C-3PO",
        "image": "3.jpg"
    },
    {
        "id": 4,
        "name": "Darth Vader",
        "image": "4.jpg"
    },
    {
        "id": 5,
        "name": "Obi-Wan Kenobi",
        "image": "5.jpg"
    },
    {
        "id": 6,
        "name": "Chewbacca",
        "image": "6.jpg"
    }

]

document.addEventListener('DOMContentLoaded', () =>{
    const Characters = document.querySelector('.characters');
    let html = '';
    data.forEach(character =>{
        html += /* html */`
        <div class="col " style="max-width:425px">
            <div class="card my-2 h-100">
                <p class="card-body m-0 row">
                    <strong class="card-title mb-3 d-block p-0">${character.name}</strong>
                    <img src="../../assets/section11/${character.image}" class="card-img-top" alt="imagen del personaje ${character.name}" style="height:350px; max-width:325px">
                    <a href="#" class="btn btn-dark mt-3 col-3 d-flex align-items-center justify-content-center">Like</a>
                </p>
            </div>    
        </div>
        `;
    })
    Characters.innerHTML = html;
});
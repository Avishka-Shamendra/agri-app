const search = document.getElementById('search');
const matchlist = document.getElementById('match-list');
const errordiv = document.getElementById('match-list-error');

const searchUsers = async searchText => {
    let response = await fetch(`/admin/find?query=${searchText}`);
    response =await response.json();
    if (response.success){
        if (searchText.length === 0){
            response=[];
            matchlist.innerHTML = '';
        }else {
            //console.log(response);
            let outputHTML;
            if (response.type === 'name'){
                outputHTML =  response.users.map(match=>{
                    return(`
                               <div class="card card-body mb-1">
                                   <h6>${match.first_name} ${match.last_name}
                                        <span class="text-primary">
                                            ${match.type}
                                        </span>
                                        <a class="card-block stretched-link text-decoration-none" href="/admin/${match.type}/${match.uid}"></a>
                                   </h6>
                                </div>
                               `);
                }).join('');


            }
            else {
                const HTML_ARRAY = [response.farmers.map(match=>{
                    return(`
                               <div class="card card-body mb-1">
                                   <h6>${match.nic}
                                        <span class="text-primary">
                                            Farmer
                                        </span>
                                        <a class="card-block stretched-link text-decoration-none" href="/admin/farmer/${match.uid}"></a>
                                   </h6>
                                </div>
                               `);
                }),response.buyers.map(match=>{
                    return(`
                               <div class="card card-body mb-1">
                                   <h6>${match.nic}
                                        <span class="text-primary">
                                            Buyer
                                        </span>
                                        <a class="card-block stretched-link text-decoration-none" href="/admin/Buyer/${match.uid}"></a>
                                   </h6>
                                </div>
                               `);
                })];

                outputHTML = HTML_ARRAY[0].concat(HTML_ARRAY[1]).join('');

            }
            matchlist.innerHTML = outputHTML;
        }
    }else {
        matchlist.innerHTML = '';
        errordiv.innerHTML = `<div class="card card-body mb-1 alert alert-danger">
                                                    <h6>${response.error}</h6>
                                              </div>`;
    }
}



search.addEventListener('input',()=>searchUsers(search.value));